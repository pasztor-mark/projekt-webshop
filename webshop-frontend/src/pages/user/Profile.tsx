import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCookie, Guide, Lesson, User } from "../../../../shared/types";
import { fetchProfile } from "@/lib/requests";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  FaBookBookmark,
  FaClockRotateLeft,
  FaRegBookmark,
  FaRegCircleQuestion,
  FaRegLightbulb,
  FaShareFromSquare,
} from "react-icons/fa6";
import { toast } from "sonner";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import GuideTab from "@/components/Home/guide-tab";
import LessonTab from "@/components/Home/lesson-tab";
interface ProfileProps extends User {
  authoredGuides: Guide[];
  hostedLessons: Lesson[];
}

export default function Profile() {
  const [user, setUser] = useState<ProfileProps | null>(null);
  const { userId } = useParams();
  useEffect(() => {
    async function getProfile() {
      const token = getCookie("token");

      if (token && userId) {
        const req = await fetchProfile(token, +userId!);
        setUser(req);
        console.log(req);
      } else throw new Error("Token or user not found");
    }
    getProfile();
  }, []);

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Profil hivatkozás másolva a vágólapra");
      })
      .catch((err) => {
        toast.error("Másolás sikertelen");
      });
  };

  return (
    <div className="p-4 h-[90vh] mt-3 rounded-3xl bg-stone-300 dark:bg-neutral-800">
      <div className="flex flex-row flex-wrap w-full items-center justify-between">
        <span className="flex flex-row justify-between w-full sm:w-fit items-center gap-4">
          <Avatar className="w-16 h-16 text-4xl border border-emerald-500">
            <AvatarFallback>
              {user?.name[0].toUpperCase()}
              {user?.name[1]}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl">{user?.name}</h1>
          <div className="block lg:hidden">
            <Button variant={"ghost"} onClick={copyToClipboard}>
              <FaShareFromSquare className="scale-150" size={44} />
            </Button>
          </div>
        </span>
        <div className="flex items-center flex-col mx-auto lg:flex-row justify-between flex-wrap xl:gap-28">
          <div className="flex items-center flex-col">
            <FaClockRotateLeft size={24} />
            <h5 className="text-lg font-semibold">Felhasználó ezóta</h5>
            {user?.createdAt!.split("T")[0]}
          </div>
          <div className="flex items-center flex-col">
            <FaBookBookmark size={24} />
            <h5 className="text-lg font-semibold">Írt tananyagok</h5>
            {user?.authoredGuides.length}
          </div>
          <div className="flex items-center flex-col">
            <FaRegLightbulb size={24} />
            <h5 className="text-lg font-semibold">Szervezett tanórák</h5>
            {user?.hostedLessons.length}
          </div>
        </div>
        <div className="hidden lg:block">
          <Button variant={"ghost"} onClick={copyToClipboard}>
            <FaShareFromSquare className="scale-150" size={44} />
          </Button>
        </div>
      </div>
      <hr className="w-[98%] border border-neutral-500 my-6 mx-auto" />
      <div className="flex flex-col lg:justify-between lg:flex-row flex-wrap gap-4">
        <div className=" flex-1">
        <h3 className="mx-auto text-center text-2xl flex items-center justify-center gap-2">
            <FaRegBookmark size={24} />
            Tananyagok
          </h3>
          <hr className=" border border-white w-[90%] my-3 mx-auto" />
          <div className="flex flex-col gap-2 px-3">
            <ScrollArea>
              {user && user.authoredGuides.length > 0 ? (
                user.authoredGuides?.map((guide) => <GuideTab guide={guide} />)
              ) : (
                <div className="mt-4 gap-2 text-lg flex h-full text-neutral-500 flex-col justify-center items-center">
                  <FaRegCircleQuestion size={42} />
                  <p>Ez a felhasználó még nem írt tananyagot</p>
                  <a href="#" className="text-emerald-500 underline">
                    Keress másnál!
                  </a>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
        <div className=" flex-1">
          <h3 className="mx-auto text-center text-2xl flex items-center justify-center gap-2">
            <FaRegLightbulb size={24} />
            Tanórák
          </h3>
          <hr className=" border border-white w-[90%] my-3 mx-auto" />
          <div className="flex flex-col gap-2 px-3">
            <ScrollArea>
              {user && user.hostedLessons.length > 0 ? (
                user.hostedLessons?.map((les) => <LessonTab lesson={les} />)
              ) : (
                <div className="mt-4 gap-2 text-lg flex h-full text-neutral-500 flex-col justify-center items-center">
                  <FaRegCircleQuestion size={42} />
                  <p>Ez a felhasználó még nem szervezett tanórát.</p>
                  <a href="#" className="text-emerald-500 underline">
                    Keress másnál!
                  </a>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
