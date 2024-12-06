import { BrowserRouter, Route, Routes } from "react-router"
import { ThemeProvider } from "./components/ThemeProvider"
import PageLayout from "./components/PageLayout"
import PrivateRoute from "./lib/PrivateRoute"
import LoginPage from "./pages/Login"

function App() {


  return (
    
    <ThemeProvider>

      <PageLayout/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><PageLayout  /></>}>
            <Route path="authorize" element={<LoginPage />} />
            <PrivateRoute path="dashboard" element={<Dashboard />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
      
    </ThemeProvider>
  )
}

export default App
