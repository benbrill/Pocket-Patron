import React from 'react';
import { createClient } from '../../../../../utils/supabase/server';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import AddShow from '@/components/AddShow'; 
import { Skeleton } from '@/components/ui/skeleton';
interface Props {
    params: Promise<{ show_id: string }>;
}

// use query directly in page to render on server side https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
export default async function ShowPage(props: Props) {
    const params = await props.params;

    return ( 
        <Modal>
            <div className='grid grid-cols-2 gap-3'>
                <Skeleton className="h-64 w-full"/>
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <Skeleton className='h-32 w-3/4'/>
                </div>
                <div>
                                    
                </div>
                <div className='flex flex-col gap-2'>

                </div>
                </div>
                <div className='col-span-2'>
                    <Skeleton className='w-2/3 h-12'/>
                    <Skeleton className='w-1/2 h-12'/>
                    <Skeleton className='w-1/3 h-12'/>
                </div>
        </Modal>
    );
}
