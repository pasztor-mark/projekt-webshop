import { Lesson } from "../../../../shared/types";
import { FaCheckDouble, FaMagnifyingGlass } from "react-icons/fa6"
import LessonTab from "./lesson-tab";
export default function LessonData({lessons}: {lessons: Lesson[] | null}) {
    return (
        <>
                        <div className="bg-neutral-800 pt-4 flex-1 h-screen flex flex-col rounded-3xl">
                    <h3 className="mx-auto text-center text-2xl">Legközelebbi órák</h3>
                    <hr className="w-full border border-white w-[90%] my-3 mx-auto" />
                    <div className="flex flex-col gap-2 px-3">

                    {
                        (lessons && lessons?.length > 0) && lessons?.map((les) => <LessonTab lesson={les} />)
                    }

                    </div>
                    { (lessons && lessons?.length > 0) ? <div className="mt-4 flex text-neutral-500 flex-col justify-center items-center">
                        <hr className="w-[90%] border border-neutral-500 mb-6" />
                        <FaCheckDouble size={42}/>
                        <p>Ez az összes bejegyzett tanóra.</p>
                        <a href="#" className="text-emerald-500 underline">Foglalnál többet?</a>
                    </div> : <div className="mt-4 flex text-neutral-500 flex-col justify-center items-center">
                        <FaMagnifyingGlass size={42}/>
                        <p>Nincs bejegyezve tanóra.</p>
                        <a href="#" className="text-emerald-500 underline">Foglalj tanórát!</a>
                        </div>}
                </div>
        </>
    )
}