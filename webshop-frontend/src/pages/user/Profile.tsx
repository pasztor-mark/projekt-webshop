import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
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
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/AuthContext";
interface ProfileProps extends User {
  authoredGuides: Guide[];
  hostedLessons: Lesson[];
}

export default function Profile() {
  const [fetchedUser, setUser] = useState<ProfileProps | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const {logout} = useAuth()
  async function handleNameUpdate() {
    const token = getCookie("token");
    const req = await fetch("http://localhost:3000/users/" + fetchedUser?.id + "/name", {
      method: "PATCH",
      headers: {
        'Authorization': "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });
    if (req.ok) {

      toast.success("Név frissítve");
      window.location.href = "/";
    }
    
    else toast.error( req.statusText)
  }
  async function handlePasswordUpdate() {
    const token = getCookie("token");
    const req = await fetch("http://localhost:3000/users/" + fetchedUser?.id + "/password", {
      method: "PATCH",
      headers: {
        'Authorization': "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword }),
    });
    if (req.ok) {
      await logout()
      window.location.href = "/";
      toast.success("Jelszó frissítve");
    }
    else {
      toast.error( req.statusText)
    }
  }
  const { userId } = useParams();
  const { user }: { user: User } = useOutletContext();
  useEffect(() => {
    async function getProfile() {
      const token = getCookie("token");

      if (token && userId) {
        const req = await fetchProfile(token, +userId!);
        setUser(req);
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
        toast.error("Másolás sikertelen:" + err);
      });
  };

  return (
    <div className="p-4 h-[90vh] mt-3 rounded-3xl bg-stone-300 dark:bg-neutral-800">
      <div className="flex flex-row flex-wrap w-full items-center justify-between">
        <span className="flex flex-row justify-between w-full sm:w-fit items-center gap-4">
          <Avatar className="w-16 h-16 text-4xl border border-emerald-500">
            <AvatarFallback>
              {fetchedUser?.name[0].toUpperCase()}
              {fetchedUser?.name[1]}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl">{fetchedUser?.name}</h1>
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
            {fetchedUser?.createdAt!.split("T")[0]}
          </div>
          <div className="flex items-center flex-col">
            <FaBookBookmark size={24} />
            <h5 className="text-lg font-semibold">Írt tananyagok</h5>
            {fetchedUser?.authoredGuides.length}
          </div>
          <div className="flex items-center flex-col">
            <FaRegLightbulb size={24} />
            <h5 className="text-lg font-semibold">Szervezett tanórák</h5>
            {fetchedUser?.hostedLessons.length}
          </div>
        </div>
        <div className="hidden lg:block">
          <Button variant={"ghost"} onClick={copyToClipboard}>
            <FaShareFromSquare className="scale-150" size={44} />
          </Button>
        </div>
      </div>
        {user.id! === fetchedUser?.id! ? (
          <div className="grid grid-cols-2 w-1/4 ml-auto">
            <Input onChange={(e) => setNewName(e.currentTarget.value)} type="text" placeholder="Név frissítése" />
            <Button onClick={() => handleNameUpdate()} className="w-1/3">Mentés</Button>
            <Input onChange={(e) => setNewPassword(e.currentTarget.value)} type="password" placeholder="Jelszó frissítése" />
            <Button className="w-1/3" onClick={() => handlePasswordUpdate()}>Mentés</Button>
          </div>
        ) : (
          <></>
        )}
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
              {fetchedUser && fetchedUser.authoredGuides.length > 0 ? (
                fetchedUser.authoredGuides?.map((guide) => (
                  <GuideTab guide={guide} />
                ))
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
              {fetchedUser && fetchedUser.hostedLessons.length > 0 ? (
                fetchedUser.hostedLessons?.map((les) => (
                  <LessonTab lesson={les} />
                ))
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
