import { useState, useEffect } from "react"
import { Mail } from "@/components/mail/Mail"
import { accounts, mails } from "@/components/mail/data"

export default function MailPage() {
    const [defaultLayout, setDefaultLayout] = useState<number[] | undefined>(
        undefined
    )
    const [defaultCollapsed, setDefaultCollapsed] = useState<
        boolean | undefined
    >(undefined)

    useEffect(() => {
        const getCookieValue = (cookieName: string) => {
            const cookies = document.cookie.split(";")
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim()
                if (cookie.startsWith(cookieName + "=")) {
                    return cookie.substring(cookieName.length + 1)
                }
            }
            return null
        }

        const collapsedCookieValue = getCookieValue(
            "react-resizable-panels:collapsed"
        )
        if (collapsedCookieValue) {
            const parsedCollapsed = collapsedCookieValue === "true"
            setDefaultCollapsed(parsedCollapsed)
        }

        const layoutCookieValue = getCookieValue(
            "react-resizable-panels:layout"
        )
        if (layoutCookieValue) {
            const parsedLayout = JSON.parse(layoutCookieValue) as number[]
            setDefaultLayout(parsedLayout)
        }
    }, [])

    return (
        <>
            <div className="flex-col md:flex h-full border rounded-lg ">
                <Mail
                    accounts={accounts}
                    mails={mails}
                    defaultLayout={defaultLayout}
                    defaultCollapsed={defaultCollapsed}
                    navCollapsedSize={4}
                />
            </div>
        </>
    )
}
