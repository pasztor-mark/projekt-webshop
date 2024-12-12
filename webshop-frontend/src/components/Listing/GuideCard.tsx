import { SubjectComponent } from "@/lib/componentGenerator";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { GuideWithAuthor, User } from "../../../../shared/types";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { FaCartPlus, FaCheckDouble, FaCartArrowDown, FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function GuideCard({
  guide,
  user,
  addToGuideCart,
  removeFromGuideCart,
  guideCart,
}: {
  guide: GuideWithAuthor;
  user: User;
  addToGuideCart: (id: number) => void;
  removeFromGuideCart: (id: number) => void;
  guideCart: number[];
}) {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(guideCart.includes(guide.id!));
  }, [guideCart, guide.id]);

  const isPurchased = guide.orders.some((order) => order.customerId === user.id && order.status === "Paid");
  const isAuthor = guide.author.id === user.id;

  return (
    <Card className="flex flex-col">
      <CardHeader className="basis-3/12">
        <div className="flex flex-row justify-between items-center">
          <SubjectComponent subject={guide.subject} />
          <h2 className="text-lg font-bold">{guide.title}</h2>
        </div>
        <div className="flex justify-between items-center">
          <h6>{guide.createdAt?.split('T')[0]}</h6>
          <h6 className="italic text-right">- {guide.author.name}</h6>
        </div>
      </CardHeader>
      <CardContent className="basis-7/12">
        <span className="flex justify-between font-semibold my-2 flex-row-reverse">
          <h3>{guide.level}</h3>
          <h3>{guide.subject}</h3>
        </span>
        <h3 className="w-full">{guide.description}</h3>
        {guide.orders.length > 0 && <p className="text-center">{guide.orders.length} eladott példány</p>}
      </CardContent>
      <Separator />
      <CardFooter className="basis-2/12 flex flex-col">
        <p className="font-semibold my-2 text-lg text-center mx-auto">{guide.price} Ft</p>
        {isPurchased ? (
          <Button disabled className="w-full">
            <FaCheckDouble /> Már megvásároltad
          </Button>
        ) : isInCart ? (
          <Button
            className="w-full border-emerald-500"
            variant={"outline"}
            onClick={() => {
              removeFromGuideCart(guide.id!);
              setIsInCart(false);
            }}
          >
            <FaCartArrowDown /> Kivétel a kosárból
          </Button>
        ) : isAuthor ? (
          <Button disabled className="w-full">
            <FaPencil /> Saját tananyag
          </Button>
        ) : (
          <Button
            className="w-full bg-emerald-500"
            onClick={() => {
              addToGuideCart(guide.id!);
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
