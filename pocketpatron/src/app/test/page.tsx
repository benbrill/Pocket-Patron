// app/shows/page.tsx
'use client'
import AddShow from "@/components/AddShow";
import { useRouter } from "next/navigation";


export default function Test() {
  const router = useRouter();
  console.log("Navigating to /comparison/new");
  router.push('/comparison/new');

return (
  <div>
    {/* <AddShow/> */}
  </div>
  );
}
