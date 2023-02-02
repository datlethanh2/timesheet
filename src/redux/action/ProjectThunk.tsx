import {createAsyncThunk } from '@reduxjs/toolkit';
import apiAxios from "../../api/ApiAxios";
import {quanTiTyGetLink,newPostLink,newClientPostLink,customerGetLink,userGetLink,editGetLink, projectDeleteLink,projectGetLink,deactivePostLink, activePostLink} from "../../api/ApiLink";
import {NewClient} from "../../interface/InterfaceProject";

export const projectGet = createAsyncThunk('project/searchGet',  async (payload: any ,{ rejectWithValue }) => {
    try{
        const response = await apiAxios.get(projectGetLink,{
            params:{
                status:payload.status,
                search:payload.search,
            }
        });
        return response.data.result;
    }catch(error){
        return rejectWithValue(error);
    }
});

export const quanTiTyGet = createAsyncThunk('project/quanTiTyGet', async (payload, { rejectWithValue }) => {
    try{
        const response = await apiAxios.get(quanTiTyGetLink);
        return response.data.result;
    }catch(error){
        return rejectWithValue(error);
    }   
});

export const deactivePost = createAsyncThunk('project/deactivePost', async (payload:number, { rejectWithValue }) => {
    try{
        const response = await apiAxios.post(deactivePostLink,{id:payload});
        return payload;
    }catch(error){
        return rejectWithValue(error);
    }   
});

export const activePost = createAsyncThunk('project/activePost', async (payload:number, { rejectWithValue }) => {
    try{
        const response = await apiAxios.post(activePostLink,{id:payload});
        return payload;
    }catch(error){
        return rejectWithValue(error);
    }   
});

export const projectDelete = createAsyncThunk('project/projectDelete', async (payload:number, { rejectWithValue }) => {
    try{
        const response = await apiAxios.delete(projectDeleteLink,{
            params:{
                Id:payload,
            }
        })
        return payload;
    }catch(error){
        return rejectWithValue(error);
    }   
});

export const editGet = createAsyncThunk('project/editGet', async (payload:number, { rejectWithValue }) => {
    try{
        const response = await apiAxios.get(editGetLink,{
            params:{
                input:payload,
            }
        })
        return response.data.result;
    }catch(error){
        return rejectWithValue(error);
    }
});

export const userGet = createAsyncThunk('project/userGet', async (payload, { rejectWithValue }) => {
    try{
        const response = await apiAxios.get(userGetLink);
        return response.data.result;
    }catch(error){
        return rejectWithValue(error);
    }
   
});

export const customerGet = createAsyncThunk('project/customerGet', async (payload, { rejectWithValue }) => {
    try{
        const response = await apiAxios.get(customerGetLink);
        return response.data.result;
    }catch(error){
        return rejectWithValue(error);
    }
   
});

export const newClientPost = createAsyncThunk('project/newClientPost', async (payload:NewClient, { rejectWithValue }) => {
    try{
        const response = await apiAxios.post(newClientPostLink,payload);
        return response.data.result;
    }catch(error){
        return rejectWithValue(error);
    }
    
});

export const newPost = createAsyncThunk('project/newPost', async (payload:any, { rejectWithValue }) => {
    try{
        const response = await apiAxios.post(newPostLink, payload.newpro);
        return {response:response.data.result, getpro:payload.getpro};
    }catch(error){
        return rejectWithValue(error);
    }
    
});

