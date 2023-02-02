import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Task} from '../../Intertype/Typetask';
import axiosTv from "../../Api/axiosTv";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Edittask from './Edittask';
import ArchTask from './ArchTask';
import UnarchTask from './UnarchTask';
import DeleteTask from './DeleteTask';
import Newtask from './Newtask';
import SearchTask from './SearchTask';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Header=styled.div
`   display:flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    font-size:12px;
    margin-bottom:10px;
`;

const Tablebang=styled.ul
`   padding: 0;
    border-bottom:1px solid black;
    list-style-type: none;
    li{           
        width:100%;
        border-top:1px solid black;
        padding-top:5px;
        padding-bottom:5px
    }         
`;
const Cacbutton=styled.div
`   display:flex;
    justify-content: end;
`;

function Tasks(){
    
    const [comtasks, setComTasks]=useState<Task[] | null>([]);
    const [othtasks, setOthTasks]=useState<Task[] | null>([]);
    const [comlength, setComLength]=useState<number>();
    const [othlength, setOthLength]=useState<number>();
    

    const taskGetAll = async () => {          
        const res = await axiosTv.get('api/services/app/Task/GetAll');                     
        const ttasks:(Task[])=res.data.result;  
        if(ttasks){         
            const newList = ttasks.filter((Task) => (Task.type === 0));
            setComTasks(newList);
            setComLength(newList.length);                         
            const newList2 = ttasks.filter((Task) => (Task.type === 1));
            setOthTasks(newList2);
            setOthLength(newList2.length);      
        }
    };   
    useEffect(() => {             
        taskGetAll();       
    }, []);

    const [openedit, setOpenEdit] = useState(false);  
    const [index, setIndex]=useState<number>(0);
    const handleClickOpenEdit = (id: number) => {
        const index=id;
        setIndex(index);
        setOpenEdit(true);
    };

    const [openarchive, setOpenArchive] = useState(false);
    const [indexarchive, setIndexArchive]=useState<number>(0);  
    const handleClickOpenArchive = (id: number) => {        
        const index=id;
        setIndexArchive(index);
        setOpenArchive(true);
    };

    const [openunarchive, setOpenUnarchive] = useState(false);
    const [indexunarchive, setIndexUnarchive]=useState<number>(0);  
    const handleClickOpenUnarchive = (id: number) => {        
        const index=id;
        setIndexUnarchive(index);
        setOpenUnarchive(true);
    };

    const [opendelete, setOpenDelete] = useState(false);
    const [indexdelete, setIndexDelete]=useState<number>(0);  
    const handleClickOpenDelete = (id: number) => {        
        const index=id;
        setIndexDelete(index);
        setOpenDelete(true);
    };

    const refrechReload=(event: React.MouseEvent<HTMLButtonElement>)=>{   
        window.location.reload();
    }

    const nhanCom=(com: Task[])=>{
        setComTasks(com);
    }

    const nhanComLength=(com: number)=>{
        setComLength(com);
    }

    const nhanOth=(oth: Task[])=>{
        setOthTasks(oth);
    }
    const nhanOthLenght=(oth:number)=>{
        setOthLength(oth);
    }

    return(
        <div>
            <Header>
                <h1>Manage Tasks</h1>     
                <p><IconButton onClick={refrechReload}><MoreVertIcon/></IconButton></p>                        
            </Header>

            <Grid container>
                <Grid item md={3} xs={12}>
                    <Newtask
                        taskGetAll={taskGetAll}
                    />
                </Grid>
                <Grid item md={9} xs={12}>
                    <SearchTask
                        comtasks={comtasks}
                        othtasks={othtasks}               
                        taskGetAll={taskGetAll}
                        guiTasksCom={nhanCom}
                        guiTasksComLength={nhanComLength}
                        guiTasksOth={nhanOth}
                        guiTasksOthLength={ nhanOthLenght}                       
                    />
                </Grid>
            </Grid>

            <Edittask 
                openedit={openedit}
                setOpenEdit={setOpenEdit}
                setIndex={setIndex}
                index={index}
                taskGetAll={taskGetAll}
            />
            <ArchTask
                openarchive={openarchive}
                setOpenArchive={setOpenArchive}
                indexarchive={indexarchive}
                taskGetAll={taskGetAll}
                comtasks={comtasks}
                othtasks={othtasks}               
                guiTasksCom={nhanCom}
                guiTasksOth={nhanOth} 
            />
            <UnarchTask
                openunarchive={openunarchive}
                setOpenUnarchive={setOpenUnarchive}
                indexunarchive={indexunarchive}
                taskGetAll={taskGetAll}
                comtasks={comtasks}
                othtasks={othtasks}
                guiTasksCom={nhanCom}
                guiTasksOth={nhanOth}             
            />
            <DeleteTask
                opendelete={opendelete}
                setOpenDelete={setOpenDelete}
                indexdelete={indexdelete}
                setIndexDelete={setIndexDelete}
                taskGetAll={taskGetAll}
            />


            <p><b>Common Task ({comlength})</b></p>
            <p>These tasks are automatically added to all new projects</p>
            <Tablebang>
                <li><b>Name</b></li>     
                {comtasks? comtasks.map((Task) => {                         
                    return(                       
                        <li key={Task.id}>   
                            <Grid container>
                                <Grid item xs={6}>                           
                                    <Button variant="contained" onClick={()=>handleClickOpenEdit(Task.id)}>Edit</Button>                 
                                    {Task.name}                                  
                                </Grid>                              
                                <Grid item xs={6}>
                                    <Cacbutton>
                                        <Button variant="outlined" sx={{display: Task.isDeleted? 'none':'block', color: 'black', borderColor: 'gray'}} onClick={()=>handleClickOpenArchive(Task.id)}>Archive</Button>
                                        <Button variant="outlined" sx={{display: Task.isDeleted? 'block':'none', color: 'black', borderColor: 'gray'}} onClick={()=>handleClickOpenUnarchive(Task.id)}>Unarchive</Button> 
                                        <Button disabled={!Task.isDeleted} sx={{ backgroundColor: '#d9534f', color: 'black'}} onClick={()=>handleClickOpenDelete(Task.id)}>Delete</Button>                    
                                    </Cacbutton>
                                </Grid>
                            </Grid>
                        </li>
                    )
                }): null} 
            </Tablebang>

            <p><b>Other ({othlength})</b></p>     
            <p>These task must be manually added to projects</p>
            <Tablebang>
                <li><b>Name</b></li>     
                {othtasks? othtasks.map((Task) => {                         
                    return(                       
                        <li key={Task.id}>   
                            <Grid container>
                                <Grid item xs={6}>                            
                                    <Button variant="contained" onClick={()=>handleClickOpenEdit(Task.id)}>Edit</Button>                 
                                    {Task.name}                                  
                                </Grid>
                                <Grid item xs={6}>
                                    <Cacbutton>
                                        <Button variant="outlined" sx={{display: Task.isDeleted? 'none':'block', color: 'black', borderColor: 'gray'}} onClick={()=>handleClickOpenArchive(Task.id)}>Archive</Button>
                                        <Button variant="outlined" sx={{display: Task.isDeleted? 'block':'none', color: 'black', borderColor: 'gray'}} onClick={()=>handleClickOpenUnarchive(Task.id)}>Unarchive</Button> 
                                        <Button disabled={!Task.isDeleted} sx={{ backgroundColor: '#d9534f', color: 'black'}} onClick={()=>handleClickOpenDelete(Task.id)}>Delete</Button>                    
                                    </Cacbutton>
                                </Grid>
                            </Grid>
                        </li>
                    )
                }): null} 
            </Tablebang> 
        </div>
    )
}
export default Tasks;
