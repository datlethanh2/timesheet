import React from 'react';
import styled from '@emotion/styled';
import _ from 'lodash';
import moment from 'moment';
import {useAppSelector } from "../../../../redux/Hook";
import { Project } from "../../../../interface/InterfaceProject";
import Actionproject from "./actionButtonProject/ActionProject";
import CircularProgress from '@mui/material/CircularProgress';

const Tablebang = styled.ul
`   padding: 0;
    margin: 0;
    list-style-type: none;
    font-size: 13.5px;
    padding-bottom: 15px;
    li{           
        width:100%;
        border-bottom:1px solid #8080805c;
        padding-bottom:25px;
    }         
`;

const Headname = styled.h1
`   line-height:35px;
    background-color:#8080805c;
    font-size:18px;
    padding-left: 10px;
    color: #000000a8;
    border-radius: 7px;
    margin:0;
    padding-top: 10px;
    padding-bottom: 10px;
`;

const BorderSec = styled.p
`   white-space: wrap;
    line-break: anywhere;
    padding-left: 5px;
    b{  border-radius: 10px;;
        color: white;
        padding-left:5px;
        padding-right:5px;
        padding-top:2px;
        padding-bottom:2px;
        margin-left: 5px;
        line-height: 25px;
    }
`;

function Viewproject(props: any) {

    const typepro: string[] = ['T&M', 'FF', 'NB', 'ODC', 'Product', 'Training', 'NoSalary'];
    let projects = useAppSelector((state) => state.projects.projects);
    let loading1 = useAppSelector((state) => state.projects.loading1);

    const groupsac = _(projects)
        .groupBy((Project: Project) => Project.customerName)
        .map((proac: Project[], customerName: string) => {
            return (
                <div key={customerName}
                    style={{backgroundColor:loading1 && projects?"#8080805c":"white", margin:0}}
                >
                    <Headname><b>{customerName}</b></Headname>
                    <Tablebang>
                        {(proac) ?
                            proac.map((Project: Project) => {
                                return (
                                    <li key={Project.id} 
                                        // onMouseOver={(event: React.MouseEvent<HTMLElement>)=>loading1?event.currentTarget.style.backgroundColor ="#8080805c":event.currentTarget.style.backgroundColor = "#80808012"} 
                                        // onMouseOut={(event: React.MouseEvent<HTMLElement>)=>loading1?event.currentTarget.style.backgroundColor ="#8080805c":event.currentTarget.style.backgroundColor = "white"} 
                                    >
                                        <BorderSec>
                                            {Project.name}
                                            <b style={{ backgroundColor: "#1976d2d4" }}>{Project.pms ? Project.pms.map(item => item = item + ', ') : null}</b>
                                            <b style={{ backgroundColor: "#f44d03" }}>{Project.activeMember} member</b>
                                            <b style={{ backgroundColor: "#ffc107" }}>{typepro[Project.projectType]}</b>
                                            <b style={{ backgroundColor: "#279a4bd1" }}>{moment(Project.timeStart).format('DD/MM/yyyy')}-{moment(Project.timeEnd).format('DD/MM/yyyy')}</b>
                                            <b>
                                                <Actionproject
                                                    id1={Project.id}
                                                    name1={Project.name}
                                                    projectGet={props.projectGet}
                                                    select={props.select}
                                                />  
                                            </b>
                                        </BorderSec>

                                    </li>
                                )
                            }) : null}
                    </Tablebang>
                </div>
            )
        })
        .value();

    return (
        <div >
            {loading1?    
                <div style={{textAlign:"center"}}>       
                    <CircularProgress sx={{color:projects.length===0?"gray": "white", position: "absolute", zIndex:"10"}} />                       
                </div> 
            : null}
            <div style={{paddingBottom: "25px"}}>
                {projects? groupsac : null}
            </div>
        </div>
    )
}

export default Viewproject;