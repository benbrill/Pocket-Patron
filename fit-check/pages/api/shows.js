import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
    try {
        // Prevent caching of this endpoint
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

        const { data, error } = await supabase
            .from('shows')
            .select('*')

        if (error) {
            console.error('Error fetching shows:', error.message);
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
