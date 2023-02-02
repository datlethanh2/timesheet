import * as React from 'react';
import {useAppDispatch} from "../../../../../redux/Hook";
import {activePost} from "../../../../../redux/action/ProjectThunk";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DoneIcon from '@mui/icons-material/Done';
import DialogContent from '@mui/material/DialogContent';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Activebutton(props: any){

    const [open, setOpen] = React.useState(false); 
    const dispatch = useAppDispatch();
    const activeButton=()=>{
        dispatch(activePost(props.id));
        // dispatch(props.taskGet());
        //console.log( dispatch(deactivePost(props.id)));
        setOpen(false);
    }

    return(
        <div style={{display: (props.select!=='0')?"block": "none"}}>
            <Button onClick={()=>setOpen(true)} sx={{color: "gray"}}><DoneIcon sx={{paddingRight: "7px"}}/>Active</Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}>                
                <DialogContent sx={{textAlign:"center", width: "300px"}}>  
                    <ErrorOutlineIcon sx={{color:"orange", fontSize:"100px"}}/>                                                               
                    <h1>Are you sure?</h1>
                    <p>Deactive project: "{props.proname}"</p>
                    <Button variant="outlined" onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button sx={{backgroundColor: '#d9534f', color: 'white', marginLeft: "5px"}} onClick={activeButton}>Yes</Button>           
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Activebutton;