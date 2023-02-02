import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { createSlice} from '@reduxjs/toolkit';
import {quanTiTyGet,projectGet, deactivePost,activePost, projectDelete, editGet, userGet, customerGet, newClientPost, newPost} from '../action/ProjectThunk';
import {UserNotPagging, Users, Taskp, Task, Project} from "../../interface/InterfaceProject";
import {taskGet} from '../action/TaskThunk';

const initialState={
    projects:[{
        customerName:"",
        name: "",
        code: "",
        status: 3,
        timeStart: "",
        timeEnd: "",
        pms: [],
        activeMember: 0,
        projectType: 0,
        id: 0,
    }],
    actprojects:0,
    deprojects:0,
    loading: false,
    loading1: false,
    edit: {},
    user:[],
    usermain:[],
    customer: [{
        name: "",
        code: "",                
        address: "",
        id: 0,
    }],
    newmove: [],
    newteam: [],
    newtask: [],
    id: 0,
    tasks: [],
    comtasks: [],
    tasksmain: [],
    error:"",
    name: "",
    email: "",
    img:"",
    search: "",
    projects1:[],
    go: "",
    typeteam:[0],
    idclient: 0,
}

const projectSlice=createSlice({
    name: 'project',
    initialState,
    reducers:{
       
        setNewMove(state){
            state.newteam=[]
        },
        setNewClient(state,action){
            state.idclient=action.payload
        },   
        //Search          
        setProjectSearch(state, action){
            state.search=action.payload
        },
        setResetTask(state){
            state.tasks=state.tasksmain.filter((Task: Task)=>Task.type===1);
            state.comtasks=state.tasksmain.filter((Task: Task)=>Task.type===0);
            const list: any=state.comtasks.map((Task: Task)=>{
                return {...Task, isDeleted: true}
            })
            state.comtasks=list;
        },
        setProjectId(state, action){
            state.id=action.payload
        },
        //New Project/View-Task
        setTeamView(state, action){ 
            state.user=state.usermain
            state.typeteam=[0];           
            if(state.user && action.payload.users){
                let listTeam= state.user.filter(( UserNotPagging:  UserNotPagging) => action.payload.users.some((Users: Users) => Users.userId ===  UserNotPagging.id));
                let listTeam1= action.payload.users.filter(( Users: Users) => state.user.some((UserNotPagging:  UserNotPagging) => UserNotPagging.id===Users.userId)); 
                state.user=state.user.filter(( UserNotPagging:  UserNotPagging) => !action.payload.users.some((Users: Users) => Users.userId ===  UserNotPagging.id));      
                listTeam1.forEach((Users: Users)=>{
                    state.typeteam.push(Users.type)
                    let list: any=listTeam.map((UserNotPagging:  UserNotPagging)=>{                
                        return (UserNotPagging.id=== Users.userId ?{...UserNotPagging,branchId: Users.id}: UserNotPagging)
                    })
                    listTeam=list;              
                })
                //console.log(listTeam1)  
                state.newmove=listTeam.sort((UserNotPagging:  UserNotPagging, UserNotPagging1:  UserNotPagging)=>UserNotPagging.branchId-UserNotPagging1.branchId);          
            } 
        },
        setTaskView(state, action){
            if(action.payload.tasks &&  state.tasksmain){
                state.newtask=state.tasksmain
                let listTask: any=state.newtask.filter((Task:Task) => (action.payload.tasks).some((Taskp: Taskp) =>Taskp.taskId === Task.id));
                //state.tasks=state.tasks.filter((Task:Task) => !listTask.some((Taskp: Task) =>Task.id=== Taskp.id));
                
                action.payload.tasks.forEach((Taskp: Taskp, index: number)=>{
                    listTask=listTask.map((Task:Task)=>{                
                        return (Task.id=== Taskp.taskId ?{...Task, isDeleted: Taskp.billable, type:Taskp.id }: Task);
                    })
                })
                state.newtask=listTask.sort((Task:Task, Taskp: Task)=>Task.type-Taskp.type); 
            }                 
        },
        //New Task
        setTaskNewDelete(state, action){
            state.tasks.unshift(...state.comtasks.filter((Task: Task) => ( Task.id === action.payload)));
            state.comtasks=state.comtasks.filter((Task: Task) => ( Task.id !== action.payload));
        },
        setTaskNewCheck(state, action){
            const list:any=state.comtasks.map((Task:Task) => {
                if(Task.id === action.payload.index){
                    return {...Task, isDeleted: action.payload.check};                                                
                }else{
                    return Task;
                }
            })
            state.comtasks=list
        },
        setMoveNewTask(state, action){   
            let list:any=state.tasks.map((Task:Task)=>{
                return {...Task,isDeleted: true}
            })
            state.tasks=list;
            let newList=state.tasks.filter(( Task:Task) => ( Task.id === action.payload));
            state.comtasks.push(...newList);        
            state.tasks=state.tasks.filter(( Task:Task) => ( Task.id !== action.payload));
        },
        setBillableNewTask(state, action){
            const list:any=state.comtasks.map((Task:Task) => {
                return {...Task, isDeleted: action.payload};                   
                
            })
            state.comtasks=list;
        },
       
        //New Team
        setMoveNewTeam(state, action){              
            let newList=state.usermain.filter(( UserNotPagging: UserNotPagging) => ( UserNotPagging.id === action.payload));
            state.newteam.push(...newList);       
            const newList2: any=state.newteam.map((UserNotPagging: UserNotPagging) => {
                if(UserNotPagging.id === action.payload){
                        return {...UserNotPagging, branchId: 1};                   
                } else{
                    return UserNotPagging;
                }
            });
            state.newteam=newList2;  
           // state.user=state.user.filter(( UserNotPagging: UserNotPagging) => ( UserNotPagging.id !== action.payload));        
        },
        setDeleteNewTeam(state, action){
            const newList=state.newteam.filter(( UserNotPagging: UserNotPagging) => ( UserNotPagging.id === action.payload));
           // state.user.push(...newList);
            state.newteam=state.newteam.filter(( UserNotPagging: UserNotPagging) => ( UserNotPagging.id !== action.payload));
        },
        setTypeTeam1(state, action){
           const newList2: any=state.newteam.map((UserNotPagging: UserNotPagging) => {
                if(UserNotPagging.id === action.payload.id){
                        return {...UserNotPagging, branchId: action.payload.index};                   
                } else{
                    return UserNotPagging;
                }
            })
           state.newteam=newList2;
        },

        //Edit Team
        setMoveTeam(state, action){  
            let list=state.newmove.filter((UserNotPagging: UserNotPagging)=>UserNotPagging.id===action.payload);
            if(list.length===0){
                let newList=state.usermain.filter(( UserNotPagging: UserNotPagging) => ( UserNotPagging.id === action.payload));
                state.newmove.push(...newList);
                state.typeteam.push(0);
            }        
           // state.user=state.user.filter(( UserNotPagging: UserNotPagging) => ( UserNotPagging.id !== action.payload));
        },
        setDeleteTeam(state, action){
            const newList=state.newmove.filter(( UserNotPagging: UserNotPagging) => ( UserNotPagging.id === action.payload.index));
            //state.user.push(...newList);
            state.newmove=state.newmove.filter(( UserNotPagging: UserNotPagging) => ( UserNotPagging.id !== action.payload.index));
            state.typeteam.splice(action.payload.id, 1);
        },
        setTypeTeam(state, action){
            if(state.typeteam.length>0){
                state.typeteam[action.payload.id+1]=action.payload.index;
            }           
        },
        //Edit Task
        setMoveTask(state, action){    
            let list:any=state.tasks.map((Task:Task)=>{
                return {...Task,isDeleted: true}
            })
            state.tasks=list;             
            let newList=state.tasks.filter(( Task:Task) => ( Task.id === action.payload));
            state.newtask.push(...newList); 
            state.tasks=state.tasks.filter(( Task:Task) => ( Task.id !== action.payload));
        },
        setDeleteTask(state, action){   
            const newList=state.newtask.filter(( Task:Task) => (  Task.id === action.payload));
            //console.log(newList);
            state.tasks.unshift(...newList);
            state.newtask=state.newtask.filter((Task:Task) => ( Task.id !== action.payload));
            
        },
        setTypeTask(state, action){
            const list:any=state.newtask.map((Task:Task) => {
                if(Task.id === action.payload.index){
                        return {...Task, isDeleted: action.payload.check};                   
                } else{
                    return Task;
                }
            })
            state.newtask=list;
        },
        setBillableTask(state, action){
            const list:any=state.newtask.map((Task:Task) => {
                return {...Task, isDeleted: action.payload};                   
                
            })
            state.newtask=list;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(projectGet.pending, (state, action) => {
                state.loading1 = true
                state.projects.forEach((item)=>{
                    if(item.customerName===""){
                        state.projects=[];
                    }
                })
            })
            .addCase(projectGet.fulfilled, (state, action) => {
                state.loading1 = false
                state.projects = action.payload
            })
            .addCase(projectGet.rejected, (state, action: any) => {
                state.loading1 = false
                const notyf = new Notyf();
                notyf.error(action.payload.response?action.payload.response.data.error.message:action.payload);
            })
        builder
            .addCase(quanTiTyGet.pending, (state, action) => {
                state.loading = true
            })
            .addCase(quanTiTyGet.fulfilled, (state, action:any) => {
                state.loading = false
                action.payload.forEach((item: any)=>{
                    if(item.status===0){
                        state.actprojects=item.quantity
                    }
                    if(item.status===1){
                        state.deprojects=item.quantity
                    }
                })
            })
            .addCase(quanTiTyGet.rejected, (state, action: any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response?action.payload.response.data.error.message:action.payload);
            })

        builder
            .addCase(deactivePost.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deactivePost.fulfilled, (state, action) => {
                state.loading = false
                state.projects=state.projects.filter((Project:Project)=>Project.id !== action.payload);
                state.deprojects=state.deprojects+1;
                state.actprojects=state.actprojects-1;
                const notyf = new Notyf();
                notyf.success("Ok deactive projects");
            })
            .addCase(deactivePost.rejected, (state, action:any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response.data.error.message);
           
            })
        builder
            .addCase(activePost.pending, (state, action) => {
                state.loading = true
            })
            .addCase(activePost.fulfilled, (state, action) => {
                state.loading = false;
                state.projects=state.projects.filter((Project:Project)=>Project.id !== action.payload);
                state.actprojects=state.actprojects+1;
                state.deprojects=state.deprojects-1; 
                const notyf = new Notyf();
                notyf.success("Ok active projects");
            })
            .addCase(activePost.rejected, (state, action:any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response.data.error.message);
            })
        builder
            .addCase(projectDelete.pending, (state, action) => {
                state.loading = true
            })
            .addCase(projectDelete.fulfilled, (state, action) => {
                state.loading = false
                state.projects.forEach((Project: Project)=>{
                    if(Project.id === action.payload && Project.status===0){
                        state.actprojects=state.actprojects-1;
                    }
                    if(Project.id === action.payload && Project.status===1){
                        state.deprojects=state.deprojects-1;
                    }
                })
                state.projects = state.projects.filter((Project: Project) => (Project.id !== action.payload));
                const notyf = new Notyf();
                notyf.success("Ok delete projects");
            })
            .addCase(projectDelete.rejected, (state, action: any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response.data.error.message);
            })
        builder
            .addCase(editGet.pending, (state, action) => {
                state.loading = true
            })
            .addCase(editGet.fulfilled, (state, action) => {
                state.loading = false
                state.edit = action.payload
            })
            .addCase(editGet.rejected, (state, action) => {
                state.loading = false
            })
        builder
            .addCase(userGet.pending, (state, action) => {
                state.loading = true
            })
            .addCase(userGet.fulfilled, (state, action) => {
                state.loading = false
                state.usermain = action.payload
                state.user=state.usermain
                action.payload.map((UserNotPagging: UserNotPagging)=>{
                    if(UserNotPagging.id===Number(localStorage.getItem('id'))){
                        state.name=UserNotPagging.name;
                        state.email=UserNotPagging.emailAddress;
                        state.img=UserNotPagging.avatarFullPath;
                    }
                })
            })
            .addCase(userGet.rejected, (state, action: any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response?action.payload.response.data.error.message:action.payload);
            })
        builder
            .addCase(customerGet.pending, (state, action) => {
                state.loading = true
            })
            .addCase(customerGet.fulfilled, (state, action) => {
                state.loading = false
                state.customer = action.payload
            })
            .addCase(customerGet.rejected, (state, action) => {
                state.loading = false
            })
        builder
            .addCase(newClientPost.pending, (state, action) => {
                state.loading = true
            })
            .addCase(newClientPost.fulfilled, (state, action: any) => {
                state.loading = false
                state.customer=[...state.customer, action.payload];
                const notyf = new Notyf();
                notyf.success("Ok new client projects");
            })
            .addCase(newClientPost.rejected, (state, action: any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response.data.error.message);
            })
        builder
            .addCase(newPost.pending, (state, action) => {
                state.loading = true
            })
            .addCase(newPost.fulfilled, (state, action:any) => {
                state.loading = false
                state.projects.forEach((Project:Project)=>{
                    if(Project.id===action.payload.response.id){
                        state.go="new/edit project"
                    }
                });
                if(state.go!=="new/edit project"){
                    const list:any ={...action.payload.getpro, id: action.payload.response.id}               
                    state.projects=[...state.projects, list];
                    state.actprojects=state.actprojects+1;
                    const notyf = new Notyf();
                    notyf.success("Ok new project");           
                }               
                if(state.go==="new/edit project"){
                    const list:any=state.projects.map((Project:Project)=>{
                        if(Project.id === action.payload.response.id){
                            return {...action.payload.getpro};                   
                        } else{
                            return Project;
                        }
                    })
                    state.projects=list;
                    state.go="new/edit project1";
                    const notyf = new Notyf();
                    notyf.success("Ok edit project");
                }
            })
            .addCase(newPost.rejected, (state, action: any) => {
                state.loading = false
                const notyf = new Notyf();
                notyf.error(action.payload.response.data.error.message);
            })
        builder
            .addCase(taskGet.pending, (state, action) => {
                state.loading = true
            })
            .addCase(taskGet.fulfilled, (state, action) => {
                state.loading = false
                state.tasksmain = action.payload
                state.tasks=state.tasksmain
                const list: any=state.tasksmain.filter((Task: Task)=>Task.type===0).map((Task: Task)=>{
                    return {...Task, isDeleted: true}; 
                });
                state.comtasks=list;
            })
            .addCase(taskGet.rejected, (state, action) => {
                state.loading = false
            })
    },
})
export const {setDeleteNewTeam,setMoveNewTeam, setBillableNewTask, setBillableTask,setResetTask,setMoveNewTask,setNewClient,setTypeTeam1, setNewMove,setProjectId,setTypeTask, setTaskNewDelete,setTaskNewCheck,setMoveTask,setProjectSearch, setMoveTeam, setDeleteTeam, setTypeTeam, setTeamView, setTaskView, setDeleteTask} = projectSlice.actions;
export  const projectReducer=projectSlice.reducer;