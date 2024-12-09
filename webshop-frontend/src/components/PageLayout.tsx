import { Outlet, Navigate } from "react-router";
import { useAuth } from "./AuthContext";

import DesktopNavigation from "./ui/DesktopNavigation";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { useEffect, useState } from "react";
import { getCookie } from "../../../shared/types";


export default function PageLayout() {
  const { isAuthenticated, loading, user } = useAuth();
  const [fetchedUser, setUser] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {

      async function fetchUser() {
        try {
          
          

          const token = getCookie('token');
          if (!token) {
            throw new Error('Token not found');
          }

          const req = await fetch(`http://localhost:3000/users/${user!.id}`, {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });

          if (req.ok) {
            const data = await req.json();
            setUser(data);
            
          } else {
            console.error("Failed to fetch user");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      fetchUser();
    }
  }, [isAuthenticated, user]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SidebarProvider >
        <DesktopNavigation user={fetchedUser} />

        <main className="bg-gradient-to-br from-neutral-950 px-3 to-stone-900 min-h-screen w-11/12 ">
          <SidebarTrigger className=" p-5 bg-emerald-500 rounded-full fixed bottom-4" />
          {isAuthenticated ? <Outlet context={{user: fetchedUser}} /> : <Navigate to="/authorize" />}
        </main>
        <footer></footer>
      </SidebarProvider>
    </>
  );
}
