import * as React from 'react';
import Button from '@mui/material/Button';
import axiosTv from "../../../../../Api/axiosTv";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function Deletebutton(props: any){

    const [open, setOpen] = React.useState(false); 

    const deleteButton=()=>{
        axiosTv.delete('api/services/app/Project/Active', {
            params:{
                Id: props.id,
            }
        })         
        .then((data: any)=> {
            console.log(data);
            setOpen(false);
        })
        .catch(function (error: any) {
            console.log(error);
            setOpen(false);
        });
    }

    return(
        <div>
            <Button onClick={()=>setOpen(true)}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}>                
                <DialogContent>                                
                    <h1>Are you sure?</h1>
                    <p>Deactive project: "{props.proname}"</p>
                    <Button onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button onClick={deleteButton}>Yes</Button>           
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Deletebutton;