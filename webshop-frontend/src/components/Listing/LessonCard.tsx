import { SubjectComponent } from "@/lib/componentGenerator";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { LessonWithHost, User } from "../../../../shared/types";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { FaCartPlus, FaCheckDouble, FaCartArrowDown, FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function LessonCard({
  lesson,
  user,
  addToLessonCart,
  removeFromLessonCart,
  lessonCart,
}: {
  lesson: LessonWithHost;
  user: User;
  addToLessonCart: (id: number) => void;
  removeFromLessonCart: (id: number) => void;
  lessonCart: number[];
}) {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(lessonCart.includes(lesson.id!));
  }, [lessonCart, lesson.id]);

  const isPurchased = lesson.orders.some((order) => order.customerId === user.id);
  const isAuthor = lesson.host.id === user.id;

  return (
    <Card className="flex flex-col">
      <CardHeader className="basis-3/12">
        <div className="flex flex-row justify-between items-center">
          <SubjectComponent subject={lesson.subject} />
          <h2 className="text-lg font-bold">{lesson.title}</h2>
        </div>
        <div className="flex justify-between items-center">
          <h6>{lesson.createdAt?.split('T')[0]}</h6>
          <h6 className="italic text-right">- {lesson.host.name}</h6>
        </div>
      </CardHeader>
      <CardContent className="basis-7/12">
        <span className="flex justify-between font-semibold my-2 flex-row-reverse">
          <h3>{lesson.level}</h3>
          <h3>{lesson.subject}</h3>
        </span>
        <h3 className="w-full">{lesson.description}</h3>
        {lesson.orders.length > 0 && <p className="text-center">{lesson.orders.length} tanuló</p>}
      </CardContent>
      <Separator />
      <CardFooter className="basis-2/12 flex flex-col">
        <p className="font-semibold my-2 text-lg text-center mx-auto">{lesson.price} Ft</p>
        {isPurchased ? (
          <Button disabled className="w-full">
            <FaCheckDouble /> Már megvásároltad
          </Button>
        ) : isInCart ? (
          <Button
            className="w-full border-emerald-500"
            variant={"outline"}
            onClick={() => {
              removeFromLessonCart(lesson.id!);
              setIsInCart(false);
            }}
          >
            <FaCartArrowDown /> Kivétel a kosárból
          </Button>
        ) : isAuthor ? (
          <Button disabled className="w-full">
            <FaPencil /> Saját tanóra
          </Button>
        ) : (
          <Button
            className="w-full bg-emerald-500"
            onClick={() => {
              addToLessonCart(lesson.id!);
              setIsInCart(true);
            }}
          >
            <FaCartPlus /> Hozzáadás a kosárhoz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
