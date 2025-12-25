# Build Error Fix

## Issue
Error: ENOENT: no such file or directory, open 'D:\thai-lottery\app\check\metadata.js'

## Cause
Stale Next.js/Turbopack cache referencing a deleted file.

## Solution Applied
✅ Cleared `.next` cache directory
✅ Cleared `node_modules/.cache` directory
✅ Verified `app/check/layout.js` is correct (metadata is properly exported)

## If Error Persists

### Option 1: Restart Dev Server
```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

### Option 2: Full Clean Build
```bash
# Delete all caches
rm -rf .next
rm -rf node_modules/.cache

# Restart dev server
npm run dev
```

### Option 3: Reinstall Dependencies (if needed)
```bash
rm -rf node_modules
rm -rf .next
npm install
npm run dev
```

## Verification
✅ `app/check/layout.js` exists and exports metadata correctly
✅ No references to `metadata.js` file
✅ Cache cleared

The build should work now!

