import { useParams } from "react-router";
import { Lesson } from "../../../../shared/types";
import { useEffect, useState } from "react";
import { SubjectComponent } from "@/lib/componentGenerator";
import { Separator } from "../ui/separator";
import { FaCheckDouble, FaClockRotateLeft } from "react-icons/fa6";

export default function LessonPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  useEffect(() => {
    async function getLesson() {
      const req = await fetch("http://localhost:3000/lessons/" + lessonId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (req.ok) {
        const data = await req.json();
        setLesson(data);
      }
    }
    getLesson();
  }, []);
  return (
    <>
      {lesson ? (
        <div className="w-full h-full flex flex-col items-center  m-3 pt-12 rounded-3xl bg-neutral-700">
          <h1 className="text-3xl">{lesson?.title}</h1>
          <Separator className="my-3" />
          <p>{lesson?.description}</p>
          <div className="flex items-center gap-4">
            <SubjectComponent subject={lesson!.subject!} />
            <p>{lesson?.level}</p>
            <p>{lesson?.subject}</p>
          </div>
          <div>
            <time className="flex items-center gap-4">
              <FaClockRotateLeft />
              {new Date(lesson!.startTime).toLocaleString()}
            </time>
            <time className="flex items-center gap-4">
              <FaCheckDouble />
              {new Date(lesson!.endTime).toLocaleString()}
            </time>
          </div>
        </div>
      ) : (
        <p>Nincs ilyen tanóra.</p>
      )}
    </>
  );
}
