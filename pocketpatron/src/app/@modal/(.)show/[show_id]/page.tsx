import React from 'react';
import { createClient } from '../../../../../utils/supabase/server';
import { Modal } from '@/components/Modal';
import Image from 'next/image';


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
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                <div>
                    <Image src={show?.image_url} alt={show?.title} width={629} height={1024} />
                </div>
            <div className="flex flex-col">
                <div className='font-sans font-bold text-2xl'>{show?.title}</div>
                <div>{show?.season}</div>
                <div>{show?.theater}</div>
                <div>{show?.description}</div>
                <button className='justify-self-end'>Submit</button>
            </div>
            </div>
        </Modal>
    );
}