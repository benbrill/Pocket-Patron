import { createClient } from "../../utils/supabase/server";
import Image from "next/image";
import { Separator } from "./ui/separator";


export default async function ShowRankings() {
    const supabase = await createClient();

    const user_id = '98d5677a-aaad-473a-b798-284a244f261e'
    const {data: shows} = await supabase.from("latest_user_show_scores").select('*').eq('user_id', user_id).order('elo_score', {ascending: false});

    return (
        <div>
            <div className="text-4xl font-sans font-bold my-2">Show Rankings</div>
            <div className="flex flex-col items-center gap-2">
                {shows.map((show) => (
                    <div key={show.show_id} className="grid grid-cols-3 gap-2 w-full">
                        <div className="flex justify-center items-center">
                            <Image src={show.image_url} alt={show.title} width={100} height={300}/>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-xl font-bold font-sans">{show.title}</div>
                            <div>{show.season}</div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-5xl font-bold font-sans">{Math.round(show.elo_score /100 * 10) / 10}</div>
                            <div>08.13.2024</div>
                        </div>
                        <Separator className="my-1"/>
                    </div>
                ))}
            </div>
        </div>
    );
}