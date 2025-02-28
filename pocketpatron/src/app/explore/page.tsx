import { createClient } from "../../../utils/supabase/client";
import DisplayCardHome from "@/components/DisplayCardHome";

async function getData() {
      const supabase = await createClient();
      const { data: shows, error } = await supabase.from("shows").select('*').order('season', {ascending: false});
      return { shows: shows ?? [] };
}

export default async function Explore() {
    const data = await getData();
      console.log(data);
      return (
        <div className="font-[family-name:var(--font-mono-sans)]">
          <DisplayCardHome data={data}/>
        </div>
      )
}