import { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useOutletContext } from "react-router";
import { LessonWithHost, User } from "../../../../shared/types";
import LessonDisplay from "@/components/Listing/LessonDisplay";

export default function PurchasedLessons() {
  const { user }: { user: User } = useOutletContext();

  const [lessons, setLessons] = useState<LessonWithHost[] | null>(null);
  useEffect(() => {
    async function fetchPurchasedLessons() {
      const req = await fetch(
        "http://localhost:3000/lessons/customer/" + user.id,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (req.ok) {
        const data = await req.json();
        setLessons(data);
      }
    }
    fetchPurchasedLessons();
  }, []);
  return (
    <section>
      <div className="mx-auto flex items-center justify-center text-center mt-4">
        <p className="text-center mx-auto">
          <FaGraduationCap
            size={72}
            className="text-center mx-auto text-emerald-500"
          />
          <h1 className="text-3xl">Vásárolt tanórák</h1>
          <p className="text-lg">
            Üdvözöljük a megvásárolt tanórák oldalán! Itt találhatók az összes
            eddig megvásárolt tanórája. Kérjük, válasszon a listából, és kezdje
            el a tanulást!
          </p>
        </p>
      </div>
      <div>
        <div className=" mt-6 mb-20 grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-2 gap-4">
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson) => (
              <LessonDisplay key={lesson.id} lesson={lesson} />
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
