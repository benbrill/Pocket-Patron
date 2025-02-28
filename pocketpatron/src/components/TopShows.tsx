import { createClient } from "../../utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

async function getData() {
      const supabase = await createClient();
      const { data: { user }, error : userError } = await supabase.auth.getUser();
      const user_id = user?.id
      const { data: shows, error } = await supabase.from("latest_user_show_scores").select('*').eq('user_id', user_id).order('elo_score', {ascending: false}).range(0,3);
      return { shows: shows ?? [] };
}

const truncate = (text: string) => {
    return text.length > 30 ? text.substring(0, 30) + '...' : text;
}

export default async function TopShows() {
    const supabase = await createClient();
    const { data: { user }, error : userError } = await supabase.auth.getUser();
    const user_id = user?.id
    const { data: shows, error } = await supabase.from("latest_user_show_scores").select('*').eq('user_id', user_id).order('elo_score', {ascending: false}).range(0,2);
    
    return (
        <div>
            <div className='text-2xl font-bold font-sans text-center'>
                Your top shows
            </div>
            <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center pb-2">
                    <Image src={`/${shows![1].image_filename}`} alt={shows![1].title} width={75} height={200} unoptimized/>
                    <div className="text-l font-semibold font-sans text-center">{truncate(shows![1].title)}</div>
                    <div className="font-mono text-muted-foreground">{shows![1].season}</div>
                </div>
                <div className="flex flex-col justify-center items-center pb-2">
                    <Image src={`/${shows![0].image_filename}`} alt={shows![0].title} width={100} height={235} unoptimized/>
                    <div className="text-l font-semibold font-sans text-center">{truncate(shows![0].title)}</div>
                    <div className="font-mono text-muted-foreground">{shows![0].season}</div>
                </div>
                <div className="flex flex-col justify-center items-center pb-2">
                    <Image src={`/${shows![2].image_filename}`} alt={shows![2].title} width={75} height={200} unoptimized/>
                    <div className="text-l font-semibold font-sans text-center">{truncate(shows![2].title)}</div>
                    <div className="font-mono text-muted-foreground">{shows![2].season}</div>
                </div>
            </div>
        </div>
    )
}