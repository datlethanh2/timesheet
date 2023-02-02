import {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Project}  from '../../../Intertype/Typeproject';

function Searchproject(e: any){
    
    const [intext, setIntext] = useState("");
    const [projects1, setProjects1]=useState< Project[]>([]);

    const guiProject=(an:  Project[])=>{
        e.guiProject(an);
    }

    const getData=()=>{
        if(e.projectGetAll){
            setProjects1(e.projects); 
        } 
    }

    const onKeyUpSearch=(e:any)=>{  
        getData();    
        if (e.key === "Enter") {   
            if(projects1) {         
                const newList1 = projects1.filter((Project: Project)=> {
                    if (e.target.value === "")
                        return projects1;
                    if(Project.customerName.toLowerCase().includes(e.target.value.toLowerCase())){
                        return projects1;
                    }
                    if(Project.name.toLowerCase().includes(e.target.value.toLowerCase())){
                        return projects1;
                    }
                })         
                guiProject(newList1); 
            }                               
        }
        else{
            e.projectGetAll();
        }
        
    }

    return(
        <div>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Search by client or project name</InputLabel>
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
export default Searchproject;
