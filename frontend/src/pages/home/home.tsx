import { getAnnouncementByTeacher } from "@/apis/announcement";
import { getAttendanceByCourse, getAttendanceByCourseDate } from "@/apis/attendance";
import { getStudentByCourse } from "@/apis/student";
import AnnouncementsWidget from "@/components/announcement/announcementsWidget";
import Header from "@/components/header"
import HomeCardGrid from "@/components/homeCardGrid"
import MainLoader from "@/components/mainLoader";
import PieChartComponent from "@/components/pieChartComponent";
import StudentListWidget from "@/components/studentsListWidget/studentListWidget";
import { formatDate } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const fetchStudentRecords = async (cid: string, attendanceRecords: { enroll: number, status: boolean }[]) => {
  const studentByCourse = await getStudentByCourse(cid);
  let newData: any = [];
  attendanceRecords?.forEach((rec) => {
    let d = studentByCourse.find((student : any) => student.enroll == rec.enroll);
    d = {...d, status: rec.status};
    newData.push(d);
  })
  return newData;
}

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const teacherData = useSelector((state: RootState) => state.teacherReducer);
  const [totalStudents, setTotalStudents] = useState(null);
  const [totalClasses, setTotalClasses] = useState(null);
  const [presentStudent, setPresentStudents] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [studentRecords, setStudentRecords] = useState(null);
  const [announcements, setAnnouncements] = useState(null);

  const coursesArray = teacherData.courses;

  useEffect(() => {
    if (selectedCourse != "") {
      const fetchData = async () => {
        const response2 = await getAttendanceByCourse(selectedCourse);
        setTotalClasses(response2[0]?.attendanceRecords?.length || 0);
      };
      fetchData();
    }
  }, [selectedCourse]);

  useEffect(() => {
    if(teacherData.uid && !announcements){
      const fetchAnnouncements = async () => {
        const response = await getAnnouncementByTeacher(teacherData?.uid);
        let announcementData: any = [];
        response?.forEach((obj: any) => {
          if(obj.isActive) announcementData.push(obj);
        })
        setAnnouncements(announcementData);
      };
      fetchAnnouncements();
    }
    if (teacherData.courses && selectedCourse == "") {
      setSelectedCourse(teacherData?.courses[0].cid)
    }
    if (selectedDate.day != "" && selectedCourse != "") {
      const fetchData = async () => {
        const response = await getAttendanceByCourseDate(selectedCourse, selectedDate.isoDate);
        const studentRecs = await fetchStudentRecords(selectedCourse, response);
        setStudentRecords(studentRecs);
        setPresentStudents(response?.filter((record: any) => record.status).length || 0);
        setTotalStudents(response?.length || 0);
      };
      fetchData();
    }
  }, [selectedDate, selectedCourse, teacherData]);

  return (
    <div className="flex-1 overflow-auto relative">
      {coursesArray && studentRecords && presentStudent != null && totalStudents != null && totalClasses != null ? (
        <div>
          <Header title="Dashboard" selectedDate={(value) => setSelectedDate(value)} selectedCourse={(value) => setSelectedCourse(value)} availableCourses={coursesArray} />
          <main className="p-10 flex flex-col gap-10">
            <HomeCardGrid absent={Number((100 - presentStudent).toFixed(1))} classes={totalClasses} present={presentStudent} students={totalStudents} />
            <div className="grid grid-cols-4 gap-10">
              <div className="col-span-2">
                {announcements && teacherData.uid ? (
                  <AnnouncementsWidget announcementData={announcements} uid={teacherData.uid}/>
                ) : (
                  <Loader />
                )}
              </div>
              <div className="col-span-2">
                <PieChartComponent present={presentStudent} />
              </div>
              <div className="col-span-4">
                <StudentListWidget data={studentRecords} />
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

export default Home
