import { TeacherSliceProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TeacherSliceProps = {
    _id: null,
    uid: null,
    courses: null,
    name: "",
    profileImg: "",
    isData: false
}

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        setTeacherData: (state, action) => {
            try {
                state._id = action.payload._id,
                state.uid = action.payload.uid;
                state.courses = action.payload.courses;
                state.name = action.payload.name;
                state.profileImg = action.payload.profileImg;
                state.isData = true;
            } catch (error: any) {
                console.log("Error in setTeacherData Redux: ", error);
            }
        }
    }
});

export const { setTeacherData } = teacherSlice.actions;
export default teacherSlice.reducer;
