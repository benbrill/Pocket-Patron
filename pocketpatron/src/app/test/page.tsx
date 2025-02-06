// app/shows/page.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Fuse from 'fuse.js';


interface DisplayCardHomeProps {
    data: {
        shows: Show[];
    };
}

interface Show {
  show_id: number;
  title: string;
  image_filename: string;
  season: number;
}

export default function DisplayCardHome({ data }: DisplayCardHomeProps) {
    const shows = data.shows;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredShows, setFilteredShows] = useState<Show[]>(shows);

    useEffect(() => {
        const options = {
            keys: ['title'],
            includeScore: true,
            threshold: 0.4 // Adjust threshold for fuzziness level
        };
        const fuse = new Fuse(shows, options);

        if (searchTerm !== '') {
            const results = fuse.search(searchTerm).map(result => result.item);
            setFilteredShows(results);
        } else {
            setFilteredShows(shows);
        }
    }, [searchTerm, shows]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
      <div>
          <input
              type="text"
              placeholder="Search for shows..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
          />
          <div className='grid grid-cols-3 lg:grid-cols-6 gap-2' style={{
              margin: `0 auto`,
              maxWidth: 1080,
              padding: `0 1.0875rem 1.45rem`,
          }}>
              {filteredShows.map((show) => (
                  <Link href={`/show/${show.show_id}`} scroll={false} key={show.show_id}>
                      <div className="show-card cursor-pointer bg-zinc-700 rounded-sm border-3 outline-zinc-200 outline-offset-4">
                          <Image src={`/${show.image_filename}`} alt={show.title} className="show-card__image" width={629} height={1024} />
                          <div className="show-card__content mx-1 pb-1">
                              <div className='text-s font-mono text-muted-foreground leading-tight'>{show.season}</div>
                              <div className="show-card__title font-sans text-l font-light tracking-tight leading-tight">
                                  {show.title.length > 30 ? `${show.title.substring(0, 30)}...` : show.title}
                              </div>
                          </div>
                      </div>
                  </Link>
              ))}
          </div>
      </div>
  );
}
