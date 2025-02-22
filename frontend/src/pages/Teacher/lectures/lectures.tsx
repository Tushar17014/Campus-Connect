import AudioUploadComponent from "@/components/audioUpload"
import CourseSelector from "@/components/courseSelector"
import DateSelector from "@/components/dateSelector"
import Header from "@/components/header"
import MainLoader from "@/components/mainLoader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/utils"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "@/components/scrollbar.css"
import LectureSummaries from "@/components/lectureSummaries"
import { Separator } from "@/components/ui/separator"
import { getLecturesByTeacher } from "@/apis/lectures"

const Lectures = () => {
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [lectureName, setLectureName] = useState("");
  const [groupByCourse, setGroupByCourse] = useState<string | null>("All");
  const [lectureSummariesRecords, setLectureSummariesRecords] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState(lectureSummariesRecords);
  const teacherData = useSelector((state: RootState) => state.teacherReducer);

  const availableCourses = teacherData.courses

  useEffect(() => {
    if (teacherData && teacherData.uid && lectureSummariesRecords.length == 0) {
      const fetchLectures = async () => {
        const response = await getLecturesByTeacher(teacherData.uid);
        setLectureSummariesRecords(response);
      };
      fetchLectures();
    }
  }, [teacherData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!uploadedAudio) {
      alert("No Audio File")
      return;
    }
    if (lectureName == "" || !lectureName) {
      alert("Lecture Name Empty")
      return;
    }
    const formData = new FormData();
    formData.append('audio', uploadedAudio);
  }

  useEffect(() => {
    if (groupByCourse && lectureSummariesRecords.length > 0) {
      setFilteredLectures(groupByCourse === "All" ? lectureSummariesRecords : lectureSummariesRecords.filter((lecture: any) => lecture.course.cid == groupByCourse));
    }
  }, [groupByCourse, lectureSummariesRecords]);

  return (
    <div className="flex-1 overflow-auto relative">
      <Header title="Lectures" />
      {availableCourses ? (
        <div>
          <Card className="bg-mainbg m-5">
            <CardHeader >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Upload Lecture Summary</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST'>
                  <div className="flex gap-5">
                    <Input className="w-96 bg-black text-white h-12 text-lg" placeholder="Lecture Name" onChange={(e) => setLectureName(e.target.value)} />
                    <DateSelector selectedDate={(value) => setSelectedDate(value)} />
                    <CourseSelector availableCourses={availableCourses} selectedCourse={(value) => setSelectedCourse(value)} />
                    <AudioUploadComponent uploadedAudio={setUploadedAudio} />
                  </div>
                  {uploadedAudio && selectedCourse && selectedDate && lectureName != "" && (
                    <Button type="submit" className="ml-1">Submit</Button>
                  )}
                </form>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-mainbg max-h-[440px] min-h-[440px] m-5 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
            <CardHeader >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Lecture Summaries</h3>
                <CourseSelector availableCourses={availableCourses} selectedCourse={(value) => setGroupByCourse(value)} selectAllOption={true} />
              </div>
            </CardHeader>
            <Separator className="mb-5" />
            <CardContent>
              <LectureSummaries data={filteredLectures} />
            </CardContent>

          </Card>
        </div>
      ) : (
        <MainLoader />
      )}
    </div>
  )
}

export default Lectures
