import { createClient } from '../../../../../utils/supabase/server';
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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await context.params;
  const supabase = await createClient();
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

  