import styled from 'styled-components';
import axiosTv from '../../../../Api/axiosTv';
import { useState, useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {Task} from "../../../../Intertype/Typeproject";


function Taskproject(props: any){

    const [taskprojects, setTaskProjects]=useState<Task[]>([]);
    const projectGetAll = async () => {          
        const res = await axiosTv.get('api/services/app/Task/GetAll');                     
        setTaskProjects(res.data.result);            
    }; 
    

    useEffect(() => {             
        projectGetAll();  
        
    }, []);


    const deleteTask=(index: number)=>{
        const newlist2=taskprojects.filter(( Task) => ( Task.id !== index));
        setTaskProjects(newlist2);
    }

    const [check, setCheck]=useState(true);

    const checkBi=(index: number, check: boolean)=>{
        const innews1=  taskprojects.map((Task) => {
            if(Task.id === index){
                    return {...Task, isDeleted: !check};             
                                  
            } else{
                return Task;
            }
        })
        setTaskProjects(innews1);
        
    }
    
    // const [taskp, setTaskp]=useState<Taskp[]>([]);
    // taskprojects.forEach((Task) =>
    //     taskp.push({
    //         taskId: Task.id,
    //         billable: !Task.isDeleted,
    //         id: 0,
    //     })
    // );  
    
    const guiTask=(index: Task[])=>{
        props.guiTask(index);
    }
    guiTask(taskprojects);
    //console.log("tasks:", taskprojects)

    return(
        <div>
           
            <ul style={{listStyleType:"none", padding:"0"}}>
                {taskprojects? taskprojects.map((Task)=>{
                    return(
                        <li key={Task.id}>
                            <button onClick={()=>deleteTask(Task.id)}>Delete</button>
                            {Task.name}           
                            <Checkbox color="error" checked={!Task.isDeleted}  onClick={()=>checkBi(Task.id, Task.isDeleted)}/>
                        </li>
                    )
                }): null}
            </ul>
        </div>
    )
}

export default Taskproject;