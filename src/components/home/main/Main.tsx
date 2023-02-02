import React from 'react';
import Narmenu from "./NarMenu";
import Header from "./Header";
import {useAppDispatch} from "../../../redux/Hook";
import {userGet} from "../../../redux/action/ProjectThunk";
import styled from '@emotion/styled';
import { Outlet} from "react-router-dom";
import Grid from '@mui/material/Grid';

const Outcan=styled.div
`   padding-top: 4%;
    padding-left:3%;
    padding-right:3%;
    padding-bottom: 3%;
    margin-top:70px;
    background-color: #80808042;
    min-height:480px;
`;
const Outcan1=styled.div
`   
    padding-left:20px;
    padding-right:20px;
    background-color: white;
`;

function Main(){

    const dispatch = useAppDispatch();
    
    React.useEffect(() => {
         dispatch(userGet());  
    }, [dispatch]);

    return(
        <div>
            <Header />
            <Grid container spacing={0}>
                <Grid item lg={3} sx={{ display: { sm: 'none', xs:'none', md: 'none', lg: 'block' } }}>
                    <Narmenu /> 
                </Grid>
                <Grid item lg={9} md={12} sm={12} xs={12}>
                    <Outcan>
                        <Outcan1>
                            <Outlet />  
                        </Outcan1>
                    </Outcan>
                </Grid>
            </Grid>    
        </div>
    )
}

export default Main;