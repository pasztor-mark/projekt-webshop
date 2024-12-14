import { Input } from "@/components/ui/input";
import { Level, Subject, User } from "../../../../shared/types";
import { SubjectComponent } from "@/lib/componentGenerator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { FaCalendar, FaPersonChalkboard } from "react-icons/fa6";
import { useOutletContext } from "react-router";
import { toast } from "sonner";


export default function NewLesson() {
    const {user }: {user: User} = useOutletContext()
  async function handleLessonCreation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = JSON.stringify({
        title,
        description,
        price: Number(price),
        subject: selectedSubject as Subject,
        level: selectedLevel as Level,
        hostId: user!.id,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString()
    })
    
    const response = await fetch("http://localhost:3000/lessons", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body
    });
    if (response.ok) {
      toast.success("Tananyag sikeresen létrehozva.")
      
      setTitle("");
      setDescription("");
      setPrice(0);
    } else {
        toast.error("Hiba a tananyag létrehozása közben")
        
  }
}
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  return (
    <section className=" flex-col mx-auto p-6 flex justify-center items-center">
        <div className="my-4 flex flex-col items-center justify-center">
            <FaPersonChalkboard size={72} className="text-emerald-500"/>
            <h1 className="text-4xl font-bold">Tanóra létrehozása</h1>
            <p>
                Kérjük, töltse ki az alábbi mezőket a tanóra létrehozásához
            </p>
        </div>
      <form onSubmit={handleLessonCreation}>
        <Input placeholder="Cím" name="title" type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />

        <Input placeholder="Leírás" name="description" value={description} type="text" onChange={(e) => setDescription(e.currentTarget.value)} />
        <Input placeholder="Ár" name="price" type="number" value={price} onChange={(e) => setPrice(Number(e.currentTarget.value))} />
        <div className="mt-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Tantárgy
          </label>
          <Select name="subject" onValueChange={(value) => setSelectedSubject(value as Subject)}>
            <SelectTrigger>
                {selectedSubject ? selectedSubject : "Tantárgy"}
            </SelectTrigger>
            <SelectContent>
              {Object.values(Subject).map((subject) => (
                <SelectItem value={subject} key={subject} >
                  <p className="flex flex-row items-center gap-3">
                    <SubjectComponent subject={subject} />
                    {subject}
                  </p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Szint
          </label>
          <Select name="level" onValueChange={(value) => setSelectedLevel(value as Level)}>
            <SelectTrigger>
                {selectedLevel ? selectedLevel : "Szint"}
            </SelectTrigger>
            <SelectContent>
              {Object.values(Level).map((level) => (
                <SelectItem key={level} value={level}>
                  <p className="flex flex-row items-center gap-3">{level}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`
            "w-[280px] justify-start text-left font-normal"
    ${!startDate && "text-muted-foreground"}`}
            >
              <FaCalendar className="mr-2 h-4 w-4" />
              {startDate ? startDate.toDateString() : <span>Kezdés idő</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={startDate}
              initialFocus
              onSelect={(date) => date && setStartDate(date)}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`
            "w-[280px] justify-start text-left font-normal"
    ${!startDate && "text-muted-foreground"}`}
            >
              <FaCalendar className="mr-2 h-4 w-4" />
              {endDate ? endDate.toDateString() : <span>Befejezés idő</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={endDate}
              initialFocus
              onSelect={(date) => date && setEndDate(date)}
            />
          </PopoverContent>
        </Popover>

        

        <Button type="submit" className="bg-emerald-500">
          Tananyag létrehozása
        </Button>
      </form>
    </section>
  );
}
