# Supabase Storage Setup Guide

## Step 1: Create Storage Bucket

1. Go to **Supabase Dashboard** → **Storage**
2. Click **"New bucket"**
3. Configure:
   - **Name**: `blog-images`
   - **Public bucket**: ✅ **Enable** (so images can be accessed publicly)
   - **File size limit**: 5MB (or your preference)
   - **Allowed MIME types**: `image/jpeg, image/png, image/gif, image/webp`
4. Click **"Create bucket"**

## Step 2: Set Up Storage Policies

Go to **Storage** → **Policies** → Select `blog-images` bucket

### Policy 1: Public Read Access
```sql
-- Allow anyone to read images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');
```

### Policy 2: Authenticated Upload
```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);
```

## Step 3: Verify Setup

1. Check that bucket `blog-images` exists
2. Verify policies are active
3. Test upload via admin panel

## Troubleshooting

### Images not uploading?
- Check Vercel logs for errors
- Verify bucket name is exactly `blog-images`
- Check that policies are set correctly
- Ensure user is authenticated (logged in)

### Images not displaying?
- Verify bucket is **public**
- Check image URL in browser
- Verify CORS settings (should be enabled by default)

### 401 Unauthorized?
- User must be logged in to upload
- Check authentication token in cookies
- Verify Supabase auth is working

## File Structure

Images will be stored as:
```
blog-images/
  └── blog/
      └── [timestamp]-[random].jpg
```

Example URL:
```
https://[project-id].supabase.co/storage/v1/object/public/blog-images/blog/1234567890-abc123.jpg
```

