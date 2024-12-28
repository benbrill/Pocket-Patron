import { createClient } from "../../../../utils/supabase/server";

export async function PUT(request : Request){

    const res = await request.json();

    const supabase = await createClient();
    const { data: { user }, error : userError } = await supabase.auth.getUser();
    const user_id = user.id;

    const new_data = res.show_ids.map((show_id : number) => ({show_id, user_id: user_id}));

    const { data: shows, error: showError } = await supabase.from('user_shows').upsert(new_data).eq('user_id', user_id);

    if (showError) {
        console.error('❌ Supabase error:', showError.message);
        return new Response(
            JSON.stringify({ error: showError.message }),
            { status: 500 }
        );
    }

    return Response.json({ res })
}