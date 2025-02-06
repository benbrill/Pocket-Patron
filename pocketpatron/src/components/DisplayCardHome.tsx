import React from 'react';
import { createClient } from '../../utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import ShowCardLink from './ShowCardLink';


// TODO: see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
export default async function DisplayCardHome() {
    const supabase = await createClient();

    const { data: shows, error } = await supabase.from("shows").select('*').order('show_id', {ascending: false});
    const truncate = (text: string) => {
        return text.length > 30 ? text.substring(0, 30) + '...' : text;
    }

    return (
        <div className='grid grid-cols-3 lg:grid-cols-6 gap-2'    style={{
              margin: `0 auto`,
              maxWidth: 1080,
              padding: `0 1.0875rem 1.45rem`,
            }}>
            {shows?.map((show: { show_id: number; image_filename: string; title: string, season: number }) => (
                <Link href={`/show/${show.show_id}`} scroll={false} key = {show.show_id}>
                    <div 
                        // style = {{backgroundColor: active ? 'yellow' : 'black'}}
                        className={`show-card cursor-pointer 'bg-zinc-700' rounded-sm border-3 outline-zinc-200 outline-offset-4`} 
                    >
                        <Image src={`/${show.image_filename}`} alt={show.title} className="show-card__image" width={629} height={1024} />
                        <div className="show-card__content mx-1 pb-1">
                            <div className='text-s font-mono text-muted-foreground leading-tight'>{show.season}</div>
                            <div className="show-card__title font-sans text-l font-light tracking-tight leading-tight">{truncate(show.title)}</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
