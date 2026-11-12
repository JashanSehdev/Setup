'use Client'
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function AuthNavigator ({
    children
} : {
    children : ReactNode
}) {

    const router = useRouter()

    useEffect(() => {
        window.addEventListener('auth:navigator', ()=>{
            router.replace("/login")
        } )

        return () => {
            window.removeEventListener('auth:navigator', ()=> {
                router.replace("/login")
            })
        }
    }, [router])
    return (
        <>
            {children}
        </>
    )
}