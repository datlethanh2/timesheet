import React from "react";
import { useState} from 'react';
import {Task} from "../../../../../interface/InterfaceProject";
import {useAppDispatch, useAppSelector} from "../../../../../redux/Hook";
import {setTaskNewDelete, setTaskNewCheck, setMoveNewTask, setBillableNewTask} from "../../../../../redux/readucer/ProjectSlice";
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

function Taskproject(props: any){

    let tasks= useAppSelector((state) => state.projects.tasks);
    let comtasks= useAppSelector((state) => state.projects.comtasks);
    //console.log(comtasks);
    const dispatch = useAppDispatch();
    const deleteTask=(index: number)=>{
        dispatch(setTaskNewDelete(index)); 
    }
    const newMove=(index: number)=>{      
        dispatch(setMoveNewTask(index));
    }
    const checkBi=(index: number, check1: boolean)=>{
        dispatch(setTaskNewCheck({index:index,check: check1})); 
    }
    const checkBillable=(check1: boolean)=>{
        setCheck(false);
        dispatch(setBillableNewTask(check1))
    }
    const othercom=["Common Task", "Other Task"];
    const [checked, setChecked] = useState(false);
    const [check, setCheck] = useState(false);
    React.useEffect(()=>{
        let a: string="";
        let b: string="";
        comtasks.forEach((Task: Task)=>{
            if(Task.isDeleted===true){
               a="hello true";
            }
            if(Task.isDeleted===false){
                b="hello false";
             }
        })
        if(a==="hello true"&& b==="hello false"){
            setCheck(true);
        }
        if(a==="hello true"&& b!=="hello false"){
            setChecked(true);
            setCheck(false);
        }
        if(a!=="hello true"&& b==="hello false"){
            setChecked(false);
            setCheck(false);
        }
        
    },);
    

    return(
        <div> 
            <div style={{display: "flex", justifyContent: "space-between", border:"1px solid #80808012", backgroundColor: "#80808012", color:"black", height: "80px"}}>
                    <p style={{marginLeft: "10px", marginTop: "30px"}}><b>Tasks</b></p>
                    <p style={{marginRight: "10px"}}>
                        <b>Billable </b> 
                        <br></br>                              
                        <Checkbox
                            color="error"
                            checked={checked}
                            indeterminate={check}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setChecked(event.target.checked)}
                            onClick={()=>checkBillable(!checked)}
                        />
                    </p>
            </div>      
            <ul style={{listStyleType:"none", padding:"0", margin: "0",overflowY: "scroll", height: "280px"}}>
                
                {comtasks? comtasks.map((Task: Task, index)=>{
                    return(
                        <li key={index} 
                            onMouseOver={(event: React.MouseEvent<HTMLElement>)=>event.currentTarget.style.backgroundColor = "#80808030"} 
                            onMouseOut={(event: React.MouseEvent<HTMLElement>)=>index%2?event.currentTarget.style.backgroundColor = "#80808012": event.currentTarget.style.backgroundColor = "white"}  
                            style={{background:index%2? "#80808012":"white", display: "flex", justifyContent: "space-between", border:"1px solid #80808012", color:"black"}}
                        >
                            <div>
                                <IconButton onClick={()=>deleteTask(Task.id)}><ClearIcon/></IconButton>
                                {Task.name} 
                            </div>
                            <div style={{marginRight: "7px"}}>                                       
                                <Checkbox 
                                    checked={Task.isDeleted} 
                                    color="error"
                                    onClick={()=>checkBi(Task.id, !Task.isDeleted)}
                                />
                            </div> 
                        </li>
                    )
                }): null}
            </ul>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <p><b>Select task</b></p> 
                </AccordionSummary>
                <AccordionDetails>
                    <ul style={{listStyleType: "none", padding: "0", overflowY: "scroll", height: "280px"}}>
                        {tasks?tasks.map((Task: Task, index)=>{
                            return(
                                <li key={index}
                                    onMouseOver={(event: React.MouseEvent<HTMLElement>)=>event.currentTarget.style.backgroundColor = "#80808030"} 
                                    onMouseOut={(event: React.MouseEvent<HTMLElement>)=>index%2?event.currentTarget.style.backgroundColor = "#80808012": event.currentTarget.style.backgroundColor = "white"}    
                                    style={{backgroundColor: index%2?"#80808012": "white",display: "flex", justifyContent: "space-between", border: "1px solid gray"}}
                                >
                                    <div style={{display: "flex"}}>
                                        <IconButton onClick={()=>newMove(Task.id)}>< ControlPointIcon/></IconButton>
                                        {/* <p>{Task.id}</p> */}
                                        <p>{Task.name}</p>
                                    </div>
                                    <p>{othercom[Task.type]}</p>
                                </li>
                            )
                        }): null}
                    </ul>
                </AccordionDetails>
            </Accordion>

        </div>
    )
}

export default Taskproject;