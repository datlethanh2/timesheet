import { useState} from 'react';
import { useForm } from "react-hook-form";
import {TaskNew} from "../../../../interface/InterfaceTask";
import {useAppDispatch} from "../../../../redux/Hook";
import {newTaskPost} from '../../../../redux/action/TaskThunk';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function Edittask(props: any){

    const [open, setOpen] = useState(false);
    const [taskstype, setTaskstype] = useState('0');
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
    const [id1, setId1] = useState<number>(0);
    const [name1, setName1] = useState<string>("");
    const handleOpen=(index: number, main: string, ind: number )=>{
        setOpen(true);
        setId1(index);
        setName1(main);
        setTaskstype(String(ind));       
    }
    
    const {register, handleSubmit, watch} = useForm<TaskNew>({
        defaultValues:{
            name: name1,
            type:Number(taskstype),
        }
    });

    const dispatch = useAppDispatch();
    const editTask=async(data:TaskNew)=>{
        const payload={
            name: data.name,
            type: data.type,
            id: id1,
        }
        dispatch(newTaskPost(payload));
        setOpen(false);
    }

    return(
        <div>
            <Button variant="contained" onClick={()=>handleOpen(props.id, props.name, props.type)}>Edit</Button> 
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}           
            >                
                <DialogContent>  
                    <p style={{fontSize:"20px"}}><b>Edit Task: {name1}</b></p>                
                    <TextField 
                        fullWidth 
                        label="Name*" 
                        variant="standard"
                        sx={{marginBottom: "15px"}}
                        value={name1} 
                        color={watch("name")===""? "error": "primary"}                        
                        {...register("name")} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName1(e.target.value)}
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
                    <Button variant="outlined" onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button sx={{backgroundColor: '#d9534f', color: 'white', marginLeft: "5px"}} onClick={handleSubmit(editTask)} autoFocus>Save</Button>         
                </DialogActions>   
            </Dialog>                
        </div>
    )
}

export default Edittask;