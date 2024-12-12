import { useEffect, useState } from "react";
import { getCookie, User } from "@/../../shared/types";

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FaCheckDouble } from "react-icons/fa6";

export default function Payment({
  user,
  guideCart,
  lessonCart,
  totalPrice,
}: {
  user: User;
  guideCart: number[];
  lessonCart: number[];
  totalPrice: number;
}) {
  const [dialogState, setDialogState] = useState(true);
  const [pendingPayment, setPendingPayment] = useState<{
    id: number;
    totalPrice: number;
    status: string;
  } | null>(null);
  async function updateStatus(id: number) {
    const token = getCookie("token");
    console.log(id)
    const res = await fetch(`http://localhost:3000/orders/${id}/status`, {
      method: "PATCH",
      credentials: "include",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Paid"
      })
    });
    if (res.ok) {
      setDialogState(false);
      localStorage.removeItem("guideCart");
      localStorage.removeItem("lessonCart");
    } else {
      console.log(res.text)
      throw new Error("Failed to update payment status");
    }
  }
  useEffect(() => {
    if (!user) return;

    async function fetchPendingPayment() {
      const token = getCookie("token");

      const res = await fetch(
        `http://localhost:3000/orders/customer/${user.id}/pending`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
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
      const token = getCookie("token");
      const res = await fetch(`http://localhost:3000/orders`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
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
    <Dialog open={dialogState}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500">
          <FaCheckDouble />
          Fizetés
        </Button>
      </DialogTrigger>
      <DialogContent>
        <section className="flex flex-row justify-between">
          <div className="flex flex-col">
            {pendingPayment ? (
              <div>
                <h2>Pending Payment #{pendingPayment.id}</h2>
                <p>Total Price: {pendingPayment.totalPrice}</p>
                <p>Status: {pendingPayment.status}</p>
                <Button
                  onClick={() => {
                    updateStatus(pendingPayment.id);
                  }}
                  className="bg-emerald-500"
                >
                  Fizetés
                </Button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <DialogClose onClick={() => setDialogState(false)}/>
        </section>
      </DialogContent>
    </Dialog>
  );
}
