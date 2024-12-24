'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ShowCard = ({ data }) => {
    const router = useRouter();

    const openModal = () => {
        router.push(`/shows/${data.id}`, { shallow: true });
    };

    return (
        <>
        <div onClick={openModal}  // change to handleClick for multi selection
        className={`rounded-none hover:bg-yellow-200 cursor-pointer grid flex-grow flex-shrink-0 min-w-28 mb-4 max-w-xl
        `}>
          <div>
            <Image src={data.image_url} alt={data.title} width = {649} height = {1024}/>
            {/* <Image src={`/images/${image_path}`}  alt={item.category || 'Image'} width={230} height={275} sizes="(max-width: 600px) 100vw, 50vw"/> */}
            <div style ={{ padding: "5px 5px"}} className='flex flex-col'>
              <div className='uppercase tracking-widest text-sm font-medium leading-4 font-mono' >
                {data.title}
              </div>
              <div className='capitalize font-semibold text-xl font-sans'>
                {data.title}
              </div>
            </div>
          </div>
            {/* {
              viewDetails && 
              <div className='flex flex-row-reverse flex-end px-1'>
                <button className = "font-mono font-light hover:text-sky-700 tracking-tight">View Details</button>
              </div>
            } */}
        </div>
        </>
    )
}

export default ShowCard

