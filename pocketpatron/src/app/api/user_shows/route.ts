import { createClient } from '../../../../utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';


type userShows = {
  show_id: number;
  elo_score: number;
  shows: {
    title: string;
    image_url: string;
    season: number;
  }
};

export async function GET() {
  const supabase = await createClient();

  const { data : { user }, error : userError } = await supabase.auth.getUser();
  const user_id = user?.id;

  const { data: shows } = await supabase.from("user_shows").select('show_id, elo_score, shows (title, image_url, season)').eq('user_id', user_id);
  
  if (!shows) {
    return NextResponse.json([]);
  }

  const flattenedShows = shows.map((show) => ({
  show_id: show.show_id,
  elo_score: show.elo_score,
  title: show.shows.title,
  image_url: show.shows.image_url,
  season: show.shows.season
  }));
  
  return NextResponse.json(flattenedShows);
}

  