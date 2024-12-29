
'use client'
import { Button } from "./ui/button"
import { signout } from "@/app/login/actions"

export default function Signout() {
    return (
        <Button onClick={signout}>Sign out</Button>
    )
}