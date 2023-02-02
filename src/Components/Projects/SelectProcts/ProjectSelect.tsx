import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Viewproject from './Viewproject';
import Searchproject from './Searchproject';
import axiosTv from '../../../Api/axiosTv';
import {Project, currencies} from "../../../Intertype/Typeproject";

function ProjectSelect() {

    const [currency, setCurrency] = useState('acpro');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    const [projects, setProjects]=useState< Project[]>([]);
    const projectGetAll = async () => {          
        const res = await axiosTv.get('api/services/app/Project/GetAll');                     
        setProjects(res.data.result);            
    }; 
    useEffect(() => {             
        projectGetAll();       
    }, []);

    const nhanProject=(an: Project[])=>{
      setProjects(an);
    };
    
    return (
      <div>
          <TextField
              select 
              fullWidth            
              value={currency}
              onChange={handleChange}
        >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Searchproject
              projects={projects}
              guiProject={nhanProject}
              projectGetAll={projectGetAll}
          />          
          <Viewproject
              currency={currency}
              projects={projects}
          />
      </div>
    );
  }
  
  export default ProjectSelect;