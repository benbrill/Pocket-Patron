import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server';
import { computeAndUpdateBTForUser } from '@/lib/btAlgo';

type Matchup = {
  winner_id: number;
  loser_id: number;
};

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const matchups: Matchup[] = body.matchups;

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const user_id = user.id;

    if (!Array.isArray(matchups)) {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
    }

    // Add user_id to each matchup
    const matchupsWithUser = matchups.map((m) => ({
      ...m,
      user_id,
    }));

    const { error } = await supabase
      .from('user_show_comparisons')
      .insert(matchupsWithUser);

    if (error) {
      console.error('Supabase insert error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ✅ Recompute BT scores after insert
    await computeAndUpdateBTForUser(user_id);

    return NextResponse.json({ message: 'Matchups inserted and scores updated' });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
