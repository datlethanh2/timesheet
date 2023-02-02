import { useState} from 'react';
import {useAppDispatch} from "../../../../redux/Hook";
import {taskDelete} from '../../../../redux/action/TaskThunk';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Deletetask(props: any){

    const [open, setOpen] = useState(false);
    const [id1, setId1] = useState<number>(0);
    const [name1, setName1] = useState<string>("");
    const handleOpen=(index: number, main: string)=>{
        setOpen(true);
        setId1(index);
        setName1(main);  
    }
    
    const dispatch = useAppDispatch()
    const deleteTask=async()=>{
        dispatch(taskDelete(id1));
        setOpen(false);
        // dispatch(props.taskGet());
        // console.log(dispatch(props.taskGet()));
    }

    return(
        <div>
            <Button disabled={!props.isDeleted} variant="contained" sx={{marginLeft: "5px"}} onClick={()=>handleOpen(props.id, props.name)}>Delete</Button> 
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}           
            >                
                <DialogContent sx={{textAlign:"center", width: "300px"}}>
                    <ErrorOutlineIcon sx={{color:"orange", fontSize:"100px"}}/>  
                    <h1>Are you sure?</h1>
                    <p>Delete task: {name1}</p>
                    <Button variant="outlined" onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button sx={{backgroundColor: '#d9534f', color: 'white', marginLeft: "5px"}} onClick={deleteTask} autoFocus>Save</Button>         
                </DialogContent>
            </Dialog>                
        </div>
    )
}

export default Deletetask;