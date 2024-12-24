import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testQuery() {
    const { data, error } = await supabase
        .from('shows')
        .select('*')
        .order('created_at', { ascending: false });

    console.log('Data:', data);
    console.log('Error:', error);
}

testQuery();
