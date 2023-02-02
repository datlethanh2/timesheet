import React from 'react';
import styled from '@emotion/styled';
import { useForm } from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/Hook";
import {authenPost} from "../../redux/action/AuthenThunk";
import {AuthenLogin} from "../../interface/InterfaceAuthen";
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
const Loginform=styled.div
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
const Formlogin=styled.div
`   background-color: white;
    border: 1px solid gray;
    padding-left:15px;   
    padding-right:15px;
    margin-bottom:30px;
    h2{
      text-align: center;
    }
`;
const Formfoot=styled.div
`     display: flex;
      justify-content: space-between;
      margin-top: 25px;
      input{
        width:70px;
      }
`;

function Login() {
  
    const {register, handleSubmit,watch, reset, formState: { errors }  } = useForm<AuthenLogin>();
    const [open, setOpen] = React.useState(false);

    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.authen.accessToken);
    const id = useAppSelector((state) => state.authen.id);
    const error = useAppSelector((state) => state.authen.error);

    const onSumbit= async(data:AuthenLogin)=>{
        const payload={
            userNameOrEmailAddress:data.userNameOrEmailAddress,
            password: data.password,
            rememberClient: false,
        }
        await dispatch(authenPost(payload));
    };
    
    React.useEffect(()=>{
        if(accessToken){
            localStorage.setItem('accessToken',  accessToken);
            window.location.reload();
        }            
    }, [accessToken])
    React.useEffect(()=>{
        if(id){
            localStorage.setItem('id', String(id));
            window.location.reload();
        }            
    }, [id])

    React.useEffect(()=>{
        if(error){
            setOpen(true);
        }
    }, [error, setOpen])
        
    return (
        <Loginform>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}              
            >
                <DialogContent> 
                    <Logfail>              
                        <HighlightOffIcon 
                            color="secondary"
                            sx={{ fontSize: 100 }}
                        />
                        <h1>Login failed!</h1>
                        <p>Invalid user name or password</p>
                        <Button variant="contained" onClick={()=>setOpen(false)}>OK</Button>         
                    </Logfail>
                </DialogContent>
            </Dialog>

            <h1>TIMESHEET</h1>
            <Grid container>
                <Grid item md={4} sm={3} xs={2}></Grid>
                <Grid item md={4} sm={6} xs={8}>                 
                    <Formlogin>
                        <h2>LOG IN</h2>
                        <form>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: "10px" }}>
                                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField  id="input-with-sx" 
                                            label="User name or email*" 
                                            variant="standard" 
                                            fullWidth
                                            color={watch("userNameOrEmailAddress")===""? "error": "primary"} 
                                            {...register("userNameOrEmailAddress", { required: true })}                                               
                                />                                                  
                            </Box>                                                             
                            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                                <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField  id="password"                       
                                            label="Password*" 
                                            variant="standard" 
                                            fullWidth
                                            type="password"  
                                            color={watch("password")===""? "error": "primary"}                    
                                            {...register("password")}                                                                                                           
                                            />
                                
                            </Box>                                             
                            <Formfoot>                     
                                <FormControlLabel
                                    control={<Checkbox 
                                    value="remember" color="primary" />}
                                    label="Remember me"
                                /> 
                                <Button disabled={watch("userNameOrEmailAddress")&& watch("password").length>5?false:true} onClick={handleSubmit(onSumbit)} style={{backgroundColor:watch("userNameOrEmailAddress")&& watch("password").length>5?"rgb(244 67 54 / 73%)":"#80808047", border:"none", borderRadius:"5px", color:" white", padding:"10px"}}><b>Log in </b></Button>                                               
                            </Formfoot>                       
                        </form>
                        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Log In With Google
                        </Button>
                    </Formlogin> 
                </Grid>
                <Grid item md={4} sm={3} xs={2}></Grid>
            </Grid>      
            <i><p>© 2022 Timesheet. Version 4.3.0.0 [20220111]</p></i>
        </Loginform>
    );
}
  
export default Login;