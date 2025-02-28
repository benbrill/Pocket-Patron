'use client'
import Link from "next/link"
import useNavigation from "./hooks/use-navigation"

export default function NavBar() {

    const {isLaunch,
    isAccount,
    isDashboard,
    isExplore} = useNavigation()

    const minNavBar = `bg-zinc-800 h-10 w-10 flex justify-center items-center text-xl`

    return (
    <div className="flex justify-center">
        <div className = 'fixed bottom-5 m-auto flex justify-center items-center'>
            {/* <div className={minNavBar}>
                -
            </div> */}
            <Link className={minNavBar + (isDashboard ? ' text-yellow-400' : ' text-white')} href="/dashboard">
                H
            </Link>
            <Link className="bg-yellow-400 h-12 w-12 flex justify-center items-center text-black text-xl" href='/explore'>
                +
            </Link>
            <Link className={minNavBar + (isAccount ? ' text-yellow-400' : ' text-white')} href="/account">
                A
            </Link>
            {/* <div className={minNavBar}>
                -
            </div> */}
        </div>
    </div>
    )
}