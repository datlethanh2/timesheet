import React from 'react';
import {quanTiTyGet,projectGet,customerGet} from "../../../../redux/action/ProjectThunk";
import {useAppDispatch, useAppSelector} from "../../../../redux/Hook"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Viewproject from "./ViewProject";
import Newproject from "./newButton/NewProject";
import {taskGet} from "../../../../redux/action/TaskThunk";
import IconButton from '@mui/material/IconButton';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


function Selectroject(){

    const [select, setSelect] = React.useState('0');
    let actprojects= useAppSelector((state) => state.projects.actprojects);
    let deprojects= useAppSelector((state) => state.projects.deprojects);

    const selectproject = [
        {
          value: '0',
          label: 'Active Projects ('+String(actprojects) +')',
        },
        {
          value: '1',
          label: 'Deactive Projects ('+String(deprojects) +')',
        },
        {
          value: '2',
          label: 'All Projects ('+String(deprojects+actprojects) +')',
        },
    ]; 
    const [intext, setIntext] = React.useState("");
    const [search, setSearch] = React.useState("");
    const onKeyUpSearch =(e: any)=>{
        if (e.key === "Enter"){ 
            setSearch(intext);
        }
    }
    const dispatch = useAppDispatch();  
    React.useEffect(() => {   
        async function foo(){
            await dispatch(projectGet({status:select==='2'? null : Number(select), search: search}))
        } 
        foo();           
    }, [select,dispatch, search]);

    React.useEffect(() => {  
        dispatch(quanTiTyGet());  
        dispatch(taskGet()); 
        dispatch(customerGet());
    }, [dispatch]);

    const refrechReload=(event: React.MouseEvent<HTMLButtonElement>)=>{   
        window.location.reload();
    }

    return(
        <div>
            <div style={{display: "flex",justifyContent: "space-between", borderBottom:"1px solid #80808029"}}>
                <h2>Manage Projects</h2>     
                <p><IconButton onClick={refrechReload}><RefreshOutlinedIcon /></IconButton></p>                        
            </div>
            <Grid container>
                <Grid item lg={3} sm={12} xs={12} sx={{marginTop: "14px",paddingLeft: "6px"}}>
                    <Newproject 
                        projectGet={projectGet}
                    />
                </Grid>
                <Grid item lg={3} sm={12} xs={12} sx={{marginTop: "17px",paddingLeft: "6px"}}>
                    <TextField
                        fullWidth
                        select             
                        value={select}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setSelect(event.target.value)}
                    >
                        {selectproject.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item lg={6} sm={12} xs={12} sx={{paddingRight: "5px",marginTop: "10px"}}>
                    <div style={{paddingBottom: "25px"}}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel>Search name</InputLabel>
                            <OutlinedInput  
                                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                                label="Search by name"          
                                value={intext}
                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setIntext(event.currentTarget.value)}
                                onKeyUp={onKeyUpSearch}
                            />  
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
            <Viewproject
                select={select}
                projectGet={projectGet}
            />          
        </div>
    )
}

export default Selectroject;