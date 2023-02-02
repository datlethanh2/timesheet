import { useState} from 'react';
import {useAppDispatch,useAppSelector} from "../../../../../redux/Hook";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Diagproject from './DiagProject';

function Newproject(props: any){

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const handleClickOpen = () => {
        setOpen(true);
        // dispatch(customerGet()); 
        // dispatch(taskGet()); 
    };
    let color= useAppSelector((state) => state.authen.color);

    return(
        <div style={{marginBottom:"10px", paddingTop: "10px"}}>
            <Button sx={{ backgroundColor: color, color: 'white', padding: "10px"}}  onClick={handleClickOpen} startIcon={<AddIcon/>}>
                New Project
            </Button>
            <Diagproject
                open={open}
                setOpen={setOpen}
                projectGet={props.projectGet}
            />
        </div>
    )
}

export default Newproject;