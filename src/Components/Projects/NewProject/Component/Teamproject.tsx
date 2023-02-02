import styled from 'styled-components';
import axiosTv from '../../../../Api/axiosTv';
import { useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ClearIcon from '@mui/icons-material/Clear';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {UserNotPagging} from "../../../../Intertype/Typeproject";

const Listuser=styled.ul
`   padding:0;
    margin:0;
    li{
        border: 1px solid gray;
        display: flex;
        list-style-type: none;
        img{
            width:40px;
            height: 40px;
        }
        p{
            background-color: #00800066;
            border-radius:10px;
            padding-left: 5px;
            padding-right: 5px;
        }
    }
`;



function Teamproject(props: any){

    const [teamprojects, setTeamProjects]=useState< UserNotPagging[]>([]);
    const projectGetAll = async () => {          
        const res = await axiosTv.get('api/services/app/User/GetUserNotPagging');                     
        setTeamProjects(res.data.result);            
    }; 
    const typeuser: string[]=["Staff", "Internship", "Collaborator"];
    const branchuser: string[]=["", "Hà Nội 1", "1"];
    const [teamprojects2, setTeamProjects2]=useState< UserNotPagging[]>([]);
    
   
    const [member, setMember]=useState<number>(0);
    const [namec, setNameC]=useState<string>("");

    useEffect(() => {             
        projectGetAll();    
    }, []);

    

    const newMove=(index: UserNotPagging)=>{      
        const newList=teamprojects.filter(( UserNotPagging) => ( UserNotPagging.id === index.id));
        setTeamProjects2([...teamprojects2, ...newList]);
        const newlist2=teamprojects.filter(( UserNotPagging) => ( UserNotPagging.id !== index.id)); 
        setTeamProjects(newlist2);
        setMember(teamprojects2.length+1);      
    }

    const deleteNew=(index: UserNotPagging)=>{      
        const newlist2=teamprojects2.filter(( UserNotPagging) => ( UserNotPagging.id !== index.id));
        setTeamProjects2(newlist2);
        const newlist=teamprojects2.filter(( UserNotPagging) => ( UserNotPagging.id === index.id));
        setTeamProjects([...newlist,...teamprojects]);
        setMember(teamprojects2.length-1);
    }

    const guiName=(index: string)=>{
        props.guiName(index);
    }

    const changeType=(index: number, id: number)=>{
        const innews1=  teamprojects2.map((UserNotPagging: UserNotPagging) => {
            if(UserNotPagging.id === id){
                    return {...UserNotPagging, type: index};
              
                                  
            } else{
                return UserNotPagging;
            }
        })
        setTeamProjects2(innews1);
    }

    const [addexit, setAddExit]=useState<boolean>(false);

    const typet=["Member","PM", "Shadow","Deactive"];

    // const user: Users[] = [];
    // teamprojects2.forEach((UserNotPagging) =>
    //     user.push({
    //         id: 0,
    //         userId: UserNotPagging.id,
    //         isTemp: false,
    //         type: UserNotPagging.type,
    //     })
    // );

    const guiTeam=(index: UserNotPagging[])=>{
        props.guiTeam(index);
    };
    guiTeam(teamprojects2);

    return(
        <div>
            <p><b>Team</b></p>
            <FormControlLabel 
                control={<Checkbox 
                    //{...props.register("isNoticeKMSubmitTS", { required: true })} 
                />
                } label="Show deactive member" />
            <p></p>
             <FormControlLabel 
                control={<Checkbox 
                    //{...props.register("isNoticeKMSubmitTS", { required: true })} 
                />
                } label="Show Inactive user" />

            <div style={{display: addexit? "block": "none"}}>
                <b>Select team member</b>
                <Listuser>
                        {teamprojects2? teamprojects2.map((UserNotPagging:UserNotPagging)=>{                           
                            return(                           
                                <li key={UserNotPagging.id}>
                                    <IconButton onClick={()=>deleteNew(UserNotPagging)}><ClearIcon/></IconButton>
                                    {/* <img src={UserNotPagging.avatarFullPath}/> */}
                                    <b>{UserNotPagging.name}</b>
                                    <p>{branchuser[UserNotPagging.branch]}</p>
                                    <p>{typeuser[UserNotPagging.type]}</p>
                                    <i>{UserNotPagging.emailAddress}</i>     
                                    <Select
                                        variant="standard"  
                                        value={typet[UserNotPagging.type]}
                                        onChange={((event: SelectChangeEvent)=>(event.target.value))}
                                        >
                                        <MenuItem value={typet[0]}><button style={{border:"none" , backgroundColor: "white"}} onClick={()=>changeType(0, UserNotPagging.id)}>Member</button></MenuItem>
                                        <MenuItem value={typet[1]}><button style={{border:"none" , backgroundColor: "white"}} onClick={()=>changeType(1, UserNotPagging.id)}>PM</button></MenuItem>
                                        <MenuItem value={typet[2]}><button style={{border:"none" , backgroundColor: "white"}} onClick={()=>changeType(2, UserNotPagging.id)}>Shadow</button></MenuItem>
                                        <MenuItem value={typet[3]}><button style={{border:"none" , backgroundColor: "white"}} onClick={()=>changeType(3, UserNotPagging.id)}>Deactive</button></MenuItem>
                                    </Select>
                               
                                </li>
                            )
                        }): null}
                </Listuser>
            </div>

            <button style={{display: addexit? "none": "block", color:"white", backgroundColor: "#ff00008f", borderColor: "#ff00008f", height: "35px"}} onClick={()=>setAddExit(true)}>Add user</button>
            <button style={{display: addexit? "block": "none", color:"white", backgroundColor: "#ff00008f", borderColor: "#ff00008f", height: "35px"}} onClick={()=>setAddExit(false)}>Exit user</button>
            
            <div style={{display: addexit? "block": "none"}}>
                <Listuser>
                    {teamprojects? teamprojects.map((UserNotPagging : UserNotPagging)=>{
                        return(
                        <li key={UserNotPagging.id}>
                                <IconButton onClick={()=>newMove(UserNotPagging)}><ArrowBackIosIcon/></IconButton>
                                {/* <img src={UserNotPagging.avatarFullPath}/> */}
                                <b>{UserNotPagging.name}</b>
                                <p>{branchuser[UserNotPagging.branch]}</p>
                                <p>{typeuser[UserNotPagging.type]}</p>
                                <i>{UserNotPagging.emailAddress}</i>    
                        </li>
                        )
                    }): null}
                </Listuser>
            </div>
        </div>
    )
}

export default Teamproject;