import DisplayCard from "../components/DisplayCard";
import ShowRankings from "@/components/ShowRankings";
import Logo from "@/components/Logo";
import { createClient } from "../../utils/supabase/server";
import {auth} from "../lib/auth"
import SignIn from "@/components/SignIn";
import Signout from "@/components/Signout";

export default async function Home() {
  return (
    <div className="font-[family-name:var(--font-mono-sans)]">
      <Signout />
      <ShowRankings />
      <DisplayCard />
    </div>
  );
}
