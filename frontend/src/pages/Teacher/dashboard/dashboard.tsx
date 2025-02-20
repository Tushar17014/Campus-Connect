import { getAnnouncementByTeacher } from "@/apis/announcement";
import { getAttendanceByCourse, getAttendanceByCourseDate } from "@/apis/attendance";
import { getStudentByCourse } from "@/apis/student";
import AnnouncementsWidget from "@/components/announcement/announcementsWidget";
import Header from "@/components/header"
import HomeCardGrid from "@/components/homeCardGrid"
import MainLoader from "@/components/mainLoader";
import PieChartComponent from "@/components/pieChartComponent";
import AttendanceRequestWidget from "@/components/attendanceRequestWidget/attendanceRequestWidget";
import { formatDate } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAttendanceRequestsForTeacherByUid } from "@/apis/attendanceRequest";


const fetchStudentRecords = async (cid: string | null, attendanceRecords: { enroll: number, status: boolean }[]) => {
  const studentByCourse = await getStudentByCourse(cid);
  let newData: any = [];
  attendanceRecords?.forEach((rec) => {
    let d = studentByCourse.find((student: any) => student.enroll == rec.enroll);
    d = { ...d, status: rec.status };
    newData.push(d);
  })
  return newData;
}

const TeacherDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [prevDate, setPrevDate] = useState<{ day: string , isoDate: string } | null>(null);
  const [totalStudents, setTotalStudents] = useState(null);
  const [totalClasses, setTotalClasses] = useState(null);
  const [presentStudent, setPresentStudents] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [prevCourse, setPrevCourse] = useState<string | null>(null);
  const [attendanceRequests, setAttendanceRequests] = useState(null);
  const [announcements, setAnnouncements] = useState(null);
  const hasAnnouncementFetched = useRef(false);
  const hasAttendanceRequestsFetched = useRef(false);
  
  const teacherData = useSelector((state: RootState) => state.teacherReducer);
  const coursesArray = teacherData.courses;

  useEffect(() => {
    if (selectedCourse) {
      const fetchData = async () => {
        const response2 = await getAttendanceByCourse(selectedCourse);
        setTotalClasses(response2[0]?.attendanceRecords?.length || 0);
      };
      fetchData();
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (teacherData && teacherData.uid && !announcements && !hasAnnouncementFetched.current) {
      hasAnnouncementFetched.current = true;
      const fetchAnnouncements = async () => {
        const response = await getAnnouncementByTeacher(teacherData.uid);
        let announcementData: any = [];
        response?.forEach((obj: any) => {
          if (obj.isActive) announcementData.push(obj);
        })
        setAnnouncements(announcementData);
      };
      fetchAnnouncements();
    }
    if(teacherData && teacherData.uid && !attendanceRequests && !hasAttendanceRequestsFetched.current){
      hasAttendanceRequestsFetched.current = true;
      const fetchAttendanceRequests = async () => {
        const response = await getAttendanceRequestsForTeacherByUid(teacherData.uid);
        const attendanceRequestData = response.filter((item : any) => item.status == "pending");
        setAttendanceRequests(attendanceRequestData);
      };
      fetchAttendanceRequests();
    }
  }, [teacherData]);

  useEffect(() => {
    if (teacherData.courses && !selectedCourse) {
      setSelectedCourse(teacherData?.courses[0].cid);
    }
    if (selectedDate.day && selectedCourse && (prevDate?.isoDate != selectedDate.isoDate || prevCourse != selectedCourse)) {
       const fetchData = async () => {
        const response = await getAttendanceByCourseDate(selectedCourse, selectedDate.isoDate);
        setPresentStudents(response?.filter((record: any) => record.status).length || 0);
        setTotalStudents(response?.length || 0);
        setPrevCourse(selectedCourse);
        setPrevDate(selectedDate);
      };
      fetchData();
    }
  }, [selectedDate, selectedCourse, teacherData]);

  return (
    <div className="flex-1 overflow-auto relative">
      {coursesArray && presentStudent != null && totalStudents != null && totalClasses != null && attendanceRequests ? (
        <div>
          <Header title="Dashboard" selectedDate={(value) => setSelectedDate(value)} selectedCourse={(value) => setSelectedCourse(value)} availableCourses={coursesArray} />
          <main className="p-10 flex flex-col gap-10">
            <HomeCardGrid absent={Number((100 - presentStudent).toFixed(1))} classes={totalClasses} present={presentStudent} students={totalStudents} userType="teacher"/>
            <div className="grid grid-cols-4 gap-10">
              <div className="col-span-2">
                {announcements && teacherData.uid && coursesArray ? (
                  <AnnouncementsWidget announcementData={announcements} uid={teacherData.uid} availableCourses={coursesArray} />
                ) : (
                  <Loader className='size-6 text-red-700 animate-spin' />
                )}
              </div>
              <div className="col-span-2">
                <PieChartComponent present={presentStudent} />
              </div>
              <div className="col-span-4">
                <AttendanceRequestWidget data={attendanceRequests} />
              </div>
            </div>
          </main>
        </div>
      ) : (
        <MainLoader />
      )}
    </div>
  )
}

export default TeacherDashboard
