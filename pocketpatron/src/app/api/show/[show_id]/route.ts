import { createClient } from '../../../../../utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ show_id: string }> }
) {
    // ✅ Unwrap the params promise
    const supabase = await createClient();
    const { show_id } = await context.params;

    // ✅ Validate show_id
    if (!show_id) {
        return NextResponse.json(
            { error: 'Missing or invalid show_id' },
            { status: 400 }
        );
    }

    // ✅ Mock data example (replace with Supabase query)
    const { data: shows, error } = await supabase
    .from('shows')
    .select('*')
    .eq('show_id', show_id) // Assuming your column is 'id', not 'show_id'
    .single();

if (error) {
    console.error('❌ Supabase error:', error.message);
    return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
    );
}

if (!shows) {
    return new Response(
        JSON.stringify({ error: 'Show not found' }),
        { status: 404 }
    );
}
    return NextResponse.json(shows, { status: 200 });
}

