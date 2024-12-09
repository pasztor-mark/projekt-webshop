import { Subject } from "../../../../shared/types";

export default function SubjectSelector({subject}: {subject: Subject}) {

   return (
        <button>
            <SubjectSelector subject={subject} />
        </button>
    )
}
