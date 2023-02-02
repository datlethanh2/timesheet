import { useState} from 'react';
import {UserNotPagging} from "../../../../../../interface/InterfaceProject";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/Hook";
import Editteamuser from "./EditTeamUser";
import {setDeleteTeam, setTypeTeam} from "../../../../../../redux/readucer/ProjectSlice";
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


function Editteam(props: any){

  
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
    const [member, setMember] = useState('1');
    let edit: any= useAppSelector((state) => state.projects.edit);  
    const dispatch = useAppDispatch();
    
    let newmove: UserNotPagging[] = useAppSelector((state) => state.projects.newmove);
    const deleteNew=(index: number, id:number)=>{      
        dispatch(setDeleteTeam({index:index, id: id}));
    }
    const changeType=(index: number, id: number)=>{
        dispatch(setTypeTeam({id: id,index: index,}));
    };

    const [intext, setIntext] = useState("");
    const [text, setText] = useState("");
    const onKeyUpSearch =(e: any)=>{
        if (e.key === "Enter"){ 
            setText(()=>intext);              
        }     
    } 
    if(text){
        newmove=newmove.filter((UserNotPagging : UserNotPagging)=> {
            if(UserNotPagging.name.toLowerCase().includes(text)){
                return UserNotPagging;
            }
            if(UserNotPagging.emailAddress.toLowerCase().includes(text)){
                return UserNotPagging;
            }
        })  
    }
    let typeteam= useAppSelector((state) => state.projects.typeteam);  
    const [checked, setChecked] = useState(false);
    let deteam: number[]=[];
    if(!checked){
        deteam=[];
        typeteam.forEach((item, index)=>{
            if(item===3){
                deteam.push(index)
            }
        })
    }

    return(
        <div>
            <div style={{display:"flex"}}> 
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <b>Team</b>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Checkbox color='error' checked={checked} onClick={()=>setChecked(!checked)}/>
                         <b>Show deactive member</b>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField 
                                fullWidth label="Search by name, email" 
                                variant="standard"
                                 sx={{width: "530px"}} 
                                value={intext}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setIntext(event.target.value)}
                                onKeyUp={onKeyUpSearch}
                            />
                        </Box>
                        <ul style={{overflowY: newmove.length>0?"scroll": "visible", height: newmove.length>0?"300px":"0", listStyleType: "none", padding: "0"}}>
                            {newmove? newmove.map((UserNotPagging : UserNotPagging, index)=>{
                                return(
                                    <li key={index} 
                                        onMouseOver={(event: React.MouseEvent<HTMLElement>)=>event.currentTarget.style.backgroundColor = "#80808030"} 
                                        onMouseOut={(event: React.MouseEvent<HTMLElement>)=>index%2?event.currentTarget.style.backgroundColor = "#8080801c": event.currentTarget.style.backgroundColor = "white"}  
                                        style={{display:!checked && deteam.indexOf(index+1)>=0?"none":"flex",background:index%2? "#8080801c":"white",fontSize:"13px", listStyleType: "none", color:"black", border: "1px solid #80808030"}}
                                    >                                   
                                        <IconButton onClick={()=>deleteNew(UserNotPagging.id, index)}><ClearIcon /></IconButton>                                       
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
                                        <TextField
                                            select 
                                            fullWidth
                                            variant="standard"  
                                            sx={{marginTop: "10px", width:"140px",marginLeft:"5px"}}             
                                            value={String(typeteam[index+1])}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(event.target.value)}
                                        >
                                            {members.map((option) => (
                                                <MenuItem   key={option.value} 
                                                            value={option.value} 
                                                            sx={{backgroundColor:index%2? "#8080801c":"white"}}
                                                >
                                                    <button style={{backgroundColor:index%2? "#8080801c":"white",margin:"0",border: "none", width:"95%", height: "30px"}} onClick={()=>changeType(Number(option.value),index)}>{option.label}</button>
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    </li>
                                )
                            }): null}
                        </ul>
                    </AccordionDetails>
                </Accordion>

                <Editteamuser/>
            </div>
        </div>
    )
}

export default Editteam;