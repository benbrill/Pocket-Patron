import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { showId } = req.body;
    const testUserId = '98d5677a-aaad-473a-b798-284a244f261e';

    try {
        const { error } = await supabase
            .from('user_shows')
            .insert([{ user_id: testUserId, show_id: showId }]);

        if (error) {
            console.error('Error adding new show:', error.message);
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ message: 'Show added successfully' });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
