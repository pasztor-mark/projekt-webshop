import { SubjectComponent } from "@/lib/componentGenerator";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { GuideWithAuthor, User } from "../../../../shared/types";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  FaCartArrowDown,
  FaCartPlus,
  FaCheckDouble,
  FaPencil,
} from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function GuideCard({
  guide,
  user,
}: {
  guide: GuideWithAuthor;
  user: User;
}) {
  const isPurchased = guide?.orders.some(
    (order) => order.customerId === user?.id
  );
  const isAuthor = guide.author.id === user.id;
  const [isInCart, setIsInCart] = useState<boolean>(false);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsInCart(cart.includes(guide.id));
  }, [guide.id]);
  return (
    <Card className="flex flex-col">
      <CardHeader className="basis-3/12">
        <div className="flex flex-row justify-between items-center">
          {<SubjectComponent subject={guide.subject} />}
          <h2 className="text-lg font-bold">{guide.title}</h2>
        </div>
        <div className="flex justify-between items-center">
          <h6>{guide.createdAt?.split("T")[0]}</h6>
          <h6 className="italic text-right">- {guide.author.name}</h6>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="basis-7/12">
        <span className="flex justify-between font-semibold my-2 flex-row-reverse">
          <h3>{guide.level}</h3>
          <h3>{guide.subject}</h3>
        </span>
        <h3 className="w-full">{guide.description}</h3>
        {guide.orders.length > 0 && (
          <p className="text-center">{guide.orders.length} eladott példány</p>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="basis-2/12 flex flex-col">
        <p className="font-semibold my-2 text-lg text-center mx-auto">
          {guide.price} Ft
        </p>
        {isPurchased ? (
          <Button disabled className="w-full">
            <FaCheckDouble /> Már megvásároltad
          </Button>
        ) : isInCart ? (
          <Button
            className="w-full border-emerald-500"
            variant={"outline"}
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem("cart") || "[]");
              const updatedCart = cart.filter((id: string) => +id !== guide.id);
              localStorage.setItem("cart", JSON.stringify(updatedCart));
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
              const cart = JSON.parse(localStorage.getItem("cart") || "[]");
              if (!cart.includes(guide.id)) {
                cart.push(guide.id);
                localStorage.setItem("cart", JSON.stringify(cart));
                setIsInCart(true);
              }
            }}
          >
            <FaCartPlus /> Hozzáadás a kosárhoz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
