import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

import nenusser from '../../../images/nenusser.jpg';
import imgueser from '../../../images/imgueser.jpg';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import InputIcon from '@mui/icons-material/Input';

const Menucot1=styled.div
`   height:560px;
    border: 1px solid gray;
    width:100%;
`;

const Menu1=styled.div
`   background-image: url(${nenusser}); 
    height:110px;
    background-size: 100%100%;
    padding-top:15px;
    padding-left:10px;
    button{
        
    }
`;

const Menu11=styled.div
`   display: flex;
    color: white;
    img{
        width:70px;
        height: 70px;
        border-radius:50%;
        margin-right:10px;
        -moz-border-radius:50%;
        -webkit-border-radius:50%;
    }
`;

const Menu12=styled.div
`   display: flex;
    justify-content: flex-end;
`;

const Menu2=styled.div
`   height: 350px;
    ul{
        list-style-type: none;
        li{
            margin:0;
            padding:0;           
        }
    } 
`;

const Menu3=styled.div
`   border-top: 1px solid gray;
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

    return (
      <Menucot1>
            <Menu1>
                <Menu11>
                    <img src={imgueser} alt="ảnh user"/>
                    <div>
                        <p>admin<br></br>
                        admin@aspnetboilerplate.com</p>
                    </div>
                </Menu11>
                <Menu12>
                    <Button
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <ArrowDropDownIcon sx={{ fontSize: 35 , color: "white" }}/>
                    </Button>    
                </Menu12> 
                <Menu
                        MenuListProps={{
                        'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleClose}>
                            <Button component={Link} to="/" startIcon={< InputIcon/>} sx={{ fontSize: 16 , color: "black" }}>
                                <b>Logout</b>
                            </Button>
                        </MenuItem>
                </Menu>     
            </Menu1>
            <Menu2>
                <ul>
                    <li>
                        <Button startIcon={< AssessmentIcon/>} 
                                sx={{ fontSize: 16 , color: "black" }}
                                component={Link} to="Projects">
                            <b>Projects</b>
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={< ImportContactsIcon />} 
                                sx={{ fontSize: 16 , color: "black" }}
                                component={Link} to="Tasks">
                            <b>Tasks</b>
                        </Button>
                    </li>
                </ul>
                
                
            </Menu2>
            <Menu3>
                <p>© 2022 Timesheet.Version 4.3.0.0 [20220211]</p>
            </Menu3>
        </Menucot1>
    );
  }
  
  export default Narmenu;