import { configureStore } from "@reduxjs/toolkit";
import {authenReducer} from "./readucer/AuthenSlice";
import {taskReducer} from "./readucer/TaskSlice";
import {projectReducer} from "./readucer/ProjectSlice";

export const store=configureStore({
    reducer:{
      authen: authenReducer, 
      tasks: taskReducer,
      projects: projectReducer, 
    }       
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch