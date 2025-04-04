import { createClient } from "../../utils/supabase/server";
import Image from "next/image";

export default async function Feed() {
    const supabase = await createClient();
    const { data: { user }, error : userError } = await supabase.auth.getUser();
    const user_id = user?.id;
    // const {data: shows} = await supabase.from("latest_user_show_scores").select('*').eq('user_id', user_id).order('elo_score', {ascending: false});
    const {data: shows} = await supabase.from("user_shows").select('*, shows(*)').eq('user_id', user_id).order('initial_ranked_at', {ascending: false}).limit(6);

    return(
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-3xl font-bold">Feed</h1>
            {shows?.map(((show) => (
                <FeedItem key={show.shows.show_id} show={show} user={user}/>
            )))}
            <p className="text-lg">This is the feed section.</p>
        </div>
    )
}

function FeedItem({ show, user }: { show: {score: number, notes: string, shows: {image_filename: string,  title: string, watched_at: Date } }, user: any }) {
    return (
        <div className="flex items-center w-full h-full font-sans gap-3 min-h-48 max-w-[26rem] border-b-2 p-2">
            <div className="flex justify-center items-center pb-2">
                <Image src={`/${show.shows.image_filename}`} alt={show.shows.title} width={75} height={200} unoptimized/>
            </div>
            <div className="w-64">
                <div className="text-xs text-muted-foreground">{user.email} ranked</div>
                <div className="text-lg font-bold">{show.shows.title}</div>   
                <div className="text-xs align-self-end text-muted-foreground">{show.notes}</div>
            </div>
            <div>
                <div>
                    <div className="text-lg font-bold">{Math.round(show.score)}</div>
                </div>
            </div>
        </div>
    )
}
