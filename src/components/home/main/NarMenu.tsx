import React from 'react';
import {useAppSelector} from "../../../redux/Hook";
import nenusser from '../../../images/nenusser.jpg';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import InputIcon from '@mui/icons-material/Input';
import HomeIcon from '@mui/icons-material/Home';
import AlarmIcon from '@mui/icons-material/Alarm';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import OutletIcon from '@mui/icons-material/Outlet';

const Menucot1=styled.div
`   height:560px;
    border: 1px solid #80808029;
    margin-top:75px;
    position: fixed;
    width: 303px;
`;

const Menuheader=styled.div
`   background-image: url(${nenusser}); 
    height:75px;
    background-size: 100%100%;
    padding-top:15px;
    padding-left:10px;
    div{ 
        padding-top: 3px;    
        p{
            font-size: 14px;
            margin: 0;
        }
    }
`;

const Menuheader1=styled.div
`   display: flex;
    color: white;
    img{
        width:60px;
        height: 60px;
        border-radius:50%;
        margin-right:10px;       
    }
`;

const Menubody=styled.div
`   height: 340px;
    overflow-y: scroll;
    :: -webkit-scrollbar {
        width: 5px;
    }; 
    ::-webkit-scrollbar-thumb {
        background: #888; 
    };
    
    ul{
        list-style-type: none;
        margin:0;
        padding:7px;
        li{
            padding-top: 8px;
        }
    } 
`;

const Menufoot=styled.div
`    
    height: 84px;
    padding-top: 8px;
    padding-left: 10px;  
    font-size: 15px;
    border-top: 1px solid #80808029;
    p{
        color:black;
    }
`;

function Narmenu() {

    const [anchorEl, setAnchorEl] =React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutLogin=()=>{
        localStorage.setItem('accessToken',  "");
        localStorage.setItem('id',  "");
        window.location.reload();
    }
    let name= useAppSelector((state) => state.projects.name);
    let email = useAppSelector((state) => state.projects.email); 
    let img = useAppSelector((state) => state.projects.img); 
    const [color, setColor]=React.useState<string>("");
    let color1= useAppSelector((state) => state.authen.color);

    return (
      <Menucot1>
            <Menuheader>
                <Menuheader1>
                    <img src={img} alt="user"/>
                    <div style={{display:"flex", padding: 0, margin: 0}}>
                        <div style={{paddingTop: "10px"}}>
                            <p>{name}</p>
                            <p>{email}</p>
                        </div>     
                        <IconButton onClick={handleClick} sx={{ marginTop: "35px"}}>
                            <KeyboardArrowDownIcon sx={{ fontSize: 25, color: "white"}}/>
                        </IconButton>
                    </div>
                </Menuheader1>         
                <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleClose}>
                            <Button onClick={logoutLogin} startIcon={< InputIcon/>} sx={{ fontSize: 16 , color: "black" }}>
                                <b>Logout</b>
                            </Button>
                        </MenuItem>
                </Menu>     
            </Menuheader>
            <Menubody>
                <ul>
                    <li>
                        <Button startIcon={< HomeIcon sx={{color: "gray"}} />} sx={{ fontSize: 14 , color: "gray" }}>
                           Home page
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={< OutletIcon sx={{color: "gray"}} />} sx={{ fontSize: 14 , color: "gray" }}>
                            Admin
                        </Button>
                    </li>
                    <li>
                        <Button 
                            startIcon={< ImportContactsIcon sx={{fontSize: 14}}/>} 
                            sx={{ fontSize: 14 , color: (color==="tasks")? color1:"#000000b0" }}
                            component={Link} to="Tasks"
                            onClick={()=>setColor("tasks")}
                        >
                            <b>Tasks</b>
                        </Button>
                    </li>
                    <li>         
                        <Button startIcon={< AssessmentIcon sx={{fontSize: 14}}/>} 
                                sx={{ fontSize: 14 , color: (color==="projects")? color1:"#000000b0"}}
                                component={Link} to="Projects"
                                onClick={()=>setColor("projects")}
                        >
                            <b>Projects</b>
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={< AlarmIcon sx={{color: "gray"}}/>} sx={{ fontSize: 13 , color: "gray" }}>
                           My timesheets
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={< DateRangeIcon sx={{color: "gray"}}/>} sx={{ fontSize: 13 , color: "gray" }}>
                           Timesheet
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={< SupervisedUserCircleRoundedIcon sx={{color: "gray"}}/>} sx={{ fontSize: 13 , color: "gray"}}>
                           Timesheets monitoring
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={< EventBusyIcon sx={{color: "gray"}}/>} sx={{ fontSize: 13 , color: "gray" }}>
                           My leave days / onsite
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={< DateRangeIcon sx={{color: "gray"}}/>} sx={{ fontSize: 13 , color: "gray" }}>
                           Setting off days
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={< DateRangeIcon sx={{color: "gray"}}/>} sx={{ fontSize: 13 , color: "gray" }}>
                           Overtime settings
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={< DateRangeIcon sx={{color: "gray"}}/>} sx={{ fontSize: 13 , color: "gray" }}>
                           My working time
                        </Button>
                    </li>
                </ul>  
            </Menubody>
            <Menufoot>
                <p>© 2022 <b style={{color:color1}}>Timesheet</b>.
                <br></br><b >Version</b> 4.3.0.0 [20221606]</p>
            </Menufoot>
        </Menucot1>
    );
  }
  
  export default Narmenu;