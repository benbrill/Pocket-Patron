// app/shows/page.server.ts
import { createClient } from '../../../utils/supabase/server';
import  LoaderFunction  from 'next/app';

interface Show {
    show_id: number;
    title: string;
    image_filename: string;
    season: number;
}

export const loader: LoaderFunction<{ shows: Show[] }> = async () => {
    const supabase = createClient();
    const { data: shows, error } = await supabase.from<Show>("shows").select('*').order('show_id', {ascending: false});

    if (error) {
        console.error('Error fetching shows:', error);
        return { shows: [] };
    }

    return { shows };
}
