import { SubjectComponent } from "@/lib/componentGenerator";
import { Lesson } from "../../../../shared/types";

export default function LessonTab({lesson}: {lesson: Lesson}) {
    const date = new Date(lesson.startTime)
    return (
        <>
            <div onClick={() => window.location.href = "/lessons/" + lesson .id!} className="w-full rounded-2xl hover:border-emerald-600 mb-3 hover:dark:bg-neutral-600 hover:bg-stone-200 border dark:border-white border-neutral-800 flex flex-row items-center justify-between p-3">
                <span className="flex flex-row items-center gap-4">
                    {SubjectComponent(lesson)}
                    <p>{lesson.subject}</p>
                    </span>
                

                <b>{lesson.title}</b>
                <time>{date.toLocaleString()}</time>
                
                
            </div>
        </>
    )
}