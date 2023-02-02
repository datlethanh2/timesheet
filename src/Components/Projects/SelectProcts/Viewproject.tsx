import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import Butaction from "./ButtonAction/Butaction";
import {Project} from "../../../Intertype/Typeproject"


const Tablebang=styled.ul
`   padding: 0;
    border-bottom:1px solid black;
    list-style-type: none;
    font-size: 13px;
    li{           
        width:100%;
        border-top:1px solid black;
        padding-top:5px;
        padding-bottom:5px;
        display:flex;
        justify-content: space-between;
    }         
`;

const Headname=styled.h1
`   line-height:35px;
    background-color: #8080808c;
    font-size:18px;
    padding-left: 10px;
`;

const BorderSec=styled.div
`   display: flex;
    padding-left: 5px;
    //width:80%;
    p{  border-radius: 10px;;
        color: white;
        line-height:20px;
        padding-left:5px;
        padding-right:5px;
        margin-right: 5px;
    }
    
`;

const Buttonact=styled.div
`   
`;

function Viewproject(e: any){
    
    const typepro: string[]=['T&M', 'Fixed Frice', 'Non-Bill', 'ODC', 'Product', 'Training', 'NoSalary'];

    const groupsac = _(e.projects)
    .filter((Project) => (Project.status === 0))
    .groupBy((Project:Project)=> Project.customerName)
    .map((proac, customerName) => {
        return (
            <div >
                <Headname><b>{customerName}</b></Headname>
                <Tablebang>
                    {(proac)? 
                        proac.map((Project: Project) => {                         
                            return(                       
                                <li key={Project.id}> 
                                    <BorderSec>                                                             
                                        <p style={{backgroundColor: "while", color: "black" }}>{Project.name}</p>                   
                                        <p style={{backgroundColor: "#03a9f4" }}>{Project.pms}</p>
                                        <p style={{backgroundColor: "#f44d03" }}>{Project.activeMember} member</p>
                                        <p style={{backgroundColor: "#ffc107" }}>{typepro[Project.projectType]}</p>
                                        <p style={{backgroundColor: "#8bc34a" }}>{moment(Project.timeStart).format('DD/MM/yyyy')}-{moment(Project.timeEnd).format('DD/MM/yyyy')}</p>                                     
                                      
                                    </BorderSec> 
                                    <Buttonact>
                                        <Butaction
                                            id1={Project.id}
                                            name1={Project.name}
                                        />
                                    </Buttonact>
                                </li>
                            )
                    }): null}
                </Tablebang>
            </div>
        
        )
    })
    .value();

    const groupsde = _(e.projects)
    .filter((Project) => (Project.status === 1))
    .groupBy((Project:Project)=> Project.customerName)
    .map((proac, customerName) => {
        return (
            <div >
                <Headname><b>{customerName}</b></Headname>
                <Tablebang>
                    {(proac)? 
                        proac.map((Project: Project) => {                         
                            return(                       
                                <li key={Project.id}> 
                                    <BorderSec>                                                             
                                        <p style={{backgroundColor: "while", color: "black" }}>{Project.name}</p>                   
                                        <p style={{backgroundColor: "#03a9f4" }}>{Project.pms}</p>
                                        <p style={{backgroundColor: "#f44d03" }}>{Project.activeMember} member</p>
                                        <p style={{backgroundColor: "#ffc107" }}>{typepro[Project.projectType]}</p>
                                        <p style={{backgroundColor: "#8bc34a" }}>{moment(Project.timeStart).format('DD/MM/yyyy')}-{moment(Project.timeEnd).format('DD/MM/yyyy')}</p>                                     
                                      
                                    </BorderSec> 
                                    <Buttonact>
                                        <button>Action</button>
                                    </Buttonact>
                                </li>
                            )
                    }): null}
                </Tablebang>
            </div>
        
        )
    })
    .value();

    const groupsal = _(e.projects)
    .groupBy((Project:Project)=> Project.customerName)
    .map((proac, customerName) => {
        return (
            <div >
                <Headname><b>{customerName}</b></Headname>
                <Tablebang>
                    {(proac)? 
                        proac.map((Project: Project) => {                         
                            return(                       
                                <li key={Project.id}> 
                                    <BorderSec>                                                             
                                        <p style={{backgroundColor: "while", color: "black" }}>{Project.name}</p>                   
                                        <p style={{backgroundColor: "#03a9f4" }}>{Project.pms}</p>
                                        <p style={{backgroundColor: "#f44d03" }}>{Project.activeMember} member</p>
                                        <p style={{backgroundColor: "#ffc107" }}>{typepro[Project.projectType]}</p>
                                        <p style={{backgroundColor: "#8bc34a" }}>{moment(Project.timeStart).format('DD/MM/yyyy')}-{moment(Project.timeEnd).format('DD/MM/yyyy')}</p>                                     
                                      
                                    </BorderSec> 
                                    <Buttonact>
                                        <button>Action</button>
                                    </Buttonact>
                                </li>
                            )
                    }): null}
                </Tablebang>
            </div>
        
        )
    })
    .value();

    return(
        <div>       
            {e.currency==="acpro"?groupsac: null}
            {e.currency==="depro"?groupsde: null}
            {e.currency==="alpro"?groupsal: null}
        </div>
    )
}
export default Viewproject;