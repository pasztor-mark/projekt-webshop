import { FaBook, FaGraduationCap, FaX } from "react-icons/fa6";
import {GuideWithAuthor, LessonWithHost } from "../../../../shared/types";
import { SubjectComponent } from "@/lib/componentGenerator";
import { Button } from "../ui/button";

export default function CartItem({lesson, guide, onRemove}: {lesson?: LessonWithHost, guide?: GuideWithAuthor, onRemove?: () => void}) {

   return (
        <div className="flex justify-between items-center">
        {
            (lesson && !guide) ? <FaGraduationCap size={32} /> : <FaBook size={32} />
        }
        <span className="flex-1 ml-5">
            <p className="text-lg font-semibold">{lesson ? lesson.title : guide?.title}</p>
            <p className="flex items-center justify-start">
                <SubjectComponent subject={lesson ? lesson.subject : guide?.subject!} size={16} />
                <span className="mx-2">{lesson ? lesson.level : guide?.level}</span>
                <span>{lesson ? lesson.subject : guide?.subject}</span>
            </p>
        </span>
        <span className="flex items-center">
            <p>{lesson ? lesson.price : guide?.price} Ft</p>
            <Button  variant={"destructive"} onClick={onRemove} className="ml-4 w-8 h-8"><FaX/></Button>
        </span>
        </div>
    )
}
