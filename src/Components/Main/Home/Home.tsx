import styled from 'styled-components';
import { Outlet} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Header from "./Header";
import Narmenu from "./Narmenu";

const Outcan=styled.div
`   padding-top:20px;
    padding-left:20px;
    padding-right:20px;
    background-color: #e9e9e9;
`;

const Outcan1=styled.div
`   
    padding-left:20px;
    padding-right:20px;
    background-color: white;
`;


function Home() {
    return (
      <div>
         <Header />
            <Grid container>
                <Grid item md={3} sx={{ display: { sm: 'none', xs:'none', md: 'block' } }}>
                    <Narmenu /> 
                </Grid>
                <Grid item md={9} sm={12} xs={12}>
                    <Outcan>
                        <Outcan1>
                            <Outlet />  
                        </Outcan1>
                    </Outcan>
                </Grid>
            </Grid>  
      </div>
    );
  }
  
  export default Home;