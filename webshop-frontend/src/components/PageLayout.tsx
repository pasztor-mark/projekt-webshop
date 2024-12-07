import { Outlet, Navigate } from 'react-router';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import DesktopNavigation from './ui/DesktopNavigation';
import { SidebarProvider } from './ui/sidebar';

export default function PageLayout() {
  const { isAuthenticated, logout, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gradient-to-br from-neutral-950 to-stone-900 min-h-screen min-w-full'>
      <header>
      <SidebarProvider>
        <DesktopNavigation />
      </SidebarProvider>
        {isAuthenticated && <Button onClick={() => logout()}>Logout</Button>}
      </header>
      <main>
        {isAuthenticated ? <Outlet /> : <Navigate to="/authorize" />}
      </main>
      <footer>
        
      </footer>
    </div>
  );
}
