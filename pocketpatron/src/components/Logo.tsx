import Link from "next/link";

export default function Logo() {
    return (
        <Link href = '/dashboard' className="flex justify-center items-center lg:h-20 h-15 w-fit p-3 bg-yellow-400 text-black lg:my-5">
            <span className="lg:text-6xl text-3xl tracking-tightest font-sans font-extrabold">PocketPatron</span>
        </Link>
    );
}