import styled from '@emotion/styled';
import {setMenuColor} from "../../../redux/readucer/AuthenSlice";
import {useAppDispatch, useAppSelector} from "../../../redux/Hook";
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React from 'react';
import logo from '../../../images/logo.png';
import Narmenu from "./NarMenu";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DoneIcon from '@mui/icons-material/Done';

const Head = styled.div
    `   display:flex;
    justify-content: space-between;
    // background-color:#f44336;
    padding:10px;
    width:100%;
    // position: fixed;
    // z-index: 10;
`;
const Logo = styled.div
`   display:flex;
    h1{
        color:white;
        font-size:20px;
        margin-left: 10px;
    }
`;

const drawerWidth = 303;

interface Props {
    window?: () => Window;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function Header(props: Props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer =(anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setOpen(open);
            setState({ ...state, [anchor]: open });

    };
    const [open, setOpen] = React.useState(false);     
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    let color= useAppSelector((state) => state.authen.color);
    const dispatch = useAppDispatch();

    return (

        <Box sx={{ display: 'flex' }}>
            <AppBar
                sx={{
                    width: { md: `100%`, sm: `100% ` },
                    ml: { md: `100%`, sm: `${drawerWidth}px` },
                }}
            >
                <Head style={{backgroundColor: color?color: "#f44336"}}>
                    <Logo>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' }, marginLeft: "3px", marginRight: "5px" }}
                        >
                            <MenuIcon sx={{ display: mobileOpen ? "none" : "block" }} />
                            <KeyboardBackspaceIcon sx={{ display: mobileOpen ? "block" : "none" }} />
                        </IconButton>
                        <p><img src={logo} alt="logo" width="20px" height="20px" /></p>
                        <h1>TIMESHEET</h1>
                    </Logo>
                    <div>
                        {/* <IconButton><DriveFolderUploadIcon sx={{ fontSize: 30, color: "white" }} /></IconButton>
                        <IconButton><DescriptionIcon sx={{ fontSize: 30, color: "white" }} /></IconButton> */}
                        <IconButton sx={{display: open? "none": "block", marginRight:{xs:"10px", lg:"20px"}, paddingTop:"12px" }} onClick={toggleDrawer('right', true)}><MoreVertIcon sx={{ fontSize: "25px", color: "white"}} /></IconButton>
                        <IconButton sx={{display: open? "block": "none", marginRight:{xs:"10px", lg:"20px"}, paddingTop:"12px"}} onClick={toggleDrawer('right', false)}><MoreVertIcon sx={{ fontSize: "25px", color: "white"}} /></IconButton>
                        <SwipeableDrawer
                            sx={{ zIndex: 1 }}
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}
                            onOpen={toggleDrawer('right', true)}
                        >
                            <Box
                                role="presentation"
                                sx={{paddingTop:"70px", width:"280px"}}
                            >
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList onChange={handleChange}>
                                            <Tab label="Skins" value="1" />
                                            <Tab label="Settings" value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1" sx={{padding:0}}>
                                        <div style={{display:"flex", justifyContent: "space-between", borderBottom: "1px solid gray"}}>
                                            <Button onClick={()=>dispatch(setMenuColor("#f44336"))} variant="text">
                                                <p style={{backgroundColor:"#f44336", width: "20px", height: "18px", borderRadius:"5px"}}></p>
                                                <p style={{marginLeft:'5px', color:"black"}}>red</p>
                                            </Button>
                                            <DoneIcon sx={{display: color==="#f44336"?"block":"none", paddingTop:"15px"}}/>
                                        </div>
                                        <div style={{display:"flex", justifyContent: "space-between", borderBottom: "1px solid gray"}}>
                                            <Button onClick={()=>dispatch(setMenuColor("blue"))} variant="text">
                                                <p style={{backgroundColor:"blue", width: "20px", height: "18px", borderRadius:"5px"}}></p>
                                                <p style={{marginLeft:'5px', color:"black"}}>Blue</p>
                                            </Button>
                                            <DoneIcon sx={{display: color==="blue"?"block":"none", paddingTop:"15px"}}/>
                                        </div>
                                        
                                    </TabPanel>
                                    <TabPanel value="2">Item Two</TabPanel>
                                </TabContext>
                            </Box>
                        </SwipeableDrawer>
                    </div>
                </Head>
            </AppBar>
            <Box
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    container={container}
                    open={mobileOpen}
                    onClose={() => setMobileOpen(!mobileOpen)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        position: 'fixed',
                        zIndex: 1,
                        display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Narmenu />
                </Drawer>
            </Box>


        </Box>
    )
}

export default Header;