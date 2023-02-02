import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosTv from '../../Api/axiosTv';
import {LoginInfor} from "../../Intertype/Typelogin";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const Logfail=styled.div
`   text-align:center;
    width:400px;
`;
const Log=styled.div
`   background-color:#00bcd4;
    padding-top:30px;
    padding-bottom: 100px;
    h1{
       
        padding-bottom:20px;
        color: white;
        text-align: center;
    }
    i{
        color: white;
        text-align: center;
        font-size: 14px;
    }
`;
const Khung=styled.div
`   background-color: white;
    border: 1px solid gray;
    padding-left:15px;   
    padding-right:15px;
    margin-bottom:30px;
    h2{
      text-align: center;
    }
   
`;
const Khungcuoi=styled.div
`     display: flex;
      justify-content: space-between;
      margin-top: 25px;
      input{
        width:70px;
      }
`;


function Login() {
  
    const {register, handleSubmit, reset, formState: { errors }  } = useForm<LoginInfor>();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const onSum= async(data:LoginInfor)=>{
        axiosTv({
            method: 'post',
            url: 'api/TokenAuth/Authenticate',
            data:{
                userNameOrEmailAddress:data.userNameOrEmailAddress,
                password: data.password,
                rememberClient: false,
            }
            })           
            .then((data)=> {
                if (data?.data?.result?.accessToken) {
                   navigate("/Main/Home");
                }
            })
            .catch(function (error) {
                setOpen(true);                
            });
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Log>
            <Dialog
                open={open}
                onClose={handleClose}
                
            >
                <DialogContent> 
                    <Logfail>              
                        <HighlightOffIcon 
                            color="secondary"
                            sx={{ fontSize: 100 }}
                        />
                        <h1>Login failed!</h1>
                        <p>Invalid user name or password</p>
                        <Button variant="contained" onClick={handleClose}>OK</Button>         
                    </Logfail>
                </DialogContent>
            </Dialog>

            <h1>TIMESHEET</h1>
            <Grid container>
                <Grid item md={4} sm={3} xs={2}></Grid>
                <Grid item md={4} sm={6} xs={8}>                 
                    <Khung>
                        <h2>LOG IN</h2>
                        <form onSubmit={handleSubmit(onSum)}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField  id="input-with-sx" 
                                            label="User name or email*" 
                                            variant="standard" 
                                            fullWidth
                                            {...register("userNameOrEmailAddress", { required: true })}                                               
                                            />                                                  
                            </Box>                                                             
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField  id="password"                       
                                            label="Password*" 
                                            variant="standard" 
                                            fullWidth
                                            type="password"                       
                                            {...register("password",{ required: true } )}                                                                                                              
                                            />
                            </Box>                                             
                            <Khungcuoi>                     
                                <FormControlLabel
                                    control={<Checkbox 
                                    value="remember" color="primary" />}
                                    label="Remember me"
                                /> 
                                <input type="submit" value="Log in"/>                                                
                            </Khungcuoi>                       
                        </form>
                        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Log In With Google
                        </Button>
                    </Khung> 
                </Grid>
                <Grid item md={4} sm={3} xs={2}></Grid>
            </Grid>      
            <i><p>© 2022 Timesheet. Version 4.3.0.0 [20220111]</p></i>
        </Log>
    );
}
  
export default Login;