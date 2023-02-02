import styled from 'styled-components';
import axiosTv from "../../Api/axiosTv";
import {useEffect, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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

export type Task= {
  name: string;
  type: number;
  isDeleted: boolean;
  id: number;
};
export type TaskEdit= {
    name: string;
    type: number;
    id: number;   
};
export const TasksTypes = [
    {
      value: '0',
      label: 'Common Task',
    },
    {
      value: '1',
      label: 'Other Task',
    },       
];

function Tasks(){

    const [comtasks, setComTasks]=useState<Task[] | null>();
    const [othtasks, setOthTasks]=useState<Task[] | null>();
    const [comlength, setComLength]=useState<number>();
    const [othlength, setOthLength]=useState<number>();

    const getData = async () => {          
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
        getData();
    }, []);

    const [intext, setIntext] = useState("");
    const onKeyUpSearch=(e: any)=>{           
        if (e.key === "Enter") {           
            if(comtasks) {               
                const newList1 = comtasks.filter((Task) => {
                    if (e.target.value === "")
                        return comtasks;
                    return Task.name.toLowerCase().includes(e.target.value.toLowerCase());
                });
                setComTasks(newList1);
                setComLength(newList1.length);
            } 
            if(othtasks) {
                const newList2 = othtasks.filter((Task) => {
                    if (e.target.value === "")
                        return othtasks;
                    return Task.name.toLowerCase().includes(e.target.value.toLowerCase());
                });
                setOthTasks(newList2);
                setOthLength(newList2.length);
            }            
        }else{
            getData();
        }            
    }
   
    const refrechReload=(event: React.MouseEvent<HTMLButtonElement>)=>{   
        window.location.reload();
    }
  
    const [openedit, setOpenEdit] = useState(false);  
    const [index, setIndex]=useState<number>(0);
    const handleClickOpenEdit = (id: number) => {
        const index=id;
        setIndex(index);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const {register, handleSubmit} = useForm<TaskEdit>();
    const [taskstype, setTaskstype] = useState('0');
    const taskEdit= async(data:TaskEdit)=>{   
        axiosTv.post('api/services/app/Task/Save', {
            name: data.name,
            type: data.type,
            id: index,
        })         
        .then((data)=> {
            setOpenEdit(false);
            getData();
        })
        .catch(function (error) {
            setOpenEdit(false);        
        });
    }

    const [openarchive, setOpenArchive] = useState(false);
    const [indexarchive, setIndexArchive]=useState<number>(0);  
    const handleClickOpenArchive = (id: number) => {        
        const index=id;
        setIndexArchive(index);
        setOpenArchive(true);
    };
    const handleCloseArchive = () => {
        setOpenArchive(false);
    };
    const taskArchive=(event: React.MouseEvent<HTMLButtonElement>)=>{   
        axiosTv.delete('api/services/app/Task/Archive', {
            params:{
                Id:indexarchive,
            }
        })         
        .then((data)=> {
            setOpenArchive(false);
        })
        .catch(function (error) {
            setOpenArchive(false);     
        });
        if(comtasks){
            const innews1=comtasks.map((Task) => {
                if(Task.id === indexarchive){
                    return {...Task, isDeleted: true};                   
                } else{
                    return Task;
                }
            })
            setComTasks(innews1);
        }
        if(othtasks){
            const innews2=othtasks.map((Task) => {
                if(Task.id === indexarchive){
                    return {...Task, isDeleted: true};                   
                } else{
                    return Task;
                }
            })
            setOthTasks(innews2);
        }
    }

    const [openunarchive, setOpenUnarchive] = useState(false);
    const [indexunarchive, setIndexUnarchive]=useState<number>(0);  
    const handleClickOpenUnarchive = (id: number) => {        
        const index=id;
        setIndexUnarchive(index);
        setOpenUnarchive(true);
    };
    const handleCloseUnarchive = () => {
        setOpenUnarchive(false);
    };
    const taskUnarchive=(event: React.MouseEvent<HTMLButtonElement>)=>{   
        axiosTv.post('api/services/app/Task/DeArchive', {
            id: indexunarchive,
        })         
        .then((data)=> {
            console.log(data);
            setOpenUnarchive(false); 
            getData();
        })
        .catch(function (error) {
            setOpenUnarchive(false);        
        });
        if(comtasks){
            const innews1=comtasks.map((Task) => {
                if(Task.id === indexarchive){
                    return {...Task, isDeleted: false};                   
                } else{
                    return Task;
                }
            })
            setComTasks(innews1);
        }
        if(othtasks){
            const innews2=othtasks.map((Task) => {
                if(Task.id === indexarchive){
                    return {...Task, isDeleted: false};                   
                } else{
                    return Task;
                }
            })
            setOthTasks(innews2);
        }
    }

    const [opendelete, setOpenDelete] = useState(false);
    const [indexdelete, setIndexDelete]=useState<number>(0);  
    const handleClickOpenDelete = (id: number) => {        
        const index=id;
        setIndexDelete(index);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const taskDelete=(event: React.MouseEvent<HTMLButtonElement>)=>{   
        axiosTv.delete('api/services/app/Task/Delete', {
            params:{
                Id:indexdelete,
            }
        })         
        .then((data)=> {
            console.log(data);
            setOpenDelete(false);
            getData();
        })
        .catch(function (error) {
            setOpenDelete(false);        
        });
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const newTask= async(data:TaskEdit)=>{       
        axiosTv.post('api/services/app/Task/Save', {
            name: data.name,
            type: data.type,
            id: data.id,
        })         
        .then((data)=> {
            setOpen(false);
            getData();
        })
        .catch(function (error) {
            setOpen(false);        
        });
    } 

    return (    
        <div>   
            <Dialog
                open={openedit}
                onClose={handleCloseEdit}>                
                <DialogContent>                  
                    <TextField 
                        fullWidth 
                        id="name"
                        label="Name*" 
                        variant="standard" 
                        {...register("name", { required: true })} />                                 
                    <TextField
                        id="type"
                        fullWidth
                        select
                        label="Task Type"
                        variant="standard"
                        value={taskstype}
                        {...register("type")}>
                        {TasksTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleSubmit(taskEdit)} autoFocus>Save</Button>         
                </DialogActions>   
            </Dialog>
            <Dialog
                open={openarchive}
                onClose={handleCloseArchive}>                
                <DialogContent>                                
                    <h1>Are you sure?</h1>
                    <Button onClick={handleCloseArchive}>Cancel</Button>
                    <Button onClick={taskArchive}>Yes</Button>           
                </DialogContent>
            </Dialog>
            <Dialog
                open={openunarchive}
                onClose={handleCloseUnarchive}>                
                <DialogContent>                                
                    <h1>Are you sure?</h1>
                    <Button onClick={handleCloseUnarchive}>Cancel</Button>
                    <Button onClick={taskUnarchive}>Yes</Button>           
                </DialogContent>
            </Dialog>
            <Dialog
                open={opendelete}
                onClose={handleCloseDelete}>                
                <DialogContent>                                
                    <h1>Are you sure?</h1>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={taskDelete}>Yes</Button>           
                </DialogContent>
            </Dialog>

            <Header>
                <h1>Manage Tasks</h1>     
                <p><IconButton onClick={refrechReload}><MoreVertIcon/></IconButton></p>                        
            </Header>

            <Grid container>
                <Grid item md={3} xs={12}>
                    <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon/>}>
                        New tasks
                    </Button>            
                    <Dialog
                        open={open}
                        onClose={handleClose}           
                    >                
                        <DialogContent>                  
                            <TextField 
                                fullWidth 
                                id="name"
                                label="Name*" 
                                variant="standard" 
                                {...register("name", { required: true })} 
                            />                                 
                            <TextField
                                id="type"
                                fullWidth
                                select
                                label="Task Type"
                                variant="standard"
                                value={taskstype}
                                {...register("type")}                        
                                >
                                {TasksTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>  
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit(newTask)} autoFocus>Save</Button>         
                        </DialogActions>   
                    </Dialog>
                </Grid>
                <Grid item md={9} xs={12}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel>Search by task name</InputLabel>
                        <OutlinedInput  
                                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                                label="Search by task name"          
                                value={intext}
                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setIntext(event.currentTarget.value)}
                                onKeyUp={onKeyUpSearch}
                        />  
                    </FormControl>
                </Grid>
            </Grid>

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
    );
}
export default Tasks;