import { SubjectComponent } from "@/lib/componentGenerator";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { LessonWithHost } from "../../../../shared/types";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";


export default function LessonDisplay({
  lesson,
}: {
  lesson: LessonWithHost;
}) {

  return (
    <Card className="flex flex-col">
      <CardHeader className="basis-3/12">
        <div className="flex flex-row justify-between items-center">
          <SubjectComponent subject={lesson.subject} />
          <h2 className="text-lg font-bold">{lesson.title}</h2>
        </div>
        <div className="flex justify-between items-center">
          <h6>{lesson.createdAt?.split('T')[0]}</h6>
          <h6 className="italic text-right">- {lesson.host.name}</h6>
        </div>
      </CardHeader>
      <CardContent className="basis-7/12">
        <span className="flex justify-between font-semibold my-2 flex-row-reverse">
          <h3>{lesson.level}</h3>
          <h3>{lesson.subject}</h3>
        </span>
        <h3 className="w-full">{lesson.description}</h3>
        {lesson.orders.length > 0 && <p className="text-center">{lesson.orders.length} tanuló</p>}
      </CardContent>
      <Separator />
      <CardFooter className="basis-2/12 flex flex-col items-center justify-center pt-4">
      <Button onClick={() => window.location.href = "/lessons/" + lesson.id!}>
        Megtekintés
      </Button>
       
      </CardFooter>
    </Card>
  );
}
