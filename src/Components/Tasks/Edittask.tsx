import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import { useForm } from "react-hook-form";
import axiosTv from "../../Api/axiosTv";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tasks from './Tasks';
import {TasksTypes, TaskEdit} from "../../Intertype/Typetask"


function Edittask(e: any){

    const handleCloseEdit = () => {
        e.setOpenEdit(false);
    };
    const {register, handleSubmit} = useForm<TaskEdit>();
    const [taskstype, setTaskstype] = useState('0');
    const taskEdit= async(data:TaskEdit)=>{   
        axiosTv.post('api/services/app/Task/Save', {
            name: data.name,
            type: data.type,
            id: e.index,
        })         
        .then((data)=> {
            e.setOpenEdit(false);
            e.taskGetAll(); 
            console.log(e.comtasks)         
        })
        .catch(function (error) {
            e.setOpenEdit(false);        
        });
    }

    return(
        <div>
           
            <Dialog
                open={e.openedit}
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
        </div>
    )
}
export default Edittask;