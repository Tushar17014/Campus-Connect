import authReducer from '@/features/authSlice'
import teacherReducer from '@/features/teacher/teacherSlice'
import studentReducer from '@/features/student/studentSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    teacherReducer: teacherReducer,
    studentReducer: studentReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch