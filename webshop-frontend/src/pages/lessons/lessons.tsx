import OrderSelector from "@/components/Listing/OrderSelector";
import { Input } from "@/components/ui/input";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  getCookie,
  Lesson,
  Subject,
  User,
  LessonWithHost,
} from "@/../../shared/types";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useOutletContext } from "react-router";
import SubjectSelector from "@/components/Listing/SubjectSelector";
import LessonCard from "@/components/Listing/LessonCard";

import Cart from "@/components/Listing/Cart";

export default function Lessons() {
  const [search, setSearch] = useState<string>("");
  const guideAttributes = Object.keys({
    id: 0,
    title: "",
    price: 0,
  }) as (keyof Lesson)[];

  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const subjects = Object.values(Subject);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(subjects);

  function handleOrderChange(factor: string, order: "asc" | "desc") {
    setOrderFactor({ orderFactor: factor, order });
  }
  const { user }: { user: User } = useOutletContext();

  const [lessons, setLessons] = useState<LessonWithHost[] | null>(null);
  
  const [orderFactor, setOrderFactor] = useState<{
    orderFactor: string;
    order: "asc" | "desc";
  }>({ orderFactor: "id", order: "asc" });

  const [lessonCart, setLessonCart] = useState<number[]>(() => {
    const savedCart = localStorage.getItem("lessonCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [guideCart, setGuideCart] = useState<number[]>(() => {
    const savedCart = localStorage.getItem("guideCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    async function fetchLessonList() {
      const token = getCookie("token");
      const subjectQuery = selectedSubjects
        .map((subject) => `subjects=${subject}`)
        .join("&");

      const res = await fetch(
        `http://localhost:3000/lessons/list?page=${page}&pageSize=${pageSize}&search=${search}&orderFactor=${orderFactor.orderFactor}&order=${orderFactor.order}&${subjectQuery}`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setLessons(data.lessons);
        console.log(data);
        setTotalPages(data.totalPages);
      } else {
        throw new Error("Failed to fetch lessons");
      }
    }
    fetchLessonList();
  }, [orderFactor, page, search, pageSize, selectedSubjects]);

 
  useEffect(() => {
    localStorage.setItem("lessonCart", JSON.stringify(lessonCart));
  }, [lessonCart]);

  useEffect(() => {
    localStorage.setItem("guideCart", JSON.stringify(guideCart));
  }, [guideCart]);

  const addToLessonCart = (id: number) => {
    setLessonCart((prevCart) => [...prevCart, id]);
  };

  const removeFromLessonCart = (id: number) => {
    setLessonCart((prevCart) => prevCart.filter((itemId) => itemId !== id));
  };


  const removeFromGuideCart = (id: number) => {
    setGuideCart((prevCart) => prevCart.filter((itemId) => itemId !== id));
  };

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-3xl">Tanórák</h1>
        <p className="text-lg">
          Fejleszd a készségeidet és tudásodat a kiemelt tanóráink segítségével!
        </p>
      </div>
      <div className="flex lg:justify-between lg:flex-row flex-col lg:items-center gap-4">
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-4">
            <FaMagnifyingGlass size={24} />
            <Input
              onChange={(e) => setSearch(e.currentTarget.value)}
              placeholder="Keresés"
            />
          </span>
          <hr className="dark:border-white border h-7" />
          <span className="flex flex-row gap-2">

          {guideAttributes.map((attr) => (
            <OrderSelector
            key={attr}
              text={attr}
              onChange={handleOrderChange}
            />
          ))}
            </span>
            <span className="flex flex-row gap-2">


          {subjects.map((subject) => (
            <SubjectSelector
            key={subject}
            subject={subject}
            onClick={() => {
              if (selectedSubjects.includes(subject)) {
                setSelectedSubjects(
                  selectedSubjects.filter((s) => s !== subject)
                  );
                } else {
                  setSelectedSubjects([...selectedSubjects, subject]);
                }
              }}
              selected={selectedSubjects.includes(subject)}
              />
            ))}
            </span>
        </span>
        <Cart
          lessonCart={lessonCart}
          guideCart={guideCart}
          removeFromLessonCart={removeFromLessonCart}
          removeFromGuideCart={removeFromGuideCart}
          user={user}
        />
      </div>
      <div className=" mt-6 mb-20 grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-2 gap-4">
        {lessons && lessons.length > 0 ? (
          lessons.map((lesson) => (
            <LessonCard
              addToLessonCart={addToLessonCart}
              removeFromLessonCart={removeFromLessonCart}
              lessonCart={lessonCart}
              key={lesson.id}
              lesson={lesson}
              user={user}
            />
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
            <PaginationItem className="">
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => setPage(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
