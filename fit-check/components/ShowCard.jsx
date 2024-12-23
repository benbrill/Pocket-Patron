import React from 'react'
import Image from 'next/image'


const ShowCard = ({data}) => {
    return (
        <div className='flex bg-slate-500 flex-col w-40 items-center justify-end flex-grow'>
            <h2 className='text-xl font-sans text-center'>{data.title}</h2>
            <Image src={data.image} alt={data.title} width={200} height={200} />
        </div>
    )
}

export default ShowCard