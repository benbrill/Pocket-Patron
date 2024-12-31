import { createClient } from "../../../../utils/supabase/server"


export async function PUT(request: Request) {
    const supabase = await createClient()
    const res = await request.json()


    const { data: { user }, error : userError } = await supabase.auth.getUser();
    const user_id = user?.id;
    console.log(user_id)
    const new_data = res.map((show : {show_id : number, elo_score: number}) => ({...show, user_id: user_id}))
    const { data: shows, error } = await supabase.from('user_show_scores').insert(new_data).eq('user_id', user_id)

    if (error) {
        console.error('❌ Supabase error:', error.message);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
    return Response.json({ res })
  }