
import { Outlet } from 'react-router'
import { AuthProvider, useAuth } from './AuthContext'
export default function PageLayout() {
    const {user} = useAuth()

   return (
        <AuthProvider>
            <header>

            </header>
            <main>
                {
                    user ? 
                    <Outlet /> :
                    <p>Not logged in</p>
                }
            </main>
            <footer>

            </footer>
        </AuthProvider>
    )
}
