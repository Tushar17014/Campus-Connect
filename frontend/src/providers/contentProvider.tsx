import { getStudentByEnroll } from "@/apis/student";
import { getTeacherByUid } from "@/apis/teacher";
import MainLoader from "@/components/mainLoader";
import { setUserTypeRedux } from "@/features/authSlice";
import { setStudentData } from "@/features/student/studentSlice";
import { setTeacherData } from "@/features/teacher/teacherSlice";
import { RootState } from "@/store/store"
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

const ContentContext = createContext<{ userType: string; } | undefined>(undefined);

const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState<string>("");
    const dispatch = useDispatch();
    const isTeacherData = useSelector((state: RootState) => state.teacherReducer.isData);
    const isStudentData = useSelector((state: RootState) => state.studentReducer.isData);

    let hasFetched = false;

    useEffect(() => {
        try {
            if (!hasFetched) {
                hasFetched = true;
                const fetchUserData = async () => {
                    if (!isTeacherData) {
                        const teacherid = localStorage.getItem("teacherid");
                        if (teacherid) {
                            const res = await getTeacherByUid(teacherid);
                            if (res?.statusCode == 200) {
                                dispatch(setTeacherData(res.data));
                                dispatch(setUserTypeRedux("teacher"));
                                setUserType("teacher");
                            }
                            else {
                                console.error("Error in ContentProvider TeacherData");
                            }
                        }
                        else {
                            if(!isStudentData){
                                let localEnroll = localStorage.getItem("enroll");
                                if (localEnroll) {
                                    const enroll = Number(localEnroll);
                                    const res = await getStudentByEnroll(enroll);
                                    if (res?.statusCode == 200) {
                                        dispatch(setStudentData(res.data));
                                        dispatch(setUserTypeRedux("student"));
                                        setUserType("student");
                                    }
                                    else {
                                        console.error("Error in ContentProvider StudentData");
                                    }
                                }
                            }
                        }
                    }
                }
                fetchUserData();
            }
            if (isStudentData) {
                dispatch(setUserTypeRedux("student"));
                setUserType("student");
            }
            if (isTeacherData) {
                dispatch(setUserTypeRedux("teacher"));
                setUserType("teacher");
            }
        } catch (error) {
            console.error("Error in ContentProvider fetchUserData ", error);
        } finally {
            setLoading(false);
        }
    }, [isTeacherData, isStudentData]);
    if (loading) {
        return (<MainLoader />)
    }
    return (
        <ContentContext.Provider value={{ userType }}>
            {children}
        </ContentContext.Provider>
    )
}

export default ContentProvider

export const useUserType = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context;
};
