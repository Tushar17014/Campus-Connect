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
import CheckAttendance from "./pages/Student/checkAttendance/checkAttendance"
import CheckCourseAttendance from "./pages/Student/checkAttendance/checkCourseAttendance"
import RequestAttendance from "./pages/Student/requestAttendance/requestAttendance"
import TakeAttendance from "./pages/Teacher/takeAttendance/takeAttendance"
import LectureSummary from "./pages/Teacher/lectures/lectureSummary"
import CheckStudentAttendance from "./pages/Teacher/checkStudentAttendance/checkStudentAttendance"
import ChooseElectives from "./pages/Student/chooseElectives/chooseElectives"
import GiveMarks from "./pages/Teacher/giveMarks/giveMarks"
import FindSlot from "./pages/Teacher/findSlot/findSlot"
import StudentLectures from "./pages/Student/lectures/lectures"
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
            <Route path="/teacher/lectures/:lectureId" element={<LectureSummary />} />
            <Route path="/teacher/take-attendance" element={<TakeAttendance />} />
            <Route path="/teacher/check-student-attendance" element={<CheckStudentAttendance />} />
            <Route path="/teacher/giveMarks" element={<GiveMarks />} />
            <Route path="/teacher/findSlot" element={<FindSlot />} />

            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/check-attendance" element={<CheckAttendance />} />
            <Route path="/student/check-attendance/:cid" element={<CheckCourseAttendance />} />
            <Route path="/student/request-attendance" element={<RequestAttendance />} />
            <Route path="/student/lectures" element={<StudentLectures />} />
            <Route path="/student/elective" element={<ChooseElectives />} />
          </Route>
            <Route path="*" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
