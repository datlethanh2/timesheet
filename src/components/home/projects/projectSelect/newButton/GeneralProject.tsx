import React from "react";
import {useAppSelector} from "../../../../../redux/Hook";
import {CustomerClient} from "../../../../../interface/InterfaceProject";
import Newclient  from "./NewClient";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment, {Moment} from "moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function Generalproject(props: any){
   
    const [valuestart, setValueStart] = React.useState<Moment| null>(null);
    const handleChangeTimeStart = (newValue: Moment | null) => {
        setValueStart(newValue);
        //console.log(newValue);
        props.setValue("timeStart", String(moment(newValue).format()));
    };
    const [valueend, setValueEnd] = React.useState<Moment| null>(null);
    const handleChangeTimeEnd = (newValue: Moment | null) => {
        setValueEnd(newValue);
        props.setValue("timeEnd", String(moment(newValue).format()));
    };
    React.useEffect(()=>{
        if(props.watch("timeStart")){
            setValueStart(props.watch("timeStart"));
        }
        if(props.watch("timeEnd")){
            setValueEnd(props.watch("timeEnd"));        
        }
    },[]);
    
    const customer = useAppSelector((state) => state.projects.customer);

    return(
        <div>
            <Grid container>
                <Grid item lg={2}>
                    <p><b>Client*</b></p>
                </Grid>
                <Grid item lg={10}>
                    <Grid container spacing={2}>
                        <Grid item lg={8}>
                            <TextField
                                fullWidth
                                select
                                {...props.register("customerId", { required: true })}
                                SelectProps={{
                                    native: true,
                                }}                                     
                                >
                                {customer.map((CustomerClient: CustomerClient) => (
                                    <option key={CustomerClient.id} value={CustomerClient.id}>
                                        {CustomerClient.name}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item lg={4}>
                            <Newclient/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container sx={{marginTop: "20px"}}>
                <Grid item lg={2} md={12} sm={12} xs={12}>
                    <p><b>Project Name*</b></p>
                </Grid>
                <Grid item lg={10} md={12} sm={12} xs={12}>
                    {(props.errors.code==="")&& <span><p style={{color: "red"}}>This name is required</p></span>}
                    <TextField 
                        label="Project Name" 
                        fullWidth
                        color={props.watch("name")===""? "error": "primary"} 
                        sx={{width: {lg:"66%" }}}
                        {...props.register("name", { required: true })} 
                    /> 
                </Grid>
            </Grid>

            <Grid container sx={{marginTop: "20px"}}>
                <Grid item lg={2} md={12} sm={12} xs={12}>
                    <p><b>Project Code*</b></p>                  
                </Grid>
                <Grid item lg={10} md={12} sm={12} xs={12}>
                    {props.errors.code && <span><p style={{color: "red"}}>This code is required</p></span>} 
                    <TextField  
                        label="Project Code" 
                        color={props.watch("code")===""? "error": "primary"} 
                        {...props.register("code", { required: true })} 
                    /> 
                </Grid>
            </Grid>

             <Grid container sx={{marginTop: "20px"}}>
                <Grid item lg={2}>
                    <p><b>Date*</b></p>
                </Grid>
                <Grid item lg={10}>
                    <LocalizationProvider dateAdapter={ AdapterMoment}>
                        <Grid container>
                            <Grid item lg={3}>
                                <DesktopDatePicker
                                    label="Start at"                  
                                    inputFormat="DD/MM/YYYY"
                                    value={valuestart}
                                    onChange={handleChangeTimeStart}
                                    renderInput={(params) => <div style={{display: "flex", marginTop:"10px"}}><TextField {...params} /><p> to</p></div>}
                                />
                            </Grid>
                            <Grid item lg={7}>
                                <DesktopDatePicker
                                    label="End at"
                                    inputFormat="DD/MM/YYYY"
                                    value={valueend}
                                    onChange={handleChangeTimeEnd}
                                    renderInput={(params) => <TextField sx={{marginTop:"10px"}} {...params}/>}               
                                />  
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </Grid>
            </Grid>
           
            <Grid container sx={{marginTop: "20px"}}>
                <Grid item lg={2} md={12} sm={12} xs={12}>
                    <p><b>Note</b></p>
                </Grid>
                <Grid item lg={10} md={12} sm={12} xs={12}>
                    <TextField 
                        fullWidth 
                        label="Note" 
                        {...props.register("note")}                               
                    /> 
                </Grid>
            </Grid>

            <Grid container sx={{marginTop: "20px"}}>
                <Grid item lg={2}>
                    <p><b>All User</b></p>
                </Grid>
                <Grid item lg={10}>
                    <Checkbox 
                        color="error"
                        {...props.register("isAllUserBelongTo")} 
                    />
                    <b>Auto add user as a member of this project when creating new user</b>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item lg={2}>
                    <p><b>Project Type*</b></p> 
                </Grid>
                <Grid item lg={10}>
                    <Button  onClick={()=>props.setValue("projectType", 0)} fullWidth  sx={{width: {lg: "200px"},marginRight: "10px",color: "black",backgroundColor: props.watch("projectType")===0?"orange": "white",border: "0.5px solid gray",borderRadius: "5px", height: "40px", marginTop:"7px"}}>Time & Materials</Button>
                    <Button onClick={()=>props.setValue("projectType", 1)} fullWidth  sx={{width: {lg: "200px"},marginRight: "10px",color: "black",backgroundColor: props.watch("projectType")===1?"orange": "white",border: "0.5px solid gray",borderRadius: "5px", height: "40px", marginTop:"7px"}}>Fixed Frice</Button>
                    <Button onClick={()=>props.setValue("projectType", 2)} fullWidth  sx={{width: {lg: "200px"},marginRight: "10px",color: "black",backgroundColor:props.watch("projectType")===2?"orange":"white",border: "0.5px solid gray",borderRadius: "5px", height: "40px", marginTop:"7px"}}>Non-Bill</Button>
                    <Button onClick={()=>props.setValue("projectType", 3)} fullWidth  sx={{width: {lg: "200px"},marginRight: "10px",color: "black",backgroundColor: props.watch("projectType")===3?"orange":"white",border: "0.5px solid gray",borderRadius: "5px", height: "40px", marginTop:"7px"}}>ODC</Button>
                    <Button onClick={()=>props.setValue("projectType", 4)} fullWidth  sx={{width: {lg: "200px"},marginRight: "10px",color: "black",backgroundColor:props.watch("projectType")===4?"orange": "white",border: "0.5px solid gray",borderRadius: "5px", height: "40px", marginTop:"7px"}}>Product</Button>
                    <Button onClick={()=>props.setValue("projectType", 5)} fullWidth  sx={{width: {lg: "200px"},marginRight: "10px",color: "black",backgroundColor:props.watch("projectType")===5?"orange": "white",border: "0.5px solid gray",borderRadius: "5px", height: "40px", marginTop:"7px"}}>Training</Button>
                    <Button onClick={()=>props.setValue("projectType", 6)} fullWidth  sx={{width: {lg: "200px"},marginRight: "10px",color: "black",backgroundColor: props.watch("projectType")===6?"orange":"white",border: "0.5px solid gray",borderRadius: "5px", height: "40px", marginTop:"7px"}}>No Salary</Button>  
                </Grid>
            </Grid>               
        </div>
    )
}

export default Generalproject;