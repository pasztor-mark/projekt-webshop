import { useParams } from "react-router";
import { Lesson } from "../../../../shared/types";
import { useEffect, useState } from "react";
import { SubjectComponent } from "@/lib/componentGenerator";
import { Separator } from "../ui/separator";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function GuidePage() {
  const { guideId } = useParams();
  const [guide, setGuide] = useState<Lesson | null>(null);
  useEffect(() => {
    async function getGuide() {
      const req = await fetch("http://localhost:3000/guides/" + guideId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (req.ok) {
        const data = await req.json();
        setGuide(data);
      }
    }
    getGuide();
  }, []);
  return (
    <>
      {guide ? (
        <div className="w-full h-full flex flex-col items-center  m-3 pt-12 rounded-3xl bg-neutral-200 dark:bg-neutral-700">
          <h1 className="text-3xl">{guide?.title}</h1>
          <Separator className="my-3" />
          <p>{guide?.description}</p>
          <div className="flex items-center gap-4">
            <SubjectComponent subject={guide!.subject!} />
            <p>{guide?.level}</p>
            <p>{guide?.subject}</p>
          </div>
          <div>
            <time className="flex items-center gap-4">
              <FaClockRotateLeft />
              Létrehozva: {guide!.createdAt}
            </time>
          </div>
        </div>
      ) : (
        <p>Nincs ilyen tanóra.</p>
      )}
    </>
  );
}
