import * as React from 'react';
import {useAppDispatch} from "../../../../../redux/Hook";
import {deactivePost} from "../../../../../redux/action/ProjectThunk";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import DialogContent from '@mui/material/DialogContent';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Deactivebutton(props: any){

    const [open, setOpen] = React.useState(false); 
    const dispatch = useAppDispatch();
    const deactiveButton=()=>{
         dispatch(deactivePost(props.id));
        // dispatch(props.taskGet());
        //console.log( dispatch(deactivePost(props.id)));
        setOpen(false);
    }

    return(
        <div style={{display: (props.select==='0')?"block": "none"}}>
            <Button onClick={()=>setOpen(true)} sx={{color: "gray"}}><ClearIcon sx={{paddingRight: "7px"}}/>Deactive</Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}>                
                <DialogContent sx={{textAlign:"center", width: "300px"}}>   
                    <ErrorOutlineIcon sx={{color:"orange", fontSize:"100px"}}/>                             
                    <h1>Are you sure?</h1>
                    <p>Deactive project: "{props.proname}"</p>
                    <Button variant="outlined" onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button sx={{backgroundColor: '#d9534f', color: 'white', marginLeft: "5px"}} onClick={deactiveButton}>Yes</Button>           
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Deactivebutton;

