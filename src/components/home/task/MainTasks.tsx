import React from 'react';
import {taskGet} from "../../../redux/action/TaskThunk";
import {useAppDispatch, useAppSelector} from "../../../redux/Hook";
import {TaskView} from "../../../interface/InterfaceTask";
import Newtask from './taskButton/NewTask';
import Edittask from './taskButton/EditTask';
import Archivetask from './taskButton/ArchiveTask';
import Unarchivetask from './taskButton/UnarchiveTask';
import Deletetask from './taskButton/DeleteTask';
import Searchtask from './taskButton/SearchTask';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import styled from '@emotion/styled';

const Header=styled.div
`   display:flex;
    justify-content: space-between;
    border-bottom: 1px solid #80808057;
    color: black;
    font-size:12px;
    margin-bottom:10px;
`;
const Tablebang=styled.ul
`   padding: 0;
    list-style-type: none;
    color: black;
    padding-bottom: 5px;
    li{           
        width:100%;
        color: black;
        border-bottom:1px solid #80808057;
        padding-top:5px;
        padding-bottom:5px;
        padding-left:5px;
        padding-right:5px;
    }         
`;
const Cacbutton=styled.div
`   display:flex;
    justify-content: end;
`;

function Tasks(){

    const dispatch = useAppDispatch()
    let searchName: string= useAppSelector((state) => state.tasks.searchName);
    React.useEffect(() => {
        dispatch(taskGet());
    }, [dispatch]);
   
    let tasks=useAppSelector((state) => state.tasks.tasks);
    if(searchName){
        tasks=tasks.filter((TaskView) =>TaskView.name.toLowerCase().includes(searchName));
    } 
    let othertasks: TaskView[]=tasks.filter((TaskView: TaskView) => (TaskView.type === 1));
    //React.useEffect(() => {
        // setCommonTasks(()=>tasks.filter((TaskView: TaskView) => (TaskView.type === 0)));       
        // setOtherTasks(()=>tasks.filter((TaskView: TaskView) => (TaskView.type === 1)));
    //}, [tasks]);
    //console.log(tasks);
    
    const refrechReload=(event: React.MouseEvent<HTMLButtonElement>)=>{   
        window.location.reload();
    }
    const mouseListOver = (event: React.MouseEvent<HTMLElement>) => {
        const box: HTMLElement = event.currentTarget;
        box.style.backgroundColor = "#80808012";
    };
    const mouseListOut = (event: React.MouseEvent<HTMLElement>) => {
        const box: HTMLElement = event.currentTarget;
        box.style.backgroundColor = "white";
    };
    

    return(
        <div>
            <Header>
                <h1>Manage Tasks</h1>     
                <p><IconButton onClick={refrechReload}><RefreshOutlinedIcon/></IconButton></p>                        
            </Header>

            <Grid container>
                <Grid item md={3} xs={12} sx={{paddingLeft: "10px",paddingTop:"20px"}}>
                    <Newtask 
                        taskGet={taskGet}
                    />
                </Grid>
                <Grid item md={9} xs={12} sx={{paddingTop:"7px"}}>
                    <Searchtask />
                </Grid>
            </Grid>
            {/* {tasks.length} */}
            
            <Tablebang>
                <li style={{display: tasks.filter((TaskView: TaskView) => (TaskView.type === 0)).length===0? "none": "block"}}>
                    <p><b>Common Task ({tasks.filter((TaskView: TaskView) => (TaskView.type === 0)).length})</b></p>
                    <p>These tasks are automatically added to all new projects</p>
                </li>
                <li style={{display: tasks.filter((TaskView: TaskView) => (TaskView.type === 0)).length===0? "none": "block", paddingTop: "10px", paddingBottom: "10px", backgroundColor : "#80808012"}}><b>Name</b></li>
                {tasks? tasks.filter((TaskView: TaskView) => (TaskView.type === 0)).map((TaskView, index) => {                         
                    return(                       
                        <li key={index}
                            onMouseOver={(event: React.MouseEvent<HTMLElement>)=>event.currentTarget.style.backgroundColor = "#80808030"} 
                            onMouseOut={(event: React.MouseEvent<HTMLElement>)=>index%2?event.currentTarget.style.backgroundColor = "#8080801c": event.currentTarget.style.backgroundColor = "white"}  
                            style={{background:index%2? "#8080801c":"white", listStyleType: "none", color:"black", display: "flex", border: "1px solid #80808030",justifyContent: "space-between"}} 
                        >                             
                            <div style={{display: "flex"}}>
                                <Edittask 
                                    name={TaskView.name}
                                    id={TaskView.id}
                                    type={TaskView.type}
                                    taskGet={taskGet}
                                />
                                <p style={{margin: 0, paddingTop: "7px", paddingLeft: "5px"}}>{TaskView.name} </p>                              
                            </div>  
                            <Cacbutton>
                                <Archivetask 
                                    name={TaskView.name}
                                    id={TaskView.id}
                                    isDeleted={TaskView.isDeleted}
                                    taskGet={taskGet}
                                />
                                <Unarchivetask 
                                    name={TaskView.name}
                                    id={TaskView.id}
                                    isDeleted={TaskView.isDeleted}
                                    taskGet={taskGet}
                                />
                                <Deletetask
                                    name={TaskView.name}
                                    id={TaskView.id}
                                    isDeleted={TaskView.isDeleted}
                                    taskGet={taskGet}
                                />
                            </Cacbutton>                       
                        </li>
                    )
                }): null} 
            </Tablebang>     
            <Tablebang>
                <li style={{display: tasks.filter((TaskView: TaskView) => (TaskView.type === 1)).length===0? "none": "block"}}>
                    <p><b>Other ({othertasks.length})</b></p>     
                    <p>These task must be manually added to projects</p>  
                </li>    
                <li style={{display: tasks.filter((TaskView: TaskView) => (TaskView.type === 1)).length===0? "none": "block", paddingTop: "10px", paddingBottom: "10px", backgroundColor : "#80808012"}}><b>Name</b></li>       
                {othertasks? othertasks.map((TaskView, index) => {                         
                    return(                       
                        <li key={index}
                            onMouseOver={(event: React.MouseEvent<HTMLElement>)=>event.currentTarget.style.backgroundColor = "#80808030"} 
                            onMouseOut={(event: React.MouseEvent<HTMLElement>)=>index%2?event.currentTarget.style.backgroundColor = "#8080801c": event.currentTarget.style.backgroundColor = "white"}  
                            style={{background:index%2? "#8080801c":"white", listStyleType: "none", color:"black", display: "flex", border: "1px solid #80808030",justifyContent: "space-between"}} 
                        >                             
                            <div style={{display: "flex"}}>
                                <Edittask 
                                    name={TaskView.name}
                                    id={TaskView.id}
                                    type={TaskView.type}
                                    taskGet={taskGet}
                                />
                                <p style={{margin: 0, paddingTop: "7px", paddingLeft: "5px"}}>{TaskView.name} </p>                              
                            </div>  
                            <Cacbutton>
                                <Archivetask 
                                    name={TaskView.name}
                                    id={TaskView.id}
                                    isDeleted={TaskView.isDeleted}
                                    taskGet={taskGet}
                                />
                                <Unarchivetask 
                                    name={TaskView.name}
                                    id={TaskView.id}
                                    isDeleted={TaskView.isDeleted}
                                    taskGet={taskGet}
                                />
                                <Deletetask
                                    name={TaskView.name}
                                    id={TaskView.id}
                                    isDeleted={TaskView.isDeleted}
                                    taskGet={taskGet}
                                />
                            </Cacbutton>                       
                        </li>
                    )
                }): null} 
            </Tablebang>
        </div> 
    )
}

export default Tasks;