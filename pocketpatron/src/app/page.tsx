import DisplayCard from "../components/DisplayCard";
import ShowRankings from "@/components/ShowRankings";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-mono-sans)]">
      <div className="flex justify-center items-center h-20 w-fit p-3 bg-yellow-400 text-black mb-5 mt-5">
        <span className="text-6xl tracking-tightest font-sans font-extrabold">PocketPatron</span>
      </div>
      <ShowRankings />
      <DisplayCard />
    </div>
  );
}
