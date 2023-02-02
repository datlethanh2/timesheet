import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';
import {Task} from '../../Intertype/Typetask';

function SearchTask(e: any){
    const [intext, setIntext] = useState("");
    const [setaskscom, setSeTasksCom]=useState<Task[]>([]);
    const [setasksoth, setSeTasksOth]=useState<Task[]>([]);
   
    const getData=()=>{
        if(e.taskGetAll){
            setSeTasksCom(e.comtasks); 
            setSeTasksOth(e.othtasks);
        } 
    }
    const seTaskCom=(an: Task[])=>{
        e.guiTasksCom(an);
    }
    const seComLength=(an: number)=>{
        e.guiTasksComLength(an);
    }
    const seTaskOth=(an: Task[])=>{
        e.guiTasksOth(an);
    }
    const seComOth=(an: number)=>{
        e.guiTasksOthLength(an);
    }   
    const onKeyUpSearch=(e:any)=>{  
        getData();           
        if (e.key === "Enter") {           
            if(setaskscom) {         
                const newList1 = setaskscom.filter((Task: Task)=> {
                    if (e.target.value === "")
                        return setaskscom;
                    return Task.name.toLowerCase().includes(e.target.value.toLowerCase());
                })
                seTaskCom(newList1);
                seComLength(newList1.length);                      
            }
            if(setasksoth){
                const newList2 = setasksoth.filter((Task: Task) => {
                    if (e.target.value === "")
                        return setasksoth;
                    return Task.name.toLowerCase().includes(e.target.value.toLowerCase());
                })
                seTaskOth(newList2);
                seComOth(newList2.length);
            }
        }             
    }

    return(
        <div>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Search by task name</InputLabel>
                <OutlinedInput  
                    startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                    label="Search by task name"          
                    value={intext}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setIntext(event.currentTarget.value)}
                    onKeyUp={onKeyUpSearch}
                />  
            </FormControl>
        </div>
    )

}

export default SearchTask;