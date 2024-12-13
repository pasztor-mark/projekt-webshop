import { useEffect, useState } from "react";
import { FaBookAtlas } from "react-icons/fa6";
import { useParams } from "react-router";
import { getCookie, LessonWithHost } from "../../../../shared/types";
import LessonDisplay from "@/components/Listing/LessonDisplay";

export default function HostedLessons() {
  const {hostId} = useParams();
  
    const [lessons, setLessons] = useState<LessonWithHost[] | null>(null);
  useEffect(() => {
    async function fetchHostedLessons() {
        const token = await getCookie('token');
        const req = await fetch('http://localhost:3000/lessons/host/' + hostId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (req.ok) {
            const data = await req.json();
            
            setLessons(data);
        }
    }
    fetchHostedLessons();
  }, [])
  return (
    <section>
      <div className="mx-auto flex items-center justify-center text-center mt-4">
        <p className="text-center mx-auto"> 
          <FaBookAtlas size={72} className="text-center mx-auto text-emerald-500" />
          <h1 className="text-3xl">{lessons && lessons.length > 0 ? lessons[0].host?.name : "Nem találjuk ezt az írót...  "}</h1>
        </p>
      </div>
      <div>
              <div className=" mt-6 mb-20 grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-2 gap-4">
                {lessons && lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <LessonDisplay
                      key={lesson.id}
                      lesson={lesson}
                    />
                  ))
                ) : (
                  <div className="bg-stone-300 dark:bg-neutral-800 p-4 rounded-3xl flex flex-col gap-2 col-span-full row-span-full">
                    <h3>Nincs vásárolt tanóra.</h3>
                    <p>Vásárolj a Tanórák katalógusban.</p>
                  </div>
                )}
                </div>
      </div>
    </section>
  );
}