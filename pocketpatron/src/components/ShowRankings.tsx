import { createClient } from "../../utils/supabase/server";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button } from "./ui/button";


export default async function ShowRankings() {
    const supabase = await createClient();

    const { data: { user }, error : userError } = await supabase.auth.getUser();
    const user_id = user?.id;
    const {data: shows} = await supabase.from("latest_user_show_scores").select('*').eq('user_id', user_id).order('elo_score', {ascending: false});

    const truncate = (text: string) => {
        return text.length > 30 ? text.substring(0, 30) + '...' : text;
    }
    return (
        <div>
            {shows?.length === 0 && (
                    <div className="flex items-center justify-center flex-col my-10">
                        <div className="text-4xl font-sans font-bold my-2">Settle down, you haven't added any shows!</div>
                        <div className="text-muted-foreground font-mono">Add shows to view your rankings</div>
                        <Link href="/add_shows" className="m-2">
                            <Button className="text-lg font-sans">Add Shows</Button>
                        </Link>
                    </div>
                )
            }
            <div className="text-4xl font-sans font-bold my-2">Show Rankings</div>
            <div className="flex flex-col items-center gap-2">
                {shows?.map((show) => (
                    <Link href={`/show/${show.show_id}`} key={show.show_id} className="grid grid-cols-3 gap-2 w-full lg:w-1/2 mx-3 border-b-2" scroll={false}>
                        <div className="flex justify-center items-center pb-2">
                            <Image src={show.image_url} alt={show.title} width={75} height={200}/>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-xl font-semibold font-sans">{truncate(show.title)}</div>
                            <div className="font-mono text-muted-foreground">{show.season}</div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold font-sans">{Math.round(show.elo_score /100 * 10) / 10}</div>
                            <div className="text-muted-foreground font-mono">08.13.2024</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}