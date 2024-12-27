import React from 'react';
import Image from 'next/image';

interface ShowCardProps {
    title: string;
    imageUrl: string;
    show_id: number
    handleClick?: (show_id: number) => void;
    active?: boolean;
}

const ShowCard: React.FC<ShowCardProps> = ({ title, imageUrl, show_id, handleClick, active }) => {
    const truncate = (text: string) => {
        return text.length > 35 ? text.substring(0, 35) + '...' : text;
    }
    return (
        <div 
            // style = {{backgroundColor: active ? 'yellow' : 'black'}}
            className={`show-card cursor-pointer ${active ? 'bg-yellow-500' : 'bg-zinc-700 rounded-sm border-3 outline-zinc-200 outline-offset-4'}`} 
            onClick = {() => handleClick && handleClick(show_id)}
        >
            <Image src={imageUrl} alt={title} className="show-card__image" width={629} height={1024} />
            <div className="show-card__content mx-1 pb-1">
                <div className='text-s font-mono text-muted-foreground leading-tight'>2021</div>
                <div className="show-card__title font-sans text-l font-light tracking-tight leading-tight">{truncate(title)}</div>
            </div>
        </div>
    );
};

export default ShowCard;