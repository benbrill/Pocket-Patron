import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src="/pp_hero.svg" alt="image" height={700} width={400}/>
      <div className="flex flex-col items-center 
      bg-gradient-to-bl from-zinc-600 to-zinc-800 rounded-md backdrop-opacity-20 ring-2 ring-zinc-600 p-5
      font-sans text-white text-center">
        <h1 className="text-4xl font-bold">Welcome to PocketPatron</h1>
        <p className="text-lg">A platform to track your favorite shows and their rankings</p>
      </div>
      <Link href = "/login">
        <Button className="mt-4 font-sans">Get Started</Button>
      </Link>
    </div>
  );
}
