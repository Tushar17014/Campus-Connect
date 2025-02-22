import { getAnnouncementByStudent } from "@/apis/announcement";
import { getAttendanceByCourseEnroll } from "@/apis/attendance";
import AnnouncementsWidget from "@/components/announcement/announcementsWidget";
import Header from "@/components/header"
import HomeCardGrid from "@/components/homeCardGrid";
import MainLoader from "@/components/mainLoader";
import PieChartComponent from "@/components/pieChartComponent";
import { RootState } from "@/store/store";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const StudentDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [totalClasses, setTotalClasses] = useState<number | null>(null);
  const [totalPresent, setTotalPresent] = useState<number | null>(null);
  const [attendancePercent, setAttendancePercent] = useState<number>(0);

  const [announcements, setAnnouncements] = useState(null);

  const studentData = useSelector((state: RootState) => state.studentReducer);
  const coursesArray = studentData.courses;

  const hasAnnouncementFetched = useRef(false);

  useEffect(() => {
    if (studentData && studentData.enroll && !announcements && !hasAnnouncementFetched.current) {
      hasAnnouncementFetched.current = true;
      const fetchAnnouncements = async () => {
        const response = await getAnnouncementByStudent(studentData.enroll);
        let announcementData: any = [];
        response?.forEach((obj: any) => {
          if (obj.isActive) announcementData.push(obj);
        })
        setAnnouncements(announcementData);
      };
      fetchAnnouncements();
    }
  }, [studentData]);

  useEffect(() => {
    if (studentData.courses && !selectedCourse) {
      setSelectedCourse(studentData?.courses[0].cid);
    }
    if (selectedCourse) {
      const fetchData = async () => {
        const response = await getAttendanceByCourseEnroll(selectedCourse, studentData.enroll);
        let present = 0;
        response?.forEach((obj: any) => {
          if (obj.status) {
            present += 1;
          }
        })
        setTotalClasses(response.length);
        setTotalPresent(present);
        if (response?.length) {
          setAttendancePercent((present / response.length) * 100)
        }
        else{
          setAttendancePercent(0);
        }
      }
      fetchData();
    }
  }, [selectedCourse, studentData]);

  return (
    <div className="flex-1 overflow-auto relative">
      {coursesArray && totalPresent != null && totalClasses != null ? (
        <div>
          <Header title="Dashboard" selectedCourse={(value) => setSelectedCourse(value)} availableCourses={coursesArray} />
          <main className="p-10 flex flex-col gap-10">
            <HomeCardGrid studentPresent={attendancePercent} studentPresentCount={totalPresent} studentAbsentCount={totalClasses - totalPresent} studentClasses={totalClasses} userType="student" />
            <div className="grid grid-cols-4 gap-10">
              <div className="col-span-2">
                {announcements && studentData.enroll ? (
                  <AnnouncementsWidget announcementData={announcements} />
                ) : (
                  <Loader className='size-6 text-red-700 animate-spin' />
                )}
              </div>
              <div className="col-span-2">
                <PieChartComponent present={attendancePercent} />
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

export default StudentDashboard
