import { useState} from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Diagproject from './Component/Diagproject';

function Newproject(){

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    return(
        <div>
            <Button sx={{ backgroundColor: '#d9534f', color: 'white'}}  onClick={handleClickOpen} startIcon={<AddIcon/>}>
                New Project
            </Button>
            <Diagproject
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}

export default Newproject;