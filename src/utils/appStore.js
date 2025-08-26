import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice'
// configureStore => Provider => createSlice => add reducer to store
const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer
    }
})

export default appStore