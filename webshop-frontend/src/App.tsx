import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider";
import PageLayout from "./components/PageLayout";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./components/AuthContext";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import Guides from "./pages/guides/guides";
import Lessons from "./pages/lessons/lessons";



function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/authorize" element={<LoginPage />} />
            <Route path="/" element={<PageLayout />}>
              <Route index element={<Home/>} />
              <Route path="guides" element={<Guides/>} />
              <Route path="lessons" element={<Lessons/>} />
              <Route path="user/:userId" element={<Profile/>} />
              
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
