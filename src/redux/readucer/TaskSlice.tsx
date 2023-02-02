import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { createSlice} from '@reduxjs/toolkit';
import {taskGet, newTaskPost, archivekDelete, unarchivePost, taskDelete} from "../action/TaskThunk"
import {TaskView } from "../../interface/InterfaceTask";

const initialState={
    tasks:[{name: "",type: 3,id: 0,isDeleted: true}],
    tasksearch:[],
    loading: false,
    newtasks: false,
    searchName: "",
    go:"",
    go1: "",
    commontasks: [{name: "",type: 3,id: 0,isDeleted: true}],
    othertasks:[{name: "",type: 3,id: 0,isDeleted: true}],
}


const taskSlice=createSlice({
    name: 'task',
    initialState,
    reducers:{
        setNameSearch (state, action){           
            state.searchName=action.payload        
        },  
    },
    extraReducers: builder => {
        builder
            .addCase(taskGet.pending, (state, action) => {
                    state.loading = true
            })
            .addCase(taskGet.fulfilled, (state, action: any) => {
                state.loading = false
                state.tasks = action.payload

            })
            .addCase(taskGet.rejected, (state, action: any) => {
                    state.loading = false
                    const notyf = new Notyf();
                    notyf.error(action.payload.response? action.payload.response.data.error.message :  action.payload);
            })

        builder   
            .addCase(newTaskPost.pending, (state, action) => {
                state.loading = true
            })
            .addCase(newTaskPost.fulfilled, (state, action:any) => {
                state.loading = false
                state.tasks.forEach((TaskView:TaskView)=>{
                    if(TaskView.id===action.payload.id){
                        state.go="new/edit"
                    }
                });
                if(state.go==="new/edit"){
                    const list=state.tasks.map((TaskView)=>{
                        if(TaskView.id === action.payload.id){
                            return {...action.payload};                   
                        } else{
                            return TaskView;
                        }
                    })
                    state.tasks=list; 
                    state.go="new/edit1"
                }else{
                    state.tasks=[...state.tasks, action.payload];
                }
                const notyf = new Notyf();
                notyf.success("Ok New Edit Tasks");

            })
            .addCase(newTaskPost.rejected, (state, action: any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response.data.error.message);
            })
        builder   
            .addCase(archivekDelete.pending, (state, action) => {
                state.loading = true
            })
            .addCase(archivekDelete.fulfilled, (state, action) => {
                state.loading = false 
                const list=state.tasks.map((TaskView)=>{
                    if(TaskView.id === action.payload){
                        return {...TaskView, isDeleted: true};                   
                    } else{
                        return TaskView;
                    }
                })
                state.tasks=list; 
                const notyf = new Notyf();
                notyf.success("Ok Archive Tasks");
            })
            .addCase(archivekDelete.rejected, (state, action: any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response.data.error.message);
            })
        
        builder   
            .addCase(unarchivePost.pending, (state, action) => {
                state.loading = true
            })
            .addCase(unarchivePost.fulfilled, (state, action) => {
                state.loading = false
                const list=state.tasks.map((TaskView)=>{
                    if(TaskView.id === action.payload){
                        return {...TaskView, isDeleted: false};                   
                    } else{
                        return TaskView;
                    }
                })
                state.tasks=list; 
                const notyf = new Notyf();
                notyf.success("Ok Unarchive Tasks");
            })
            .addCase(unarchivePost.rejected, (state, action: any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response.data.error.message);
            })
            
        builder   
            .addCase(taskDelete.pending, (state, action) => {
                state.loading = true
            })
            .addCase(taskDelete.fulfilled, (state, action) => {
                state.loading = false
                state.tasks=state.tasks.filter((TaskView: TaskView) => (TaskView.id !== action.payload));    
                const notyf = new Notyf();
                notyf.success("Ok Delete Tasks");
            })
            .addCase(taskDelete.rejected, (state, action: any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response.data.error.message);
            })
    }
})
export const {setNameSearch} = taskSlice.actions;
export  const taskReducer=taskSlice.reducer;
