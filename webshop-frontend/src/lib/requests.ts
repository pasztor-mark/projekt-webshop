import { User } from "../../../shared/types";

export async function fetchLessons(token: string | undefined, user: User) {
  const res = await fetch(
    "http://localhost:3000/lessons/participant/" + user.id,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
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
export async function fetchGuides(token: string | undefined, user: User) {
  const res = await fetch(
    "http://localhost:3000/guides/copyOwner/" + user.id,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
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
export async function fetchProfile(token: string | undefined, id: number) {
  const res = await fetch("http://localhost:3000/users/profile/" + id, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
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

