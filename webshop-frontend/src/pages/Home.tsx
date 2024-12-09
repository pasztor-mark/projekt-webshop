import { useOutletContext } from "react-router"
import { getCookie, Lesson, User } from "../../../shared/types"
import { useState, useEffect } from "react"
import LessonData from "@/components/Home/lesson-data"
export default function Home() {
    const { user }: { user: User } = useOutletContext()
    const [lessons, setLessons] = useState<Lesson[] | null>(null)
    useEffect(() => {
        async function getLessons() {
            const token = getCookie('token')
            const res = await fetch("http://localhost:3000/lessons/participant/" + user.id, {
                method: "GET",
                credentials: "include",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            )
            if (res.ok) {
                const data = await res.json();
                setLessons(data);

            } else {
                console.error("Failed to fetch lessons");
            }
        }
        getLessons()
    }, [user]
    )
    return (
        <>
            <div className="">
                <h1 className="text-4xl">Hello {user?.name}!</h1>
                <h5 className="text-lg">Jó újra látni!</h5>
            </div>
            <div className="flex flex-wrap justify-between gap-4 mt-5">
                <LessonData lessons={lessons}/>
                <div className="bg-neutral-800 flex-1 h-screen rounded-3xl">
                </div>
            </div>
        </>
    )
}
