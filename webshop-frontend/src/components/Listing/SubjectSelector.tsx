import { SubjectComponent } from "@/lib/componentGenerator";
import { Subject } from "../../../../shared/types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
export default function SubjectSelector({subject, selected, onClick}: {subject: Subject, selected: boolean, onClick: () => void}) {

   return (
    <TooltipProvider>
        <Tooltip>
    <TooltipContent>{subject}</TooltipContent> 
    <TooltipTrigger asChild>

        <button className={`w-8 h-8 m-0 border flex items-center rounded-lg justify-center ${selected ? "border-neutral-800 dark:border-white bg-emerald-500" : ""}`} onClick={onClick}>
            <SubjectComponent subject={subject} size={20} />
        </button>
    </TooltipTrigger>
        </Tooltip>
    </TooltipProvider>
    )
}
