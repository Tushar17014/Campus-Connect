import { AuthSliceProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthSliceProps = {
    userType: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserTypeRedux: (state, action) => {
            try {
                state.userType = action.payload;
            } catch (error: any) {
                console.log("Error in setUserTypeRedux Redux: ", error);
            }
        }
    }
});

export const { setUserTypeRedux } = authSlice.actions;
export default authSlice.reducer;
