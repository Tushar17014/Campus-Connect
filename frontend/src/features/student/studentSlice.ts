import { StudentSliceProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: StudentSliceProps = {
    _id: null,
    enroll: null,
    name: "",
    gender: null,
    dob: null,
    batch: null,
    courses: null,
    semester: null,
    profileImg: "",
    isData: false
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudentData: (state, action) => {
            try {
                state._id = action.payload._id,
                state.enroll = action.payload.enroll;
                state.name = action.payload.name;
                state.gender = action.payload.gender;
                state.dob = action.payload.dob;
                state.batch = action.payload.batch;
                state.courses = action.payload.courses;
                state.semester = action.payload.semester;
                state.profileImg = action.payload.profileImg;
                state.isData = true;
            } catch (error: any) {
                console.log("Error in setStudentData Redux: ", error);
            }
        }
    }
});

export const { setStudentData } = studentSlice.actions;
export default studentSlice.reducer;
