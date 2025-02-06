// app/shows/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  



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
    const itemsPerPage = 30;
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredShows, setFilteredShows] = useState<Show[]>(shows);
    const topRef = useRef<HTMLDivElement>(null); // Creating a ref for scrolling to top of this component

    useEffect(() => {
        const options = {
            keys: ['title'],
            threshold: 0.4
        };
        const fuse = new Fuse(shows, options);

        const results = searchTerm !== '' ? fuse.search(searchTerm).map(result => result.item) : shows;
        setFilteredShows(results);
        setCurrentPage(1);
    }, [searchTerm, shows]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, page: number) => {
        e.preventDefault(); // Prevent the default anchor behavior
        setCurrentPage(page);
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const totalPages = Math.ceil(filteredShows.length / itemsPerPage);
    const getPaginationRange = () => {
        let start = Math.max(currentPage - 2, 1);
        let end = Math.min(start + 4, totalPages);
        if (totalPages >= start + 4) {
            start = Math.max(end - 4, 1);
        }
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <div ref={topRef}>
            <div style={{padding: `0 1.0875rem 1.45rem`, maxWidth: 1080, margin: `0 auto`,}}>  
                <Input
                    type="text"
                    placeholder="Search for shows..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className='grid grid-cols-3 lg:grid-cols-6 gap-2' style={{
                margin: `0 auto`,
                maxWidth: 1080,
                padding: `0 1.0875rem 1.45rem`,
            }}>
                {filteredShows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((show) => (
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
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => handlePageChange(e, currentPage - 1)} />
                    </PaginationItem>
                    {getPaginationRange().map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink href="#" onClick={(e) => handlePageChange(e, page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {totalPages > 5 && <PaginationEllipsis />}
                    <PaginationItem>
                        <PaginationNext href="#" onClick={(e) => handlePageChange(e, currentPage + 1)}  />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

