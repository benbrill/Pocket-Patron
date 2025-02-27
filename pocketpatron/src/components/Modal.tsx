"use client"

import { set } from "date-fns"
import {
    Dialog,
    DialogOverlay,
    DialogContent,
} from "./ui/dialog"
import { useRouter, usePathname } from "next/navigation"
import path from "path"
import { useState, useEffect } from "react"

export function Modal({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(true)


    useEffect(() => {
        if (pathname === '/comparison/new') {
            setOpen(false)
        }
    }, [pathname])

    const handleOpenChange = () => {
            setOpen(false)
            router.back()
        // router.push('/comparison/new')
    }

    return (
        <Dialog defaultOpen={true} open={open} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                <DialogContent className="overflow-y-auto max-h-screen">
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}