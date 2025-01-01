import DisplayCard from "@/components/DisplayCard";
import ShowRankings from "@/components/ShowRankings";
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
