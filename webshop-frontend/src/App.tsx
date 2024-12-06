import { BrowserRouter, Route, Routes } from "react-router"
import { ThemeProvider } from "./components/ThemeProvider"
import PageLayout from "./components/PageLayout"

import LoginPage from "./pages/Login"
import { AuthProvider } from "./components/AuthContext"


function App() {


  return (
    
    <ThemeProvider>
      <AuthProvider>


      <BrowserRouter>
        <Routes>
            <Route path="/authorize" element={<LoginPage />} />
            <Route path="/dashboard" element={<p>fasz</p>} />
          <Route path="/" element={<><PageLayout  /></>}>
            
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
      
    </ThemeProvider>
  )
}

export default App
