import { useState} from 'react';
import {NewClient} from "../../../../../../interface/InterfaceProject";
import {useAppDispatch} from "../../../../../../redux/Hook";
import {newClientPost} from "../../../../../../redux/action/ProjectThunk";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function Editclient(props: any){
    
    const [open, setOpen] = useState(false);
    const {register, handleSubmit, watch} = useForm<NewClient>(); 
    const dispatch = useAppDispatch();
    const saveNew= async(data:NewClient)=>{
        const payload={
            name: data.name,
            code: data.code,                
            address: data.address,
            id: 0,
        }
        dispatch(newClientPost(payload));
        setOpen(false); 
    };

    return(
        <div>
            <Button onClick={()=>setOpen(true)} sx={{ backgroundColor: '#d9534f', color: 'white'}} startIcon={<AddIcon/>}>
                New Client
            </Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}           
            >                
                <DialogContent>                  
                    <h1>New Client</h1> 
                    <p></p>
                    <TextField 
                        fullWidth 
                        variant="standard" 
                        label="Name*" 
                        {...register("name", { required: true })} 
                    /> 
                    <TextField 
                        fullWidth 
                        variant="standard" 
                        label="Code*" 
                        {...register("code", { required: true })} 
                    /> 
                    <TextField 
                        fullWidth
                        variant="standard"  
                        label="Address" 
                        {...register("address", { required: true })} 
                    /> 

                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit(saveNew)} autoFocus>Save</Button>         
                </DialogActions>   
            </Dialog>
            <p></p>
        </div>
    )
}

export default Editclient;