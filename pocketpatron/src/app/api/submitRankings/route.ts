import { createClient } from "../../../../utils/supabase/server"


export async function PUT(request: Request) {
    const supabase = await createClient()
    const res = await request.json()

    const test_user_id : string = '98d5677a-aaad-473a-b798-284a244f261e'
    const new_data = res.map((show : {show_id : number, elo_score: number}) => ({...show, user_id: test_user_id}))
    const { data: shows, error } = await supabase.from('user_show_scores').insert(new_data).eq('user_id', test_user_id)

    if (error) {
        console.error('❌ Supabase error:', error.message);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
    return Response.json({ res })
  }