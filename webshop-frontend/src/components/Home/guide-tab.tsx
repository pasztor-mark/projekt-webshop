import { SubjectComponent } from "@/lib/componentGenerator";
import { Guide } from "../../../../shared/types";

export default function GuideTab({guide}: {guide: Guide}) {
    
    return (
        <>
            <div className="w-full rounded-2xl hover:border-emerald-600 mb-3 hover:bg-neutral-600 border border-white flex flex-row items-center justify-between p-3">
                <span className="flex flex-row items-center gap-4">
                    {SubjectComponent(guide)}
                    <p>{guide.subject}</p>
                    </span>
                

                <b>{guide.title}</b>
                
                
                
            </div>
        </>
    )
}