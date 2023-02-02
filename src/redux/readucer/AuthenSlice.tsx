import { createSlice} from '@reduxjs/toolkit';
import {authenPost} from '../action/AuthenThunk';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


const initialState={
    authen:[],
    loading: false,
    accessToken:"",
    error: "",
    id:0,
    color:"#f44336",
}


const authenSlice=createSlice({
    name: 'authen',
    initialState,
    reducers:{
        setMenuColor(state, action: any){
            state.color=action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(authenPost.pending, (state, action) => {
                state.loading = true
            })
            .addCase(authenPost.fulfilled, (state, action) => {
                state.loading = false
                //console.log(action.payload)
                state.id=action.payload.data.result.userId
                state.accessToken = action.payload.data.result.accessToken         
            })
            .addCase(authenPost.rejected, (state, action: any) => {
                state.loading = false
                state.error= action.payload
                const notyf = new Notyf();
                notyf.error(action.payload);
                ///state.error=action.payload.response
      })
    },
})
export const {setMenuColor} = authenSlice.actions;
export  const authenReducer=authenSlice.reducer;

  