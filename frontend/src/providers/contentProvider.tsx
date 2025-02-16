import { getTeacherByUid } from "@/apis/teacher";
import MainLoader from "@/components/mainLoader";
import { setUserData } from "@/features/teacher/teacherSlice";
import { RootState } from "@/store/store"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const isUserData = useSelector((state: RootState) => state.teacherReducer.isData);
    let hasFetched = false;
    useEffect(() => {
        try {
            if (!isUserData && !hasFetched) {
                hasFetched = true;
                const fetchUserData = async () => {
                    const userid = localStorage.getItem("userid");
                    if (userid) {
                        const res = await getTeacherByUid(userid);
                        if (res?.statusCode == 200) {
                            dispatch(setUserData(res.data));
                        }
                        else {
                            console.error("Error in ContentProvider fetchUserData");
                        }
                    }
                }
                fetchUserData();
            }
        } catch (error) {
            console.error("Error in ContentProvider fetchUserData ", error);
        } finally {
            setLoading(false);
        }
    }, [isUserData]);
    if (loading) {
        return (<MainLoader />)
    }
    return (
        <>{children}</>
    )
}

export default ContentProvider
