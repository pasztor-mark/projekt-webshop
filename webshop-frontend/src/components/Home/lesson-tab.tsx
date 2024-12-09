import { SubjectComponent } from "@/lib/componentGenerator";
import { Lesson } from "../../../../shared/types";

export default function LessonTab({lesson}: {lesson: Lesson}) {
    const date = new Date(lesson.startTime)
    return (
        <>
            <div className="w-full rounded-2xl hover:border-emerald-600 hover:bg-neutral-600 border border-white flex flex-row items-center justify-between p-3">
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