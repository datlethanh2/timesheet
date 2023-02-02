import * as React from 'react';
import Editbut  from "./editButton/EditDig";
import {useAppDispatch, useAppSelector} from "../../../../../redux/Hook";
import {editGet} from "../../../../../redux/action/ProjectThunk";
import {setTaskView, setTeamView} from "../../../../../redux/readucer/ProjectSlice";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';


function Editbutton1(props: any){
    
    const [open, setOpen] = React.useState(false);
    const edit: any= useAppSelector((state) => state.projects.edit); 
    const dispatch = useAppDispatch();
    const openEdit=async()=>{
        setOpen(true);
        await dispatch(editGet(props.id));
    }
    React.useEffect(() => {      
        dispatch(setTeamView(edit)); 
        dispatch(setTaskView(edit));                     
     }, [dispatch, edit]);
    

    return(
        <div>
            <Button onClick={openEdit} sx={{color: "gray"}} ><EditIcon sx={{paddingRight: "7px"}}/>  Edit</Button>    
            <Editbut
                open={open}
                setOpen={setOpen}
                id={props.id}
                projectGet={props.projectGet}
                //edit1={edit1}
            />
          
        </div>
    )
}

export default Editbutton1;