import * as React from 'react';
import {UserNotPagging, Listtask} from "../../../../../interface/InterfaceProject";
import {useAppDispatch, useAppSelector} from "../../../../../redux/Hook";
import {editGet} from "../../../../../redux/action/ProjectThunk";
import {setTeamView, setTaskView} from "../../../../../redux/readucer/ProjectSlice";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import moment from "moment";

function Viewbutton(props: any){

    const [open, setOpen] = React.useState(false); 
    const dispatch = useAppDispatch();
    const openView=()=>{
        setOpen(true);
        dispatch(editGet(props.id));  
        // dispatch(userGet()); 
        // dispatch(taskGet()); 
    }
    const edit: any= useAppSelector((state) => state.projects.edit);
    const openTask=()=>{
        dispatch(setTaskView(edit)); 
    }
    const openTeam=()=>{
        dispatch(setTeamView(edit));
    }
    const newmove:  UserNotPagging[] = useAppSelector((state) => state.projects.newmove);
    const newtask:  UserNotPagging[] = useAppSelector((state) => state.projects.newtask); 
    //const user:  UserNotPagging[] = useAppSelector((state) => state.projects.user);     
    
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [select, setSelect] = React.useState('Week');
    const selectproject = [
        {
          value: 'Week',
          label: 'Week',
        },
        {
          value: 'Month',
          label: 'Month',
        },
        {
          value: 'Quarter',
          label: 'Quarter',
        },
        {
            value: 'Year',
            label: 'Year',
        },
        {
            value: 'All Time',
            label: 'All Time',
        },
        {
            value: 'Custom Time',
            label: 'Custom Time',
        },
    ];  
    moment.updateLocale('en', {
        week : {
            dow : 1
        }
    });
    const [datestart, setDateStart] = React.useState(moment().startOf('week'));
    const [dateend, setDateEnd] = React.useState(moment().endOf('week'));

    const nextDate=()=>{
        setDateStart(moment(datestart).add(7, 'days').startOf('week'));
        setDateEnd(moment(dateend).add(7, 'days').endOf('week'));
    }
   
    const backDate=()=>{
        setDateStart(moment(datestart).subtract(7, 'days').startOf('week'));
        setDateEnd(moment(dateend).subtract(7, 'days').endOf('week'));
    }

    return(
        <div>
            <Button onClick={openView} sx={{color: "gray"}}> <RemoveRedEyeIcon sx={{paddingRight: "7px"}}/>View</Button>
            <Dialog
                open={open}
                maxWidth={"sm"}  
                fullWidth={true}
                onClose={()=>setOpen(false)}>                
                <DialogContent> 
                    <div style={{paddingBottom:"10px", borderBottom: "1px solid #80808030"}}>     
                        <div style={{marginBottom:"10px",marginTop:"15px"}}>
                            <Button onClick={backDate} variant="outlined" sx={{height:"55px",color:"black",borderColor:'#80808030' }}><ChevronLeftIcon/></Button>
                            <Button onClick={nextDate} variant="outlined" sx={{height:"55px",color:"black",borderColor:'#80808030' }}><ChevronRightIcon/></Button>
                            <b style={{marginLeft:"8px", fontSize:"25px"}}>{select}: {String(moment(datestart).format("DD"))}-{String(moment(dateend).format("DD MMM YYYY"))}</b>
                        </div>
                        <TextField
                            fullWidth
                            select             
                            value={select}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setSelect(event.target.value)}
                        >
                            {selectproject.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> 
                        <Button sx={{backgroundColor:"#f44336", color:"white", marginTop:"20px"}}>Export</Button>
                    </div> 
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', width:"180px" }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Tasks" value="1" onClick={openTask}/>
                            <Tab label="Team" value="2" onClick={openTeam}/>
                        </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div style={{display: "flex", justifyContent: "space-around",  border:"1px solid #80808012",backgroundColor: "#80808012"}}>
                                <p style={{marginRight: "10px"}}><b>Billable Tasks</b></p>
                                <p style={{marginRight: "10px"}}><b>Hour</b></p>
                                <p style={{marginRight: "10px"}}><b>Billable Hour</b></p>
                            </div>
                            <ul style={{listStyleType: "none", margin:"0", padding:"0",overflowY: "scroll", height:"400px",backgroundColor: "#80808012"}}>
                                {newtask? newtask.map((Listtask:Listtask, index)=>{
                                    return (
                                        <li key={index}
                                            onMouseOver={(event: React.MouseEvent<HTMLElement>)=>event.currentTarget.style.backgroundColor = "#80808030"} 
                                            onMouseOut={(event: React.MouseEvent<HTMLElement>)=>index%2?event.currentTarget.style.backgroundColor = "#80808012": event.currentTarget.style.backgroundColor = "white"}    
                                            style={{backgroundColor: index%2?"#80808012": "white",display: "flex", border:"1px solid #80808012"}}
                                        >
                                            <div style={{width: "60%", marginTop:"15px", marginLeft:"10px"}}>
                                                {Listtask.name}
                                            </div>
                                            <div style={{display: "flex"}}>
                                                <button style={{marginTop:"15px",marginRight:"10px",width: "90px", height: "15px"}}/>
                                                <p>(0%)</p>
                                            </div>
                                        </li>
                                    )
                                }): null}
                            </ul>
                        </TabPanel>
                        <TabPanel value="2">
                            <div style={{display: "flex", justifyContent: "space-around", border:"1px solid #80808012",backgroundColor: "#80808012"}}>
                                <p style={{marginRight: "10px"}}><b>Name</b></p>
                                <p style={{marginRight: "10px"}}><b>Hour</b></p>
                                <p style={{marginRight: "10px"}}><b>Billable Hour</b></p>
                            </div>
                            <ul style={{listStyleType: "none", margin:"0", padding:"0", overflowY: "scroll", height:"400px"}}>
                                {newmove? newmove.map((Listtask:Listtask, index)=>{
                                    return (
                                        <li key={index} 
                                            onMouseOver={(event: React.MouseEvent<HTMLElement>)=>event.currentTarget.style.backgroundColor = "#80808030"} 
                                            onMouseOut={(event: React.MouseEvent<HTMLElement>)=>index%2?event.currentTarget.style.backgroundColor = "#80808012": event.currentTarget.style.backgroundColor = "white"}    
                                            style={{backgroundColor: index%2?"#80808012": "white",display: "flex", border:"1px solid #80808012"}}
                                        >
                                            <div style={{width: "60%", marginTop:"15px", marginLeft:"10px"}}>
                                                {Listtask.name}
                                            </div>
                                            <div style={{display: "flex"}}>
                                                <button style={{marginTop:"15px",marginRight:"10px",width: "90px", height: "15px"}}/>
                                                <p>(0%)</p>
                                            </div>
                                        </li>
                                    )
                                }): null}
                            </ul>
                        </TabPanel>
                    </TabContext>      
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Viewbutton;