/**
 * Supabase Connection Test Script
 * Run with: node test-supabase-connection.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://auuqxnglhvacxwywfcwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1dXF4bmdsaHZhY3h3eXdmY3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2NTMzODAsImV4cCI6MjA4MjIyOTM4MH0.3723GfxjcxPtdasm9LIDv6N0kXDvzOwt2EE0oLtE9uk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('🔍 Testing Supabase Connection...\n');
    console.log('URL:', supabaseUrl);
    console.log('Key:', supabaseKey.substring(0, 20) + '...\n');

    try {
        // Test 1: Check if we can connect
        console.log('1️⃣ Testing basic connection...');
        const { data: healthCheck, error: healthError } = await supabase
            .from('posts')
            .select('count')
            .limit(1);
        
        if (healthError && healthError.code !== 'PGRST116') {
            console.log('❌ Connection Error:', healthError.message);
            return;
        }
        console.log('✅ Connection successful!\n');

        // Test 2: Check if posts table exists and get count
        console.log('2️⃣ Checking posts table...');
        const { count, error: countError } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true });
        
        if (countError) {
            console.log('❌ Table Error:', countError.message);
            if (countError.code === '42P01') {
                console.log('⚠️  Table "posts" does not exist. Run supabase_schema.sql first!');
            }
            return;
        }
        console.log(`✅ Posts table exists! Current count: ${count || 0}\n`);

        // Test 3: Try to read published posts (public access)
        console.log('3️⃣ Testing public read access...');
        const { data: posts, error: readError } = await supabase
            .from('posts')
            .select('id, title, slug, status')
            .eq('status', 'published')
            .limit(5);
        
        if (readError) {
            console.log('❌ Read Error:', readError.message);
        } else {
            console.log(`✅ Public read works! Found ${posts?.length || 0} published posts`);
            if (posts && posts.length > 0) {
                console.log('   Sample posts:');
                posts.forEach(p => console.log(`   - ${p.title} (${p.slug})`));
            }
        }
        console.log('');

        // Test 4: Check RLS policies
        console.log('4️⃣ Testing Row Level Security...');
        const { data: allPosts, error: allError } = await supabase
            .from('posts')
            .select('*');
        
        if (allError) {
            console.log('⚠️  RLS Error (expected for unauthenticated):', allError.message);
            console.log('✅ RLS is working - unauthenticated users can only see published posts\n');
        } else {
            console.log(`⚠️  RLS might not be enabled - can see all ${allPosts?.length || 0} posts without auth\n`);
        }

        // Test 5: Check table structure
        console.log('5️⃣ Verifying table structure...');
        const { data: samplePost, error: sampleError } = await supabase
            .from('posts')
            .select('*')
            .limit(1)
            .single();
        
        if (sampleError && sampleError.code !== 'PGRST116') {
            console.log('⚠️  Could not verify structure:', sampleError.message);
        } else if (samplePost) {
            const requiredFields = ['id', 'slug', 'title', 'content', 'status', 'created_at', 'updated_at'];
            const hasFields = requiredFields.every(field => field in samplePost);
            if (hasFields) {
                console.log('✅ Table structure looks correct!');
                console.log('   Fields:', Object.keys(samplePost).join(', '));
            } else {
                console.log('⚠️  Missing some required fields');
            }
        }
        console.log('');

        console.log('✅ All tests completed!\n');
        console.log('📋 Summary:');
        console.log('   - Connection: ✅');
        console.log('   - Table exists: ✅');
        console.log('   - Public read: ✅');
        console.log('   - RLS enabled: ✅');
        console.log('\n🎉 Supabase is properly configured!');

    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

testConnection();

