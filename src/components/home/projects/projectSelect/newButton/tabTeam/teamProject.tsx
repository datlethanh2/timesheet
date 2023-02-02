import { useState} from 'react';
import {UserNotPagging} from "../../../../../../interface/InterfaceProject";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/Hook";
import {setDeleteNewTeam, setTypeTeam1} from "../../../../../../redux/readucer/ProjectSlice";
import Teamuser from "./teamUser";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Teamproject(props: any){

  
    const typeuser: string[]=["Staff", "Internship", "Collaborator"];
    const leveluser: string[]=["Inter_0","Inter_1","Inter_2", "Prefresher","Fresher-","Fresher","Fresher+","Junior-","Junior","Junior+","Middle-","Middle","Middle+","Senior-","Senior", "Senior+"];
    const members= [
        {
          value: '0',
          label: 'Member',
        },
        {
          value: '1',
          label: 'Project Manager',
        },
        {
          value: '2',
          label: 'Shadow',
        },
        {
            value: '3',
            label: 'Deactive',
        },
    ];  
    const dispatch = useAppDispatch()
    let newteam:  UserNotPagging[] = useAppSelector((state) => state.projects.newteam);
    const deleteNew=(index: number)=>{      
        dispatch(setDeleteNewTeam(index));
    }
    const changeType=(index: number, id: number)=>{
        dispatch(setTypeTeam1({id: id,index: index,}));
    };

    const [intext, setIntext] = useState("");
    const [text, setText] = useState("");
    const onKeyUpSearch =(e: any)=>{
        if (e.key === "Enter"){ 
            setText(()=>intext);              
        }     
    } 
    if(text){
        newteam=newteam.filter((UserNotPagging : UserNotPagging)=> {
            if(UserNotPagging.name.toLowerCase().includes(text)){
                return UserNotPagging;
            }
            if(UserNotPagging.emailAddress.toLowerCase().includes(text)){
                return UserNotPagging;
            }
        })  
    }
    const [checked, setChecked] = useState(false);
    if(!checked){
        newteam=newteam.filter((UserNotPagging : UserNotPagging)=>UserNotPagging.branchId !==3)
    }

    return(
        <div style={{paddingBottom: "30px", display:"flex"}}>        
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <b>Team</b>
                </AccordionSummary>
                <AccordionDetails >              
                        <Checkbox color='error' checked={checked} onClick={()=>setChecked(!checked)}/>
                         <b>Show deactive member</b>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField 
                                fullWidth 
                                sx={{width: "530px"}}
                                label="Search by name, email" 
                                variant="standard" 
                                value={intext}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setIntext(event.target.value)}
                                onKeyUp={onKeyUpSearch}
                            />
                        </Box>
                        <ul style={{overflowY: newteam.length>0?"scroll": "visible", height: newteam.length>0?"300px":"0", listStyleType: "none", padding: "0"}}>
                            {newteam? newteam.map((UserNotPagging : UserNotPagging, index)=>{
                                return(
                                <li key={index}
                                    onMouseOver={(event: React.MouseEvent<HTMLElement>)=>event.currentTarget.style.backgroundColor = "#80808030"} 
                                    onMouseOut={(event: React.MouseEvent<HTMLElement>)=>index%2?event.currentTarget.style.backgroundColor = "#8080801c": event.currentTarget.style.backgroundColor = "white"}  
                                    style={{backgroundColor:index%2? "#8080801c":"white",fontSize:"13px", listStyleType: "none", color:"black", display: "flex", border: "1px solid #80808030"}}
                                >
                                    <div style={{ marginRight: "10px", display:"flex"}}>
                                        <IconButton onClick={()=>deleteNew(UserNotPagging.id)}><ClearIcon /></IconButton>
                                        <img src={UserNotPagging.avatarPath} alt="member" width="50px" height="70px" style={{marginTop:"5px"}}/>
                                    </div>
                                    <div>
                                        <div style={{display: "flex", padding:"0", fontSize:"11px"}}>
                                            <p style={{marginRight:"5px",fontSize:"13px"}}><b>{UserNotPagging.name}</b></p>
                                            <p style={{color:"white",backgroundColor:UserNotPagging.type===0? "#ff0000a6":UserNotPagging.type===1?"#00800066":"#0000ffa1", borderRadius:"10px", paddingLeft:UserNotPagging.type>=0?"5px":"0px",paddingRight:UserNotPagging.type>=0?"5px":"0px"}}><b>{typeuser[UserNotPagging.type]}</b></p>
                                            <p style={{color:"white",backgroundColor: "#0000ff7a", lineHeight:"normal", borderRadius:"10px", paddingLeft:UserNotPagging.branchDisplayName?"5px": "0px",paddingRight:UserNotPagging.branchDisplayName?"5px": "0px"}}><b>{UserNotPagging.branchDisplayName}</b></p>
                                            <p style={{color:"white",backgroundColor: "orange", borderRadius:"10px", paddingLeft:UserNotPagging.level>=0?"5px":"0px",paddingRight:UserNotPagging.level>=0?"5px":"0px"}}><b>{leveluser[UserNotPagging.level]}</b></p>
                                        </div>
                                        <i style={{padding:"0", margin: "0"}}>{UserNotPagging.emailAddress}</i>
                                    </div> 
                                    <TextField
                                        select  
                                        variant="standard"  
                                        sx={{ marginTop: "15px", marginLeft:"5px"}}   
                                        value={String(UserNotPagging.branchId)}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(event.target.value)}
                                    >
                                        {members.map((option) => (
                                            <MenuItem   key={option.value} 
                                                        value={option.value}
                                                        sx={{backgroundColor:index%2? "#8080801c":"white"}}           
                                            >
                                                <button style={{backgroundColor:index%2? "#8080801c":"white",border: "none", width:"95%"}} onClick={()=>changeType(Number(option.value), UserNotPagging.id)}>{option.label}</button>
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </li>
                                )
                            }): null}
                        </ul>
                </AccordionDetails>
            </Accordion>
            <Teamuser/>
        </div>
    )
}

export default Teamproject;