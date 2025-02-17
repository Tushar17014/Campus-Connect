import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import MainLayout from "./layouts/mainLayout"
import AuthProvider from "./providers/authProvider"
import Login from "./pages/login/login"
import Redirect from "./pages/redirect"
import ContentProvider from "./providers/contentProvider"
import { useEffect } from "react"
import { websiteTitle } from "./constants"
import AttendanceRequests from "./pages/attendanceRequests/attendanceRequests"
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
            <Route path="/attendance-requests" element={<AttendanceRequests />} />
          </Route>
            <Route path="*" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
