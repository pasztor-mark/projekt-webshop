import { useEffect, useState } from "react";
import { GuideWithAuthor, LessonWithHost, User } from "@/../../shared/types";

import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import CartItem from "../Listing/CartItem";

export default function Payment({
  user,
  guideCart,
  lessonCart,
  totalPrice,
  lessons = [],
  guides = [],
}: {
  user: User;
  guideCart: number[];
  lessonCart: number[];
  totalPrice: number;
  lessons?: LessonWithHost[];
  guides?: GuideWithAuthor[];
}) {
  const [pendingPayment, setPendingPayment] = useState<{
    id: number;
    totalPrice: number;
    status: string;
  } | null>(null);
  async function updateStatus(id: number) {
    console.log(id);
    const res = await fetch(`http://localhost:3000/orders/${id}/status`, {
      method: "PATCH",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Paid",
      }),
    });
    if (res.ok) {
      localStorage.removeItem("guideCart");
      localStorage.removeItem("lessonCart");
      window.location.reload();
    } else {
      console.log(res.text);
      throw new Error("Failed to update payment status");
    }
  }
  useEffect(() => {
    if (!user) return;

    async function fetchPendingPayment() {
      const res = await fetch(
        `http://localhost:3000/orders/customer/${user.id}/pending`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data[0] && data[0].status === "Paid") {
        setPendingPayment(data[0]);
      } else {
        createNewPayment();
      }
    }

    async function createNewPayment() {
      const res = await fetch(`http://localhost:3000/orders`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          totalPrice: totalPrice,
          customerId: user.id,
          guideIds: guideCart,
          lessonIds: lessonCart,
          status: "Pending",
        }),
      });

      if (res.ok) {
        const data = await res.json();

        setPendingPayment(data);
      } else {
        throw new Error("Failed to create new payment");
      }
    }

    fetchPendingPayment();
  }, [user, guideCart, lessonCart, totalPrice]);

  return (
    <DialogContent>
      <section className="flex flex-row justify-between mx-auto">
        <div className="flex flex-col gap-5">
          {pendingPayment ? (
            lessons.map((lesson: LessonWithHost) => (
              <CartItem
                key={lesson.id}
                lesson={lesson}
                display
                onRemove={() => {}}
              />
            ))
          ) : (
            <p>Nincs tanóra a kosarában.</p>
          )}
          {pendingPayment ? (
            guides.map((guide: GuideWithAuthor) => (
              <CartItem
                key={guide.id}
                guide={guide}
                display
                onRemove={() => {}}
              />
            ))
          ) : (
            <p>Nincs tanóra a kosarában.</p>
          )}
          <p className="text-xl">
            Összesen: <b>{totalPrice}</b> Ft
          </p>
          {pendingPayment && (
            <Button
              onClick={() => {
                updateStatus(pendingPayment.id);
              }}
              className="bg-emerald-500"
            >
              Fizetés
            </Button>
          )}
          <DialogClose onClick={() => window.location.reload()}>
            Vissza
          </DialogClose>
        </div>
      </section>
    </DialogContent>
  );
}
