# Supabase Login Troubleshooting Guide

## Common Issues and Solutions

### 1. 401 Unauthorized Error

**Possible Causes:**

#### A. User doesn't exist in Supabase
- Go to Supabase Dashboard → Authentication → Users
- Check if your admin user exists
- If not, create a new user:
  1. Click "Add User" or "Invite User"
  2. Enter email and password
  3. Make sure "Auto Confirm User" is enabled (or confirm email manually)

#### B. Wrong Credentials
- Double-check email and password
- Make sure there are no extra spaces
- Try resetting password in Supabase Dashboard

#### C. Environment Variables Not Set in Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify these are set:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://auuqxnglhvacxwywfcwv.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your anon key)
3. Make sure they're set for **Production** environment
4. **Redeploy** after adding/changing environment variables

#### D. Email Not Confirmed
- Check Supabase Dashboard → Authentication → Users
- If user has "Email Confirmed" = false:
  - Either enable "Auto Confirm User" in Auth settings
  - Or manually confirm the user in the dashboard

### 2. Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment → Functions tab
3. Look for `/api/auth/login` function logs
4. Check for error messages like:
   - "Supabase environment variables are missing"
   - "Invalid login credentials"
   - "Email not confirmed"

### 3. Test Supabase Connection

Run the test script locally:
```bash
node test-supabase-connection.js
```

### 4. Verify Environment Variables

Check if environment variables are being read:
- Vercel logs will show: "Env check - URL: true Key: true"
- If false, environment variables are not set correctly

### 5. Create Admin User in Supabase

**Method 1: Via Dashboard**
1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User" or "Invite User"
3. Enter:
   - Email: your-admin@email.com
   - Password: (strong password)
   - Auto Confirm: ✅ (enable this)
4. Click "Create User"

**Method 2: Via SQL (if you have database access)**
```sql
-- This is handled by Supabase Auth, but you can check users:
SELECT * FROM auth.users;
```

### 6. Check Supabase Auth Settings

1. Go to Supabase Dashboard → Authentication → Settings
2. Verify:
   - "Enable Email Signup" is ON
   - "Enable Email Confirmations" - if ON, make sure to confirm user
   - "Site URL" matches your domain

### 7. Common Error Messages

| Error Message | Solution |
|--------------|----------|
| "Invalid login credentials" | Wrong email/password or user doesn't exist |
| "Email not confirmed" | Confirm email in Supabase Dashboard or enable auto-confirm |
| "Supabase environment variables are missing" | Set env vars in Vercel and redeploy |
| "Server configuration error" | Check Vercel logs for details |

### 8. Quick Checklist

- [ ] User exists in Supabase Authentication
- [ ] User email is confirmed
- [ ] Environment variables set in Vercel (Production)
- [ ] Redeployed after setting env vars
- [ ] Using correct email/password
- [ ] Checked Vercel function logs for errors

### 9. Still Not Working?

1. Check Vercel function logs for detailed error
2. Verify Supabase project is active (not paused)
3. Check Supabase Dashboard → Settings → API for correct URL and keys
4. Try creating a new user with a different email
5. Test locally first with `.env.local` file

