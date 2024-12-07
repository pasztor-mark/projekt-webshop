import { useAuth } from "../AuthContext";
import { Button } from "./button";

export default function DesktopNavigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-emerald-600 w-full h-12 flex items-center justify-between px-4">
      
      {isAuthenticated && <Button onClick={() => logout()}>Logout</Button>}
    </nav>
  );
}
