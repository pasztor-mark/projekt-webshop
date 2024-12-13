import { SubjectComponent } from "@/lib/componentGenerator";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { GuideWithAuthor,  } from "../../../../shared/types";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function GuideDisplay({
  guide,
}: {
  guide: GuideWithAuthor;
}) {
 
  return (
    <Card className="flex flex-col">
      <CardHeader className="basis-3/12">
        <div className="flex flex-row justify-between items-center">
          <SubjectComponent subject={guide.subject} />
          <h2 className="text-lg font-bold">{guide.title}</h2>
        </div>
        <div className="flex justify-between items-center">
          <h6>{guide.createdAt?.split('T')[0]}</h6>
          <h6 className="italic text-right">- {guide.author.name}</h6>
        </div>
      </CardHeader>
      <CardContent className="basis-7/12">
        <span className="flex justify-between font-semibold my-2 flex-row-reverse">
          <h3>{guide.level}</h3>
          <h3>{guide.subject}</h3>
        </span>
        <h3 className="w-full">{guide.description}</h3>
        {guide.orders.length > 0 && <p className="text-center">{guide.orders.length} eladott példány</p>}
      </CardContent>
      <Separator />
      <CardFooter className="basis-2/12 flex flex-col">
        
        <Button onClick={() => window.location.href = "/guides/" + guide.id!}>
          Megtekintés
        </Button>
      </CardFooter>
    </Card>
  );
}
