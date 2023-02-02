import * as React from 'react';
import axiosTv from "../../../../../Api/axiosTv";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function Deactivebutton(props: any){

    const [open, setOpen] = React.useState(false); 

    const deactiveButton=()=>{
        axiosTv.post('api/services/app/Project/Active', {
            id: props.id,
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
                Deactive
            </Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}>                
                <DialogContent>                                
                    <h1>Are you sure?</h1>
                    <p>Deactive project: "{props.proname}"</p>
                    <Button onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button onClick={deactiveButton}>Yes</Button>           
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Deactivebutton;