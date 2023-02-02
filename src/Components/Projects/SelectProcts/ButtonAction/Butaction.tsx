import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Editbutton from './Componet/Editbutton';
import Viewbutton from './Componet/Viewbutton';
import Deletebutton from './Componet/Deletebutton';
import Deactivebutton from './Componet/Deactivebutton';
import Button from '@mui/material/Button';


function Butaction(props: any){
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [id, setId] = React.useState<number>();
    const [proname, setProName] = React.useState<string>();
    const handleClick = (ev: any, index: number, main: string) => {
        setAnchorEl(ev);
        setId(index);
        setProName(main);      
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    

    return(    
        <div>
            <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>handleClick(event.currentTarget, props.id1, props.name1)}>Action</Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{border: "none"}} 
            >
                <MenuItem>
                    <Editbutton
                        id={id}
                    />
                </MenuItem>
                <MenuItem >
                    <Viewbutton
                        id={id}
                    />
                </MenuItem>
                <MenuItem>
                    <Deactivebutton
                        id={id}
                        proname={proname}
                    />
                </MenuItem>
                <MenuItem>
                    <Deletebutton
                        id={id}
                        proname={proname}
                    />
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Butaction;