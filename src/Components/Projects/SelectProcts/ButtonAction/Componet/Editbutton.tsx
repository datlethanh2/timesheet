import * as React from 'react';
import { useForm } from "react-hook-form";
import {Newpro, Taskp, Task,  UserNotPagging, Users, Listtask} from "../../../../../Intertype/Typeproject";
import Button from '@mui/material/Button';
import axiosTv from "../../../../../Api/axiosTv";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Editmain from "./EditButton/Editmain";


function Editbutton(props: any){

    const [open, setOpen] = React.useState(false); 
    

    const [projects, setProjects]=React.useState<Newpro>();
    const [taskprojects, setTaskProjects]=React.useState<Task[]>([]);
    const [teamprojects, setTeamProjects]=React.useState< UserNotPagging[]>([]);
    const projectGet = async () => {       
        const res = await axiosTv.get('api/services/app/Project/Get',{
            params:{
                input: props.id,
            }
        });                     
        setProjects(res.data.result);                           
    };
    const projectGetTask = async () => {       
        const res1 = await axiosTv.get('api/services/app/Task/GetAll');                     
        setTaskProjects(res1.data.result); 
    };
    const projectGetTeam = async () => {          
        const res = await axiosTv.get('api/services/app/User/GetUserNotPagging');                     
        setTeamProjects(res.data.result);            
    }; 
    React.useEffect(() => {  
        projectGet();
        projectGetTask();  
        projectGetTeam();      
    }, []);
    

    return(
        <div>
            <Button onClick={()=>setOpen(true)}>Edit</Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}>                
                <DialogContent>                                
                    <Editmain
                        projects={projects}
                        taskprojects={taskprojects}
                        teamprojects={teamprojects}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Editbutton;