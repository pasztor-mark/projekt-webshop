import { BrowserRouter, Route, Routes } from "react-router"
import { ThemeProvider } from "./components/ThemeProvider"
import PageLayout from "./components/PageLayout"
import LoginPage from "./pages/Login"

function App() {


  return (
    
    <ThemeProvider>

      <PageLayout/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><PageLayout  /></>}>
            <Route path="authorize" element={<LoginPage />} />
            
            
          </Route>
        </Routes>
      </BrowserRouter>
      
    </ThemeProvider>
  )
}

export default App
