import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
    const testUserId = '98d5677a-aaad-473a-b798-284a244f261e';
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        const { data, error } = await supabase
            .from('user_shows')
            .select('show_id, elo_score, shows(title, image_url, season)')
            .eq('user_id', testUserId);

        if (error) {
            console.error('Error fetching user shows:', error.message);
            return res.status(500).json({ error: error.message });
        }

        const userShows = data.map((entry) => ({
            id: entry.show_id,
            elo_score: entry.elo_score,
            title: entry.shows.title,
            image_url: entry.shows.image_url,
            description: entry.shows.description,
        }));

        return res.status(200).json(userShows);
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
