import { Outlet } from 'react-router';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';

export default function PageLayout() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <header>
        {isAuthenticated && <Button onClick={() => logout()}>Logout</Button>}
      </header>
      <main>
        {isAuthenticated ? <Outlet /> : <p>Not logged in</p>}
      </main>
      <footer>
      </footer>
    </>
  );
}
