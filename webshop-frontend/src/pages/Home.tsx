import { useOutletContext } from "react-router";
import { Guide, Lesson, User } from "../../../shared/types";
import { useState, useEffect } from "react";
import LessonData from "@/components/Home/lesson-data";
import GuideData from "@/components/Home/guide-data";
import { fetchGuides, fetchLessons } from "@/lib/requests";
export default function Home() {
  const { user }: { user: User } = useOutletContext();
  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  const [guides, setGuides] = useState<Guide[] | null>(null);
  useEffect(() => {
    async function fetchHome() {
      const les = await fetchLessons(user);
      const gui = await fetchGuides(user);
      setLessons(les);
      setGuides(gui);
    }
    fetchHome();
  }, [user]);
  return (
    <>
      <div className="">
        <h1 className="text-4xl">Hello {user?.name}!</h1>
        <h5 className="text-lg">Jó újra látni!</h5>
      </div>
      <div className="flex flex-wrap justify-between gap-4 mt-5">
        <LessonData lessons={lessons} />
        <GuideData guides={guides} />
      </div>
    </>
  );
}
