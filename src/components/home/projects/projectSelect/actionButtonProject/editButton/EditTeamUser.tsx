import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../../../redux/Hook";
import {UserNotPagging} from "../../../../../../interface/InterfaceProject";
import {setMoveTeam} from "../../../../../../redux/readucer/ProjectSlice";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

function Editteamuser(){

    const typeuser: string[]=["Staff", "Internship", "Collaborator"];
    const leveluser: string[]=["Inter_0","Inter_1","Inter_2", "Prefresher","Fresher-","Fresher","Fresher+","Junior-","Junior","Junior+","Middle-","Middle","Middle+","Senior-","Senior", "Senior+"];
    const dispatch = useAppDispatch();
    let user:  UserNotPagging[] = useAppSelector((state) => state.projects.user);
    let usermain:  UserNotPagging[] = useAppSelector((state) => state.projects.usermain);
    let newmove:  UserNotPagging[] = useAppSelector((state) => state.projects.newmove);
    React.useEffect(() => {             
        //dispatch(userGet());   
    }, []);
    const newMove=(index: number)=>{      
        dispatch(setMoveTeam(index));
    }

    const [intext, setIntext] = React.useState("");
    const [text, setText] = React.useState("");
    const onKeyUpSearch =(e: any)=>{
        if (e.key === "Enter"){ 
            setText(()=>intext);              
        }     
    } 

    const [branch, setBranch] = React.useState('0');
    const branchs = [
        {
          value: '0',
          label: 'All',
        },
        {
          value: '1',
          label: 'Hà Nội',
        },
        {
          value: '2',
          label: 'Hà Nội 2',
        },
        {
            value: '3',
            label: 'Sài Gòn 1',
        },
        {
            value: '4',
            label: 'Kon Tum',
        },
        {
            value: '5',
            label: 'Đà Nẵng',
        },
    ]; 
    const [type, setType] = React.useState('0'); 
    if(branch==='0' || type==='0'){
        user=usermain.filter((UserNotPagging:UserNotPagging)=>!newmove.some(( UserNotPagging1: UserNotPagging)=>UserNotPagging1.id===UserNotPagging.id));;
    }
    if(branch==='1'){
        user=user.filter((UserNotPagging : UserNotPagging) => (UserNotPagging.branchDisplayName=== "Hà Nội"));
    }
    if(branch==='2'){
        user=user.filter((UserNotPagging : UserNotPagging) => (UserNotPagging.branchDisplayName=== "Hà Nội 2"));
    }
    if(branch==='3'){
        user=user.filter((UserNotPagging : UserNotPagging) => (UserNotPagging.branchDisplayName=== "Sài Gòn 1"));
    }
    if(branch==='4'){
        user=user.filter((UserNotPagging : UserNotPagging) => (UserNotPagging.branchDisplayName=== "Kon Tum"));
    }
    if(branch==='5'){
        user=user.filter((UserNotPagging : UserNotPagging) => (UserNotPagging.branchDisplayName=== "Đà  Nẵng"));
    }
    const types = [
        {
          value: '0',
          label: 'All',
        },
        {
          value: '1',
          label: 'Staff',
        },
        {
          value: '2',
          label: 'Internship',
        },
        {
            value: '3',
            label: 'Collaborator',
        },
    ]; 
    if(type==='1'){
        user=user.filter((UserNotPagging : UserNotPagging) => (UserNotPagging.type === 0));
    }
    if(type==='2'){
        user=user.filter((UserNotPagging : UserNotPagging) => (UserNotPagging.type === 1));
    }
    if(type==='3'){
        user=user.filter((UserNotPagging : UserNotPagging) => (UserNotPagging.type === 2));
    }
    if(text){
        user=user.filter((UserNotPagging : UserNotPagging)=> {
            if(UserNotPagging.name.toLowerCase().includes(text)){
                return UserNotPagging;
            }
            if(UserNotPagging.emailAddress.toLowerCase().includes(text)){
                return UserNotPagging;
            }
        })  
    }

    return(
        <div>
           <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <b>Select team member</b>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={0.5}>
                        <Grid item lg={3} xs={12}>
                            <TextField
                                select 
                                label="Branch"
                                fullWidth
                                variant="standard" 
                                sx={{marginBottom: "15px"}}           
                                value={branch}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setBranch(event.target.value)}
                            >
                                {branchs.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <TextField
                                select 
                                label="Type"
                                fullWidth
                                sx={{marginBottom: "15px"}}
                                variant="standard"            
                                value={type}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setType(event.target.value)}
                            >
                                {types.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginBottom:"20px" }}>
                                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField 
                                    sx={{width: "500px"}}
                                    fullWidth label="Search by name, email" 
                                    variant="standard" 
                                    value={intext}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setIntext(event.target.value)}
                                    onKeyUp={onKeyUpSearch}
                                />
                            </Box> 
                        </Grid>
                    </Grid>
                    
                    <ul style={{overflowY: "scroll", height: "300px",listStyleType: "none", padding: "0"}}>
                        {user? user.map((UserNotPagging : UserNotPagging, index)=>{
                            return(
                                <li key={index} 
                                    onMouseOver={(event: React.MouseEvent<HTMLElement>)=>event.currentTarget.style.backgroundColor = "#80808030"} 
                                    onMouseOut={(event: React.MouseEvent<HTMLElement>)=>index%2?event.currentTarget.style.backgroundColor = "#8080801c": event.currentTarget.style.backgroundColor = "white"}  
                                    style={{background:index%2? "#8080801c":"white",fontSize:"13px", listStyleType: "none", color:"black", display: "flex", border: "1px solid #80808030"}}
                                >
                                    <IconButton onClick={()=>newMove(UserNotPagging.id)}><ArrowBackIosIcon/></IconButton>                                       
                                        <div style={{display:"flex"}}>
                                            <img src={UserNotPagging.avatarFullPath} alt="member" width="70px" height="70px" style={{borderRadius: "50%", marginTop:"10px", marginRight: "10px"}}/>
                                            <div>
                                                <div style={{display: "flex", padding:"0", fontSize:"11px", marginRight: "10px"}}>
                                                    <p style={{marginRight:"5px",fontSize:"13px"}}><b>{UserNotPagging.name}</b></p>
                                                    <p style={{color:"white",backgroundColor:UserNotPagging.type===0? "#ff0000a6":UserNotPagging.type===1?"#00800066":"#0000ffa1", borderRadius:"10px", paddingLeft:UserNotPagging.type>=0?"5px":"0px",paddingRight:UserNotPagging.type>=0?"5px":"0px"}}><b>{typeuser[UserNotPagging.type]}</b></p>
                                                    <p style={{color:"white",backgroundColor: "#0000ff7a", lineHeight:"normal", borderRadius:"10px", paddingLeft:UserNotPagging.branchDisplayName?"5px": "0px",paddingRight:UserNotPagging.branchDisplayName?"5px": "0px"}}><b>{UserNotPagging.branchDisplayName}</b></p>
                                                    <p style={{color:"white",backgroundColor: "orange", borderRadius:"10px", paddingLeft:UserNotPagging.level>=0?"5px":"0px",paddingRight:UserNotPagging.level>=0?"5px":"0px"}}><b>{leveluser[UserNotPagging.level]}</b></p>
                                                </div>
                                                <i style={{padding:"0", margin: "0"}}>{UserNotPagging.emailAddress}</i>
                                            </div>
                                        </div> 
                                </li>
                            )
                        }): null}
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Editteamuser;