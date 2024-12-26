import React from 'react';
import Image from 'next/image';

interface ShowCardProps {
    title: string;
    imageUrl: string;
    show_id: number
    handleClick?: (show_id: number) => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ title, imageUrl, show_id, handleClick }) => {
    return (
        <div className="show-card cursor-pointer" onClick = {() => handleClick && handleClick(show_id)}>
            <Image src={imageUrl} alt={title} className="show-card__image" width={629} height={1024} />
            <div className="show-card__content">
                <h2 className="show-card__title">{title}</h2>
            </div>
        </div>
    );
};

export default ShowCard;