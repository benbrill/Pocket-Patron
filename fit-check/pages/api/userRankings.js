import { supabase } from '../../lib/supabaseClient';
import { calculateElo } from '../../lib/eloAlgo';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { winnerId, loserId, currentEloScores } = req.body;
    const testUserId = '98d5677a-aaad-473a-b798-284a244f261e'; // Temporary test user

    // Validate Input
    if (!winnerId || !loserId || !currentEloScores) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }

    try {
        console.log('🔄 Calculating new ELO scores...');
        const updatedEloScores = calculateElo(currentEloScores, winnerId, loserId);

        console.log('✅ Updated ELO Scores:', updatedEloScores);

        // Update ELO Scores in `user_shows`
        await Promise.all([
            supabase
                .from('user_shows')
                .update({
                    elo_score: updatedEloScores[winnerId],
                    last_updated_at: new Date().toISOString(),
                })
                .eq('user_id', testUserId)
                .eq('show_id', winnerId),

            supabase
                .from('user_shows')
                .update({
                    elo_score: updatedEloScores[loserId],
                    last_updated_at: new Date().toISOString(),
                })
                .eq('user_id', testUserId)
                .eq('show_id', loserId),
        ]);

        console.log('✅ Updated ELO scores in the database.');

        // Log the Comparison in `user_show_comparisons`
        const { error: comparisonError } = await supabase
            .from('user_show_comparisons')
            .insert([
                {
                    user_id: testUserId,
                    winner_show_id: winnerId,
                    loser_show_id: loserId,
                },
            ]);

        if (comparisonError) {
            console.error('❌ Failed to log comparison:', comparisonError);
            return res.status(500).json({ error: 'Failed to log comparison.' });
        }

        console.log('✅ Logged comparison in the database.');

        return res.status(200).json({
            message: 'ELO scores updated and comparison logged successfully.',
            updatedScores: updatedEloScores,
        });
    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
