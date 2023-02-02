import axiosTv from '../../../../Api/axiosTv';
import { useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {CustomerClient, NewClient} from "../../../../Intertype/Typeproject";



function Newclient(props: any){

    const [projects, setProjects]=useState< CustomerClient[]>([]);
    const projectGetAll = async () => {          
        const res = await axiosTv.get('api/services/app/Customer/GetAll');                     
        setProjects(res.data.result);            
    }; 
    useEffect(() => {             
        projectGetAll();       
    }, []);


    const [intext, setIntext]=useState<string>("1");

    const [open, setOpen] = useState(false);
    const {register, setValue, handleSubmit, watch} = useForm<NewClient>(); 

    const saveNew= async(data:NewClient)=>{
        axiosTv({
            method: 'post',
            url: 'api/services/app/Customer/Save',
            data:{
                name: data.name,
                code: data.code,                
                address: data.address,
                id: 0,
            }
            })           
            .then((data)=> {
                setOpen(false); 
                projectGetAll(); 
            })
            .catch(function (error) {
                setOpen(true);                
            });
    };

    const guiText=(id: string)=>{
        props.guiText(id);
    }
    guiText(intext);

    return(
        <div>
            <p><b>Client*</b></p>
            <TextField
                fullWidth
                select
                value={intext}
                onChange={((event: React.ChangeEvent<HTMLInputElement>)=>setIntext(event.target.value))}
                SelectProps={{
                    native: true,
                }}                                     
                >
                {projects.map((CustomerClient) => (
                    <option key={CustomerClient.id} value={CustomerClient.id}>
                        {CustomerClient.name}
                    </option>
                ))}
            </TextField>

            <p></p>

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

export default Newclient;