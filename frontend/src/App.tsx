import { BrowserRouter, Route, Routes } from "react-router-dom"
import TeacherDashboard from "./pages/Teacher/dashboard/dashboard"
import MainLayout from "./layouts/mainLayout"
import AuthProvider from "./providers/authProvider"
import Login from "./pages/login/login"
import Redirect from "./pages/redirect"
import ContentProvider from "./providers/contentProvider"
import { useEffect } from "react"
import { websiteTitle } from "./constants"
import Lectures from "./pages/Teacher/lectures/lectures"
import StudentDashboard from "./pages/Student/dashboard/dashboard"
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
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/lectures" element={<Lectures />} />

            <Route path="/student" element={<StudentDashboard />} />
          </Route>
            <Route path="*" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
