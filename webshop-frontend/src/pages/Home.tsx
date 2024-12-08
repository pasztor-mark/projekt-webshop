import { useOutletContext } from "react-router"
import { User } from "../../../shared/types"

export default function Home() {
    const {user}: {user: User} = useOutletContext()
    console.log(user)
   return (
        <>
        <div className="">
            <h1 className="text-4xl">Hello {user?.name}!</h1>
        </div>
        </>
    )
}
