import {createAsyncThunk } from '@reduxjs/toolkit';
import apiAxios from "../../api/ApiAxios";
import {authenPostLink} from "../../api/ApiLink";
import {AuthenLogin} from "../../interface/InterfaceAuthen";

export const authenPost = createAsyncThunk('authen/authenPost', async (payload:AuthenLogin, { rejectWithValue }) => {
    try{
        const response = await apiAxios.post(authenPostLink,payload);
        return response;
    }catch (error) {
        return rejectWithValue(error);
    }
})