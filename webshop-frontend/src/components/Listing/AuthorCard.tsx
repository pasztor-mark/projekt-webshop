
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { User,  } from "../../../../shared/types";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { NavigateFunction } from "react-router";


export default function AuthorCard({
  user,
  nav
}: {
  user: User;
  nav: NavigateFunction
}) {
 
  return (
    <Card className="flex flex-col">
      <CardHeader className="basis-3/12">
        <div className="flex flex-row justify-between items-center">
          <Avatar>
            <AvatarFallback>
                {user.name[0].toUpperCase()}{user.name[1].toLowerCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-bold">{user.name}</h2>
        </div>
        <div className="flex justify-between items-center">
          <h6>Tag {user.createdAt?.split('T')[0]} óta</h6>
          
        </div>
      </CardHeader>
      <CardContent className="basis-7/12">

        
      </CardContent>
      <Separator />
      <CardFooter className="basis-2/12 flex flex-col">
        
        <Button onClick={() => {
          nav("/user/" + user.id);
            //window.location.href = "/user/" + user.id;
        }}>
          Megtekintés
        </Button>
      </CardFooter>
    </Card>
  );
}
