import ShowCard from "./ShowCard";
import Link from "next/link";

interface ShowCardProps {
    title: string;
    imageUrl: string;
    show_id: number
}

export default function ShowCardLink( {title, imageUrl, show_id}: ShowCardProps ) {

    return (
        <Link href={`/show/${show_id}`} scroll={false}>
            <ShowCard title={title} imageUrl={imageUrl} show_id={show_id}/>
        </Link>
    )
}