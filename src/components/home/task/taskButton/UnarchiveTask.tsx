import { useState} from 'react';
import {useAppDispatch} from "../../../../redux/Hook";
import {unarchivePost} from '../../../../redux/action/TaskThunk';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Unarchivetask(props: any){

    const [open, setOpen] = useState(false);
    const [id1, setId1] = useState<number>(0);
    const [name1, setName1] = useState<string>("");
    const handleOpen=(index: number, main: string)=>{
        setOpen(true);
        setId1(index);
        setName1(main);  
    }
    
    const dispatch = useAppDispatch()
    //const accessToken = useAppSelector((state) => state.authen.accessToken);

    const unarchiveTask=async()=>{
        setOpen(false);
        dispatch(unarchivePost(id1)); 
        // dispatch(props.taskGet());
        // console.log(dispatch(props.taskGet()));    
    }

    return(
        <div>
            <Button sx={{display: props.isDeleted? 'block':'none', color: 'black', borderColor: 'gray'}} variant="outlined" onClick={()=>handleOpen(props.id, props.name)}>Unarchive</Button> 
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}           
            >                
                <DialogContent sx={{textAlign:"center", width: "300px"}}>  
                    <ErrorOutlineIcon sx={{color:"orange", fontSize:"100px"}}/>
                    <h1>Are you sure?</h1>
                    <p>Archive task: {name1}</p>
                    <Button variant="outlined" onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button sx={{backgroundColor: '#d9534f', color: 'white', marginLeft: "5px"}} onClick={unarchiveTask} autoFocus>Save</Button>            
                </DialogContent>                  
            </Dialog>                
        </div>
    )
}

export default Unarchivetask;