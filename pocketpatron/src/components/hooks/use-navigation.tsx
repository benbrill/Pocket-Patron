'use client'
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

export default function useNavigation() {
    const pathname = usePathname()

    const [isLaunch, setIsLaunch] = useState(false)
    const [isDashboard, setIsDashboard] = useState(false)
    const [isExplore, setIsExplore] = useState(false)
    const [isAccount, setIsAccount] = useState(false);

    useEffect(() => {
        setIsLaunch(false);
        setIsDashboard(false);
        setIsExplore(false);
        setIsAccount(false);
    
        switch (pathname) {
            case '/':
                setIsLaunch(true);
                break;
            case '/login':
                setIsLaunch(true);
                break;
            case '/dashboard':
                setIsDashboard(true);
                break;
            case '/explore':
                setIsExplore(true);
                break;
            case '/account':
                setIsAccount(true);
                break
            default:
                break
      }
    }, [pathname]);   

    return {
        isLaunch,
        isAccount,
        isDashboard,
        isExplore
    }

}