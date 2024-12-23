import React from 'react'
import shows from '../data/shows'
import Image from 'next/image'
import ShowCard from './showCard'

const DisplayShows = () => {

    return (
        <div className='flex flex-wrap'>
            {shows.map((show) => (
                <div key={show.title}>
                    <ShowCard data={show} />
                </div>
            ))}
        </div>
    )
}

export default DisplayShows