import { FaBasketShopping } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Separator } from "../ui/separator";
import {
  getCookie,
  GuideWithAuthor,
  LessonWithHost,
  User,
} from "../../../../shared/types";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";

import Payment from "../Payment/Payment";


export default function Cart({
  lessonCart,
  removeFromLessonCart,
  guideCart,
  removeFromGuideCart,
  user
}: {
  lessonCart: number[];
  removeFromLessonCart: (id: number) => void;
  guideCart: number[];
  removeFromGuideCart: (id: number) => void;
  user: User
}) {
  const [lessons, setLessons] = useState<LessonWithHost[]>([]);
  
  const lessonSubtotal = lessons.reduce((acc, lesson) => acc + lesson.price, 0);
  const [guides, setGuides] = useState<GuideWithAuthor[]>([]);
  const guideSubtotal = guides.reduce((acc, guide) => acc + guide.price, 0);
  async function fetchCart() {
    const lessonIds = lessonCart.join(",");
    const guideIds = guideCart.join(",");
    const lessonUrl = `http://localhost:3000/lessons/cart?ids=${lessonIds}`;
    const guideUrl = `http://localhost:3000/guides/cart?ids=${guideIds}`;

    const token = getCookie("token");

    const lessons = await fetch(lessonUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (lessons.ok) {
      const data = await lessons.json();
      setLessons(data);
    } else {
      console.error("Failed to fetch lessons");
      return null;
    }
    const guides = await fetch(guideUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (guides.ok) {
      const data = await guides.json();
      setGuides(data);
    } else {
      console.error("Failed to fetch guides");
      return null;
    }
  }

  useEffect(() => {
    fetchCart();
  }, [lessonCart, guideCart]);

  return (
    <Drawer direction="left" onOpenChange={() => fetchCart()}>
      <DrawerTrigger onClick={() => fetchCart()}>
        <Button
          className="bg-emerald-500 w-12 h-12 rounded-full"
          variant={"outline"}
        >
          <FaBasketShopping />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen  w-3/4 lg:w-1/4 overflow-y-auto ">
        <DrawerHeader>
          <DrawerTitle className="text-center text-2xl">Kosár</DrawerTitle>
          <DrawerDescription className="text-center text-lg">
            A kosárban lévő tanórák és tananyagok
          </DrawerDescription>
          <Separator />
          <div className="flex flex-col gap-2">
            {lessons.map((lesson: LessonWithHost) => (
              <CartItem
                key={lesson.id}
                lesson={lesson}
                onRemove={() => removeFromLessonCart(lesson.id!)}
              />
            ))}
            <div className="border-y border-neutral-600 py-3 flex justify-between">
              <p className="text-lg">Tanóra részösszeg:</p>
              <p className="text-xl font-semibold">{lessonSubtotal} Ft</p>
            </div>
            {
              guides.map((guide: GuideWithAuthor) => (
                <CartItem
                  key={guide.id}
                  guide={guide}
                  onRemove={() => removeFromGuideCart(guide.id!)}
                />
              ))
            }
            <div className="border-y border-neutral-600 py-3 flex justify-between">
              <p className="text-lg">Tananyag részösszeg:</p>
              <p className="text-xl font-semibold">{guideSubtotal} Ft</p>
            </div>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <p className="text-lg text-center">Teljes összeg: <b>{guideSubtotal + lessonSubtotal} Ft</b></p>
          <p className="text-sm text-right">Az ár tartalmazza az ÁFÁ-t.</p>

            <Payment user={user} guideCart={guideCart} lessonCart={lessonCart} totalPrice={guideSubtotal + lessonSubtotal}/>

          <DrawerClose>
            <Button variant="ghost">Vissza</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
