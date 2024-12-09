import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Button } from "../ui/button";

export default function OrderSelector({
  text,
  onChange,
}: {
  text: string;
  onChange: (factor: string, order: "asc" | "desc" ) => void;
}) {
  return (
    <div className="min-w-16 h-8 flex justify-between items-center border gap-2 rounded-lg dark:border-neutral-800">
      <Button variant={"ghost"} className={`flex-1 pr-0 pl-2`} onClick={() => onChange(text, "desc")}>
        <FaChevronDown size={14} />
      </Button>
      <div className="flex-1 px-2 border-r border-l">
        <p className="text-md text-center">{text.toUpperCase()}</p>
      </div>
      <Button  variant={"ghost"} className="flex-1 pl-0 pr-2" onClick={() => onChange(text, "asc")}>
        <FaChevronUp size={14} />
      </Button>
    </div>
  );
}
