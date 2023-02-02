import axiosTv from "../../Api/axiosTv";
import { useState} from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import {TaskNew, taskstypes} from "../../Intertype/Typetask";


function Newtask(e: any){
    
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [taskstype, setTaskstype] = useState('0');
    const {register, handleSubmit} = useForm<TaskNew>(); 
    const newTask= async(data:TaskNew)=>{       
        axiosTv.post('api/services/app/Task/Save', {
            name: data.name,
            type: data.type,
            id: data.id,
        })         
        .then((data)=> {
            console.log(data);
            setOpen(false);
            e.taskGetAll();
        })
        .catch(function (error) {
            setOpen(false);        
        });
    }   

    return(
        <div>
            <Button sx={{ backgroundColor: '#d9534f', color: 'white'}}  onClick={handleClickOpen} startIcon={<AddIcon/>}>
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
                        {taskstypes.map((option) => (
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
        </div>
    )
}
export default Newtask;