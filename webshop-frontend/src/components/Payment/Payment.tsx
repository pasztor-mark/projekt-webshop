import { useEffect, useState } from "react";
import { getCookie, Guide, Lesson, User } from "@/../../shared/types";
import { useOutletContext } from "react-router";
import { DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";


export default function Payment({ user, guideCart, lessonCart, totalPrice }: { user: User, guideCart: number[], lessonCart: number[], totalPrice: number }) {
  const [pendingPayment, setPendingPayment] = useState<{id: number,  totalPrice: number; status: string } | null>(null);
  async function updateStatus(id: number) {
    const token = getCookie("token");
    
    const res = await fetch(`http://localhost:3000/orders/${id}`, {
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
      const data = await res.json();
      console.log(data)
      setPendingPayment(data);
    } else {
      throw new Error("Failed to update payment status");
    }
  }
  useEffect(() => {
    if (!user) return;
    const body = JSON.stringify({
        totalPrice: totalPrice,
        customerId: user.id,
        guideIds: guideCart,
        lessonIds: lessonCart
      })
      
    
    async function fetchPendingPayment() {
      const token = getCookie("token");
      console.log(token)
      const res = await fetch(`http://localhost:3000/orders/customer/${user.id}/pending`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      

        const data = await res.json();
        if (data[0]) {
            console.log(data[0])
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
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
          totalPrice: totalPrice,
          customerId: user.id,
          guideIds: guideCart,
          lessonIds: lessonCart
        })
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

    <section className="flex flex-row justify-between">
      <div className="flex flex-col">
        {pendingPayment ? (
          <div>
            <h2>Pending Payment #{pendingPayment.id}</h2>
            <p>Total Price: {pendingPayment.totalPrice}</p>
            <p>Status: {pendingPayment.status}</p>
            <Button onClick={() => {
                updateStatus(pendingPayment.id)
            }} className="bg-emerald-500">Fizetés</Button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
        </DialogContent>
  );
}