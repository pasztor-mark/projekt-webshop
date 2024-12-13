import { User } from "../../../shared/types";

export async function fetchLessons( user: User) {
  const res = await fetch(
    "http://localhost:3000/lessons/participant/" + user.id,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error("Failed to fetch lessons");
  }
}

export async function fetchGuides( user: User) {
  const res = await fetch(
    "http://localhost:3000/guides/copyOwner/" + user.id,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error("Failed to fetch guides");
  }
}
export async function fetchProfile( id: number) {
  const res = await fetch("http://localhost:3000/users/profile/" + id, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error("Failed to fetch user profile");
  }
}

