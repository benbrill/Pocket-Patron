import React from 'react';
import { createClient } from '../../../../../utils/supabase/server';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import AddShow from '@/components/AddShow';



interface Props {
    params: Promise<{ show_id: string }>;
}

// use query directly in page to render on server side https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
export default async function ShowPage(props: Props) {
    const params = await props.params;

    const { show_id } = params;
    const supabase = await createClient();
    const { data: show } = await supabase.from("shows").select("*").eq('show_id', show_id).single();

    return (
        <Modal>
            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <Image src={`/${show?.image_filename}`} alt={show?.title} width={629} height={1024} />
                </div>
            <div className="flex flex-col justify-between">
                <div>
                    <div className='font-mono text-muted-foreground'>{show?.season} · Broadway</div>
                    <div className='font-sans font-bold text-2xl'>{show?.title}</div>
                    <div>{show?.theater}</div>
                </div>
                <div className='flex flex-col gap-2'>
                    <AddShow show={show}/>
                </div>
            </div>
            <div className='col-span-2'>{show?.description}</div>
            </div>
        </Modal>
    );
}
