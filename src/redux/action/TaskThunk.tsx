import {createAsyncThunk } from '@reduxjs/toolkit';
import apiAxios from "../../api/ApiAxios";
import {taskGetLink,newTaskPostLink, archivekDeleteLink,taskDeleteLink, unarchivePostLink} from "../../api/ApiLink";
import {TaskNew} from "../../interface/InterfaceTask";

export const taskGet = createAsyncThunk('task/taskGet', async (payload, { rejectWithValue }) => {
    try{
        const response = await apiAxios.get(taskGetLink)
        return response.data.result;
    }catch(error: any){
        return rejectWithValue(error);
    }
});

export const newTaskPost = createAsyncThunk('task/newTaskPost', async (payload:TaskNew, { rejectWithValue }) => {
    try{
        const response = await apiAxios.post(newTaskPostLink,payload)
        return response.data.result;
    }catch(error: any){
        return rejectWithValue(error);
    }
    
})

export const archivekDelete = createAsyncThunk('task/archivekDelete', async (payload:number, { rejectWithValue }) => {
    try{
        const response = await apiAxios.delete(archivekDeleteLink,{
            params:{
                Id:payload,
            }
        })
        return response.config.params.Id;
    }catch(error: any){
        return rejectWithValue(error);
    }  
})

export const unarchivePost = createAsyncThunk('task/unarchivePost', async (payload:number, { rejectWithValue }) => {
    try{
        const response = await apiAxios.post(unarchivePostLink,{id:payload})
        return payload;
    }
    catch(error: any){
        return rejectWithValue(error);
    } 
})

export const taskDelete = createAsyncThunk('task/taskDelete', async (payload:number, { rejectWithValue }) => {
    try{
        const response = await apiAxios.delete(taskDeleteLink,{
            params:{
                Id:payload,
            }
        })
        return response.config.params.Id;
    }catch(error: any){
        return rejectWithValue(error);
    } 
    
})
