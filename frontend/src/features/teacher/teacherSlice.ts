import { TeacherSliceProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TeacherSliceProps = {
    _id: null,
    uid: null,
    courses: null,
    firstName: "",
    lastName: "",
    profileImg: "",
    isData: false
}

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            try {
                state._id = action.payload._id,
                state.uid = action.payload.uid;
                state.courses = action.payload.courses;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.profileImg = action.payload.profileImg;
                state.isData = true;
            } catch (error: any) {
                console.log("Error in setUserData Redux: ", error);
            }
        }
    }
});

export const { setUserData } = teacherSlice.actions;
export default teacherSlice.reducer;
