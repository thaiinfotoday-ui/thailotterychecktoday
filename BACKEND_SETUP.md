# Backend Setup & Configuration Guide

## Environment Variables

Create a `.env.local` file (or set in Vercel dashboard) with:

```env
# Required for production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
CRON_SECRET=your-strong-random-secret-here

# Generate secret with: openssl rand -hex 32
```

## Cron Job Configuration

### Vercel Cron Jobs

The `vercel.json` file is configured to run cron jobs twice daily (8 AM and 8 PM Thailand time).

**To secure the cron endpoint:**

1. Set `CRON_SECRET` environment variable in Vercel dashboard
2. Update `vercel.json` to include the secret in the path:

```json
{
  "crons": [
    {
      "path": "/api/cron/refresh?secret=YOUR_CRON_SECRET",
      "schedule": "0 8,20 * * *"
    }
  ]
}
```

**OR** use Vercel's cron job configuration in the dashboard and add custom headers.

### External Cron Services

For external cron services (e.g., cron-job.org, EasyCron):

- URL: `https://your-domain.com/api/cron/refresh?secret=YOUR_CRON_SECRET`
- Method: GET or POST
- Frequency: Twice daily (after lottery draws, typically 8 AM and 8 PM Thailand time)

## Cache Strategy

The backend uses a multi-layer caching approach:

1. **Memory Cache**: Fast in-memory cache (resets per serverless instance)
2. **File Cache**: Persistent cache in `.next/cache/lottery-data.json` (survives serverless cold starts)
3. **Next.js Cache**: HTTP response caching with revalidation

Cache duration: 24 hours (86400 seconds)

## API Endpoints

### GET `/api/thai-lottery`

Returns current lottery results with caching.

**Response Format:**
```json
{
  "source": "Sanook",
  "date": "2025-01-15",
  "results": {
    "first_prize": "123456",
    "last_two": "45",
    "front_three": ["123", "456"],
    "back_three": ["789", "012"]
  },
  "stale": false
}
```

**Error Response:**
```json
{
  "error": "Service unavailable",
  "message": "Unable to fetch lottery results. Please try again later.",
  "stale": true
}
```

### GET/POST `/api/cron/refresh`

Secured endpoint for refreshing cache. Requires `CRON_SECRET`.

**Query Parameters:**
- `secret`: Your CRON_SECRET value

**Response:**
```json
{
  "success": true,
  "message": "Cache refreshed successfully",
  "data": {
    "source": "Sanook",
    "date": "2025-01-15",
    "stale": false
  },
  "duration": "1234ms",
  "timestamp": "2025-01-15T12:00:00.000Z"
}
```

## Data Sources

The system tries multiple sources in priority order:

1. **Sanook** (Priority 1) - Custom parser
2. **Thairath** (Priority 2) - Generic meta parser
3. **Kapook** (Priority 3) - Generic meta parser

If one source fails, the system automatically tries the next source.

## Validation Rules

Strict validation ensures data quality:

- First prize: Exactly 6 digits
- Last two: Exactly 2 digits
- Front three: Array of 3-digit numbers (optional but validated if present)
- Back three: Array of 3-digit numbers (optional but validated if present)
- Date: ISO format (YYYY-MM-DD)

Invalid data is rejected and the next source is tried.

## Error Handling

- **Fetch Timeout**: 10 seconds per source
- **Retry Logic**: Up to 2 retries per source with exponential backoff
- **Fallback**: Serves stale cached data if all sources fail
- **Never Crashes**: API always returns a response (even if stale)

## Monitoring

Check logs for:
- `[INFO]` - Normal operations
- `[WARN]` - Non-critical issues (stale data, validation warnings)
- `[ERROR]` - Source failures, critical errors

## Production Checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Set `CRON_SECRET` to a strong random value
- [ ] Configure Vercel cron jobs or external cron service
- [ ] Test cron endpoint manually with secret
- [ ] Verify cache persistence across deployments
- [ ] Monitor error logs for source failures
- [ ] Update sitemap domain in `app/sitemap.js` if needed

