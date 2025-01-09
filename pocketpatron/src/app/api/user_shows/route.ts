import { createClient } from '../../../../utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';


type userShows = {
  show_id: number;
  elo_score: number;
  shows: {
    title: string;
    image_url: string;
    season: number;
  }[]
};

export async function GET() {
  const supabase = await createClient();

  const { data : { user }, error : userError } = await supabase.auth.getUser();
  const user_id = user?.id;

  const { data: shows } = await supabase.from("user_show_w_rankings").select('*').eq('user_id', user_id);


  if (!shows) {
    return NextResponse.json([]);
  }

  
  return NextResponse.json(shows);
}

  