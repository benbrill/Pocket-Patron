import { UserShow } from '@/app/@modal/(.)show/[show_id]/page';
import { createClient } from '../../../../utils/supabase/server';
import AddShow from '@/components/AddShow';
import Image from 'next/image';
import React from 'react';
import BackButton from '@/components/BackButton';

interface Show {
    id: string;
    title: string;
    description?: string;
}

interface Props {
    params: Promise<{ show_id: string }>;
}

export default async function ShowPage(props: Props) {
    const params = await props.params;

    const { show_id } = params;
    const supabase = await createClient();
    const { data: {user} } = await supabase.auth.getUser();
    const { data: show } = await supabase
    .from("shows")
    .select("*, user_shows(*)") // Select all from shows and related filtered user_shows
    .eq("show_id", show_id)
    .eq("user_shows.user_id", user?.id) // Filter user_shows by the current user_id
    .single(); // Ensure only one show is returned

    return (
        <div className='flex flex-col items-center justify-center max-w-xl mx-auto'>
            <BackButton />
        <div className='grid grid-cols-2 gap-3'>
            <div>
                <Image src={`/${show?.image_filename}`} alt={show?.title} width={629} height={1024} unoptimized />
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <div className='font-mono text-muted-foreground'>{show?.season} · Broadway</div>
                    <div className='font-sans font-bold text-2xl'>{show?.title}</div>
                    <div>{show?.theater}</div>
                </div>
                <div>
                    <div className='font-sans'>Show viewings</div>
                    {show.user_shows.map((user_show: UserShow) => (
                        <div key={user_show.user_show_id}>
                            <div>{new Date(user_show.watched_at).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col gap-2'>
                    <AddShow show={show}/>
                </div>
            </div>
            <div className='col-span-2'>{show?.description}</div>
        </div>
        </div>
    );
}
