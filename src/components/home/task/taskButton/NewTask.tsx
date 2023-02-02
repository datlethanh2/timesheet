import React from 'react';
import { useState} from 'react';
import {TaskNew} from "../../../../interface/InterfaceTask";
import {newTaskPost} from '../../../../redux/action/TaskThunk';
import {useAppDispatch,useAppSelector} from "../../../../redux/Hook";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

function Newtask(props: any){

    const [open, setOpen] = useState(false);
    const [taskstype, setTaskstype] = useState('0');
    const {register, handleSubmit, reset, watch} = useForm<TaskNew>();
    const dispatch = useAppDispatch();
    const TasksTypes = [
        {
          value: '0',
          label: 'Common Task',
        },
        {
          value: '1',
          label: 'Other Task',
        },       
    ];

    const newTask=async(data:TaskNew)=>{
        const payload={
            name: data.name,
            type: data.type,
            id: 0,
            isDelete: false,
        };       
        //console.log(data.type);
        dispatch(newTaskPost(payload));
        setOpen(false);
        //dispatch(props.taskGet());
        reset({
            name:"",
            type:0,
        });
    }
    const closeCancel=()=>{
        setOpen(false);
        reset({
            name:"",
            type:0,
        });
    }
    let color= useAppSelector((state) => state.authen.color);

    return(
        <div>
            <Button sx={{ backgroundColor: color, color: 'white'}}  onClick={()=> setOpen(true)} startIcon={<AddIcon/>}>
                New tasks
            </Button>            
            <Dialog
                open={open}
                onClose={closeCancel}           
            >                
                <DialogContent>  
                    <h2>New Task</h2>                
                    <TextField 
                        fullWidth 
                        id="name"
                        label="Name*" 
                        variant="standard"
                        sx={{marginBottom: "15px"}}
                        color={watch("name")===""? "error": "primary"} 
                        {...register("name", { required: true })} 
                    />                                 
                    <TextField
                        fullWidth
                        select
                        label="Task Type"
                        variant="standard"
                        value={taskstype}
                        {...register("type")}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setTaskstype(event.target.value)}
                                               
                        >
                        {TasksTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>  
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={closeCancel}>Cancel</Button>
                    <Button sx={{backgroundColor: '#d9534f', color: 'white', marginLeft: "5px"}} onClick={handleSubmit(newTask)} autoFocus>Save</Button>         
                </DialogActions>   
            </Dialog>
        </div>
    )
}

export default Newtask;