import * as React from 'react';
import axiosTv from "../../../../../Api/axiosTv";
import {Newpro, Taskp, Task,  UserNotPagging, Users, Listtask} from "../../../../../Intertype/Typeproject";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import _ from 'lodash';

function Viewbutton(props: any){

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

    //console.log("a:", teamprojects);

    const [taskview, setTaskView]=React.useState<Listtask[]>([]);
    const viewTask =()=>{  
        if(taskprojects.length>0){
            if(projects){
                const listTask= taskprojects.filter((Task: Task) => projects.tasks.some((Taskp: Taskp) =>Taskp.taskId === Task.id));
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

    const [teamview, setTeamView]=React.useState<Listtask[]>([]);
    const viewTeam =()=>{  
        if(teamprojects.length>0){
            if(projects){
                const listTeam= teamprojects.filter(( UserNotPagging:  UserNotPagging) => projects.users.some((Users: Users) => Users.userId ===  UserNotPagging.id));               
                listTeam.forEach(( UserNotPagging:  UserNotPagging)=>{
                    if(teamview.length !==listTeam.length){
                        teamview.push({
                            id: UserNotPagging.id,
                            name: UserNotPagging.name,
                        })
                    }                   
                })
            }                   
        }
    }
    viewTeam();
   // console.log("helo", teamview);

    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return(
        <div>
            <Button onClick={()=>setOpen(true)}>View</Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}>                
                <DialogContent>                                
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Tasks" value="1" />
                            <Tab label="Team" value="2" />
                        </TabList>
                        </Box>
                        <TabPanel value="1">
                            <ul>
                                {taskview? taskview.map((Listtask:Listtask)=>{
                                    return (
                                        <li key={Listtask.id}>
                                            {Listtask.name}
                                        </li>
                                    )
                                }): null}
                            </ul>
                        </TabPanel>
                        <TabPanel value="2">
                            <ul>
                                {teamview? teamview.map((Listtask:Listtask)=>{
                                    return (
                                        <li key={Listtask.id}>
                                            {Listtask.name}
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