import DisplayCardHome from "@/components/DisplayCardHome";
import ShowRankings from "@/components/ShowRankings";
import SignIn from "@/components/SignIn";
import Signout from "@/components/Signout";
import { createClient } from "../../../utils/supabase/client";

async function getData() {
      const supabase = await createClient();
      const { data: shows, error } = await supabase.from("shows").select('*').order('season', {ascending: false});
      return { shows: shows ?? [] };
}

export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
    <div className="font-[family-name:var(--font-mono-sans)]">
      <Signout />
      <ShowRankings />
      <DisplayCardHome data={data}/>
    </div>
  );
}
