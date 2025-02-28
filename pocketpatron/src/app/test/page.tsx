// app/shows/page.tsx
'use client'
import AddShow from "@/components/AddShow";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";


export default function Test() {

return (
  <div>
    <div className='bg-grey-400 w-screen h-screen'></div>
    <NavBar />
  </div>
  );
}
