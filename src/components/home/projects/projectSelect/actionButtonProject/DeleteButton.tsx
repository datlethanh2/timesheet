import * as React from 'react';
import {useAppDispatch} from "../../../../../redux/Hook";
import {projectDelete} from "../../../../../redux/action/ProjectThunk";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContent from '@mui/material/DialogContent';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Deletebutton(props: any){

    const [open, setOpen] = React.useState(false); 
    const dispatch = useAppDispatch();
    const deleteButton=async()=>{
        setOpen(false);
        await dispatch(projectDelete(props.id));
        //dispatch(props.projectGet());
    }

    return(
        <div>
            <Button onClick={()=>setOpen(true)} sx={{color: "gray"}}>
                <DeleteIcon sx={{paddingRight: "7px"}}/>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}>                
                <DialogContent sx={{textAlign:"center", width: "300px"}}>
                    <ErrorOutlineIcon sx={{color:"orange", fontSize:"100px"}}/>                                 
                    <h1>Are you sure?</h1>
                    <p>Deactive project: "{props.proname}"</p>
                    <Button variant="outlined" onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button sx={{backgroundColor: '#d9534f', color: 'white', marginLeft: "5px"}} onClick={deleteButton}>Yes</Button>           
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Deletebutton;

