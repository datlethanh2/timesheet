import * as React from 'react';
import Viewbutton  from "./ViewButton";
import Deactivebutton  from "./DeactiveButton";
import Activebutton from "./ActiveButton";
import Deletebutton  from "./DeleteButton";
import Editbutton1 from "./EditButton1";
import {useAppDispatch} from "../../../../../redux/Hook";
import {setProjectId} from "../../../../../redux/readucer/ProjectSlice";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Butaction(props: any){
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [id, setId] = React.useState<number>(0);
    const [proname, setProName] = React.useState<string>();
    const dispatch = useAppDispatch();
    const handleClick = (ev: any, index: number, main: string) => {
        setAnchorEl(ev);
        setId(index);
        setProName(main); 
        dispatch(setProjectId(index));
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(    
        <>
            <Button 
                sx={{color: "black", borderColor: "black", float: "right"}}
                variant="outlined"
                onClick={(event: React.MouseEvent<HTMLButtonElement>)=>handleClick(event.currentTarget, props.id1, props.name1)}
                endIcon={<ArrowDropDownIcon />}
                >Action
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{border: "none"}} 
            >
                <MenuItem>
                    <Editbutton1
                        id={id}
                        projectGet={props.projectGet}
                       //proname={proname}
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
                        select={props.select}
                    />
                    <Activebutton
                        id={id}
                        proname={proname}
                        select={props.select}
                    />
                </MenuItem>
                <MenuItem>
                    <Deletebutton
                        id={id}
                        proname={proname}
                        projectGet={props.projectGet}
                    />
                </MenuItem>
            </Menu>
        </>
    )
}

export default Butaction;