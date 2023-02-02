import React from 'react';
import {useAppDispatch} from "../../../../redux/Hook";
import {setNameSearch} from "../../../../redux/readucer/TaskSlice";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function Searchtask(props: any){

    const [intext, setIntext] = React.useState("");
    const dispatch = useAppDispatch();
    const onKeyUpSearch =(e: any)=>{
        if (e.key === "Enter"){     
            dispatch(setNameSearch(intext));
        }     
    }

    return(
        <div>
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
    )
}

export default Searchtask;