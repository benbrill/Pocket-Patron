import { createClient } from "../../../../utils/supabase/client";

export async function PUT(request : Request){
    const supabase = await createClient();
    const res = await request.json();

    const test_user_id : string = '98d5677a-aaad-473a-b798-284a244f261e';

    const new_data = res.show_ids.map((show_id : number) => ({show_id, user_id: test_user_id}));

    const { data: shows, error } = await supabase.from('user_shows').upsert(new_data).eq('user_id', test_user_id);

    if (error) {
        console.error('❌ Supabase error:', error.message);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }

    return Response.json({ res })
}