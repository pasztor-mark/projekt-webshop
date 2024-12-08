import OrderSelector from "@/components/Listing/OrderSelector";
import { Input } from "@/components/ui/input";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getCookie, Guide, GuideWithAuthor, Subject, User } from "@/../../shared/types";
import { useEffect, useState } from "react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import GuideCard from "@/components/Listing/GuideCard";
import { useOutletContext } from "react-router";
import SubjectSelector from "@/components/Listing/SubjectSelector";

export default function Guides() {
  
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const guideAttributes = Object.keys({
    id: 0,
    title: "",
    description: "",
    author: "",
  }) as (keyof Guide)[];
  function handleOrderChange(factor: string, order: "asc" | "desc") {
    setOrderFactor({ orderFactor: factor, order });
    
  }
  const {user}: {user: User} = useOutletContext()
  const [search, setSearch] = useState<string>("");
  const [guides, setGuides] = useState<GuideWithAuthor[] | null>(null);
  const [orderFactor, setOrderFactor] = useState<{
    orderFactor: string;
    order: "asc" | "desc";
  }>({ orderFactor: "id", order: "asc" });
  useEffect(() => {
    async function fetchGuideList() {
      const token = getCookie("token");
      const res = await fetch(`http://localhost:3000/guides/list?page=${page}&pageSize=${pageSize}&search=${search}&orderFactor=${orderFactor.orderFactor}&order=${orderFactor.order}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setGuides(data.guides);
        setTotalPages(data.totalPages)
      } else {
        throw new Error("Failed to fetch guides");
      }
    }
    fetchGuideList();
  }, [page, pageSize, search, orderFactor]);

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-3xl">Tananyagok</h1>
        <p className="text-lg">
          Böngészd a tananyagok széles választékát, és bővítsd a tudásod!
        </p>
      </div>
      <div className="flex lg:flex-row flex-col lg:items-center gap-4">
        <span className="flex items-center gap-4">
          <FaMagnifyingGlass size={24} />
          <Input
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Keresés"
          />
        </span>
        <hr className="dark:border-white border h-7" />
        {guideAttributes.map((attr) => (
          <OrderSelector key={attr} text={attr} onChange={handleOrderChange} />
        ))}
        {}
    {Object.values(Subject).map((subject) => (
        <SubjectSelector key={subject} subject={subject} />
    ))}
      </div>
    <div className=" mt-6 mb-20 grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-2 gap-4">
      {guides && guides.length > 0 ? (
        guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} user={user} />
        ))
      ) : (
        <div className="bg-stone-300 dark:bg-neutral-800 p-4 rounded-3xl flex flex-col gap-2 col-span-full row-span-full">
        <h3>Nincs találat</h3>
        <p>Próbálj meg egy másik keresést!</p>
        </div>
      )}
    </div>
      <div className="lg:fixed my-5 lg:left-1/2 bottom-6 bg-neutral-300 dark:bg-stone-500 rounded-xl">
      <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage((prev) => Math.max(prev - 1, 1))}  />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => setPage(index + 1)}>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}  />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      </div>
    </section>
  );
}
