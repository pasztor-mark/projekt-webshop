
import { Outlet } from 'react-router'
import { AuthProvider } from './AuthContext'
export default function PageLayout() {

   return (
        <AuthProvider>
            <header>

            </header>
            <main>
                
                <Outlet />
            </main>
            <footer>

            </footer>
        </AuthProvider>
    )
}
