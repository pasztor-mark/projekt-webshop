import { useEffect, useState } from "react";
import { FaBookAtlas } from "react-icons/fa6";
import { getCookie, User } from "../../../../shared/types";

import AuthorCard from "@/components/Listing/AuthorCard";

export default function Authors() {
  
  
    const [authors, setAuthors] = useState<User[] | null>(null);
  useEffect(() => {
    async function fetchAuthors() {
        const token = await getCookie('token');
        const req = await fetch('http://localhost:3000/users/authors/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (req.ok) {
            const data = await req.json();
            console.log(data);
            setAuthors(data);
        }
    }
    fetchAuthors();
  }, [])
  return (
    <section>
      <div className="mx-auto flex items-center justify-center text-center mt-4">
        <p className="text-center mx-auto"> 
          <FaBookAtlas size={72} className="text-center mx-auto text-emerald-500" />
            <h1 className="text-3xl">Írók és tanítók</h1>
        </p>
      </div>
      <div>
              <div className=" mt-6 mb-20 grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-2 gap-4">
                {authors ? (
                  authors.map((author) => (
                    <AuthorCard
                      key={author.id}
                      user={author}
                    />
                  ))
                ) : (
                  <></>
                )}
        
                </div>
      </div>
    </section>
  );
}