import { Guide } from "../../../../shared/types";
import { FaCheckDouble, FaMagnifyingGlass } from "react-icons/fa6";

import GuideTab from "./guide-tab";
import { ScrollArea } from "../ui/scroll-area";
export default function GuideData({ guides }: { guides: Guide[] | null }) {
  return (
    <>
      <div className="bg-neutral-800 pt-4 flex-1 h-[90vh] flex flex-col rounded-3xl">
        <h3 className="mx-auto text-center text-2xl">Tananyagok</h3>
        <hr className=" border border-white w-[90%] my-3 mx-auto" />
        <div className="flex flex-col gap-2 px-3">
        <ScrollArea>

          {guides &&
            guides?.length > 0 &&
            guides?.map((guide) => <GuideTab guide={guide} />)}
            </ScrollArea>
        </div>
        {guides && guides?.length > 0 ? (
          <div className="mt-4 flex text-neutral-500 flex-col justify-center items-center">
            <hr className="w-[90%] border border-neutral-500 mb-6" />
            <FaCheckDouble size={42} />
            <p>Ez minden tanulási útmutató.</p>
            <a href="#" className="text-emerald-500 underline">
              Szereznél többet?
            </a>
          </div>
        ) : (
          <div className="mt-4 flex h-full text-neutral-500 flex-col justify-center items-center">
            <FaMagnifyingGlass size={42} />
            <p>Nincs tanulási útmutatód</p>
            <a href="#" className="text-emerald-500 underline">
              Vásárolj tanulási útmutatót!
            </a>
          </div>
        )}
      </div>
    </>
  );
}