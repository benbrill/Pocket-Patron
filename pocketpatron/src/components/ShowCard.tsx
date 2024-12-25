import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ShowCardProps {
    title: string;
    imageUrl: string;
    show_id: number
}

const ShowCard: React.FC<ShowCardProps> = ({ title, imageUrl, show_id }) => {
    return (
        <div className="show-card">
            <Link href={`/show/${show_id}`} scroll={false}>
            <Image src={imageUrl} alt={title} className="show-card__image" width={629} height={1024} />
            <div className="show-card__content">
                <h2 className="show-card__title">{title}</h2>
            </div>
            </Link>
        </div>
    );
};

export default ShowCard;