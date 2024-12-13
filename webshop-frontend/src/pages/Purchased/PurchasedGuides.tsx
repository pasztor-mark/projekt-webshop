import { useEffect, useState } from "react";
import { FaBookAtlas } from "react-icons/fa6";
import { useOutletContext } from "react-router";
import { getCookie, GuideWithAuthor, User } from "../../../../shared/types";

import GuideDisplay from "@/components/Listing/GuideDisplay";

export default function PurchasedGuides() {
  const { user }: {user: User} = useOutletContext();
  
    const [guides, setGuides] = useState<GuideWithAuthor[] | null>(null);
  useEffect(() => {
    async function fetchPurchasedGuides() {
        const token = await getCookie('token');
        const req = await fetch('http://localhost:3000/guides/customer/' + user.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (req.ok) {
            const data = await req.json();
            setGuides(data[0]);
        }
    }
    fetchPurchasedGuides();
  }, [])
  return (
    <section>
      <div className="mx-auto flex items-center justify-center text-center mt-4">
        <p className="text-center mx-auto"> 
          <FaBookAtlas size={72} className="text-center mx-auto text-emerald-500" />
          <h1 className="text-3xl">Vásárolt tananyagok</h1>
          <p className="text-lg">
            Üdvözöljük a megvásárolt tananyagok oldalán! Itt találhatók az összes eddig megvásárolt tananyaga. Kérjük, válasszon a listából, és kezdje el a tanulást!
          </p>
        </p>
      </div>
      <div>
              <div className=" mt-6 mb-20 grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-2 gap-4">
                {guides && guides.length > 0 ? (
                  guides.map((guide) => (
                    <GuideDisplay
                      key={guide.id}
                      guide={guide}
                    />
                  ))
                ) : (
                  <div className="bg-stone-300 dark:bg-neutral-800 p-4 rounded-3xl flex flex-col gap-2 col-span-full row-span-full">
                    <h3>Nincs vásárolt tanóra.</h3>
                    <p>Vásárolj a Tanórák katalógusban.</p>
                  </div>
                )}
                </div>
      </div>
    </section>
  );
}
