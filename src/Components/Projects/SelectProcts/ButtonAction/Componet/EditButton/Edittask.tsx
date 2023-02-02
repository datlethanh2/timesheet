import * as React from 'react';
import {Taskp, Task, Listtask} from "../../../../../../Intertype/Typeproject";

function Edittask(props: any){

    const [taskview, setTaskView]=React.useState<Listtask[]>([]);
    const viewTask =()=>{  
        if(props.taskprojects.length>0){
            if(props.projects){
                const listTask= props.taskprojects.filter((Task: Task) => props.projects.tasks.some((Taskp: Taskp) =>Taskp.taskId === Task.id));
                listTask.forEach((Task: Task)=>{
                    if(taskview.length !==listTask.length){
                        taskview.push({
                            id:Task.id,
                            name: Task.name,
                        })
                    }                   
                })
            }                   
        }
    }
    viewTask();
    const octask=["Common Task", "Other Task"];

    return(
        <div>
            <ul>
                {taskview? taskview.map((Listtask:Listtask)=>{
                    return (
                        <li key={Listtask.id}>
                            {Listtask.name}
                        </li>
                    )
                }): null}
            </ul>
            <ul>
                <p>Select task</p>
                {props.taskprojects? props.taskprojects.map((Task: Task)=>{
                    return (
                        <li key={Task.id}>
                            <p>{Task.name}</p>
                            <p>{octask[Task.type]}</p>
                        </li>
                    )
                }): null}
            </ul>
        </div>
    )
}
export default Edittask;