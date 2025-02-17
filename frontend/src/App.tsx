import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import MainLayout from "./layouts/mainLayout"
import AuthProvider from "./providers/authProvider"
import Login from "./pages/login/login"
import Redirect from "./pages/redirect"
import ContentProvider from "./providers/contentProvider"
import { useEffect } from "react"
import { websiteTitle } from "./constants"
import Lectures from "./pages/lectures/lectures"
function App() {
  useEffect(() => {
    document.title = websiteTitle;
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={
            <AuthProvider>
              <ContentProvider>
                <MainLayout />
              </ContentProvider>
            </AuthProvider>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/lectures" element={<Lectures />} />
          </Route>
            <Route path="*" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
