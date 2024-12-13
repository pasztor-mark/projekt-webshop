import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider";
import PageLayout from "./components/PageLayout";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./components/AuthContext";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import Guides from "./pages/guides/guides";
import Lessons from "./pages/lessons/lessons";
import PurchasedLessons from "./pages/Purchased/PurchasedLessons";
import PurchasedGuides from "./pages/Purchased/PurchasedGuides";
import AuthoredGuides from "./pages/Created/AuthoredGuides";
import HostedLessons from "./pages/Created/HostedLessons";
import Authors from "./pages/Users/AuthorList";
import LessonPage from "./components/Listing/LessonPage";
import GuidePage from "./components/Listing/GuidePage";



function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/authorize" element={<LoginPage />} />
            <Route path="/" element={<PageLayout />}>
              <Route index element={<Home/>} />
              <Route path="guides" >
                <Route index element={<Guides/>} />
                <Route path=":guideId" element={<GuidePage/>} />
              </Route>
              <Route path="lessons">
                <Route index element={<Lessons/>} />
                <Route path=":lessonId" element={<LessonPage/>} />
              </Route>
              <Route path="authors" element={<Authors/>} />
              <Route path="user/:userId" element={<Profile/>} />
              <Route path="library">
                <Route path="guides" element={<PurchasedGuides/>} />
                <Route path="lessons" element={<PurchasedLessons/>} />
              </Route>
              <Route path="author/:authorId" element={<AuthoredGuides/>} />
              <Route path="host/:hostId" element={<HostedLessons/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
