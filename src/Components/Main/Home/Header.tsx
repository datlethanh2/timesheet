import styled from 'styled-components';
import logo from '../../../images/logo.png';

import IconButton from '@mui/material/IconButton';
import DescriptionIcon from '@mui/icons-material/Description';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Heade=styled.div
`   display:flex;
    justify-content: space-between;
    background-color:#f44336;
    padding:10px;
    width:100%;
`;
export const Header1=styled.div
`   display:flex;
    h1{
        color:white;
        font-size:20px;
        margin-left: 10px;
    }
`;
export const Header2=styled.div
` 
`;

function Header(){
    return(
        <Heade>
            <Header1>
           
                <p><img src={logo} alt="logo" width="20px" height="20px"/></p>
                <h1>TIMESHEET</h1>
            </Header1>
            <Header2>
                <DriveFolderUploadIcon sx={{ fontSize: 30 , color: "white" }}/>
                <DescriptionIcon sx={{ fontSize: 30 , color: "white" }}/>
                <MoreVertIcon sx={{ fontSize: 30 , color: "white" }}/>
            </Header2>
        </Heade>
    )
}

export default Header;