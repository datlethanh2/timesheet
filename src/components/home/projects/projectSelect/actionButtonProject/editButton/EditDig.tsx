import * as React from 'react';
import Notifiproject from '../../newButton/NotifiProject';
import Editteam  from "./EditTeam";
import Edittask  from "./EditTask";
import Editgeneral  from "./EditGeneral";
import {Newpro, Usepro, UserNotPagging,Taskp, Task,CustomerClient} from "../../../../../../interface/InterfaceProject";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/Hook";
import {newPost} from "../../../../../../redux/action/ProjectThunk";
import {setResetTask} from "../../../../../../redux/readucer/ProjectSlice"
import { useForm } from "react-hook-form";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';

function Editbut(props: any){

    const [value1, setValue1] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue1(newValue);
    };
    const edit: any= useAppSelector((state) => state.projects.edit);    
    const {register, setValue, handleSubmit, watch, formState: { errors }, } = useForm<Newpro>();
    
    React.useEffect(()=>{
        if(edit){
            //const status: boolean=(edit.status===0)? true: false;
            setValue("name", edit.name);
            setValue("code", edit.code);
            setValue("status", edit.status);
            setValue("timeStart", edit.timeStart);
            setValue("timeEnd", edit.timeEnd);
            setValue("note", edit.note);
            setValue("isAllUserBelongTo", edit.isAllUserBelongTo);
            setValue("projectType", edit.projectType);
            setValue("customerId", edit.customerId);
            setValue("komuChannelId", edit.komuChannelId);
        }            
    },[setValue, edit]);

    const typeteam= useAppSelector((state) => state.projects.typeteam);
    const customer = useAppSelector((state) => state.projects.customer);
    const newmove: any= useAppSelector((state) => state.projects.newmove);
    const newtask: any= useAppSelector((state) => state.projects.newtask);
    const dispatch = useAppDispatch();
    //console.log(typeteam);
    const saveEdit= async(data:Newpro)=>{
        const user:(Usepro[])=([]);
        let pms1: any=[];
        newmove.forEach((UserNotPagging: UserNotPagging, index:number) =>{
            user.push({
                id: 0,
                userId: UserNotPagging.id,           
                type: typeteam[index+1],
            })
            if(typeteam[index+1]===1){
                pms1.push(UserNotPagging.name)
            }
        });

        let cus: string="";
        customer.forEach((CustomerClient: CustomerClient) =>{ 
            if(CustomerClient.id===Number(data.customerId)){
                cus=CustomerClient.name;         
            }       
        })
        const taskp: Taskp[]=([]);
        newtask.forEach((Task: Task) =>{
            taskp.push({
                taskId: Task.id,
                billable: Task.isDeleted,
                id: 0,
            })
        }); 

        const newpro={
            name: data.name,
            code: data.code,
            status: data.status? 1: 0,
            timeStart: data.timeStart,
            timeEnd: data.timeEnd,
            note: data.note,
            isAllUserBelongTo: data.isAllUserBelongTo,
            projectType: data.projectType,
            customerId:data.customerId,
            tasks: taskp,
            users: user,
            projectTargetUsers: [],
            komuChannelId:data.komuChannelId,
            isNotifyToKomu: true,          
            id: props.id,
        }
        const getpro= {
            customerName: cus,
            name: data.name,
            code: data.code,
            status: data.status? 1: 0,
            timeStart: data.timeStart,
            timeEnd: data.timeEnd,
            pms: pms1,
            activeMember: user.filter((Usepro:Usepro)=>Usepro.type!==3).length,
            projectType: data.projectType,
            id: props.id,
        }
       // console.log(newpro)
        dispatch(newPost({newpro: newpro, getpro: getpro}));
        //dispatch(props.projectGet);
        dispatch(setResetTask());
        props.setOpen(false);
    };

    const closeCancel=()=>{
        props.setOpen(false);
        dispatch(setResetTask());
    }

    return(
        <div>
            <Dialog
                open={props.open}
                onClose={closeCancel}
                maxWidth={"lg"}  
                fullWidth={true}
            >                
                <DialogTitle sx={{display:"flex",justifyContent: "space-between", borderBottom: "0.5px solid #80808054",padding: 0, marginLeft: "30px",marginRight: "15px"}}>
                    <p><b>Edit project: {watch("name")}</b></p>
                    <Button onClick={()=>props.setOpen(false)} sx={{color: "black"}}><CloseIcon /></Button>         
                </DialogTitle>  
                <DialogContent sx={{height: "500px", marginLeft: "10px",marginRight: "10px"}}>  
                    <TabContext value={value1}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Genetal" value="1" />
                                <Tab label="Team" value="2"/>
                                <Tab label="Tasks" value="3" />
                                <Tab label="Notification" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">                           
                            <Editgeneral 
                                register={register}
                                setValue={setValue}
                                watch={watch}
                                errors={errors}
                                //defaultValues={defaultValues}
                            />
                        </TabPanel>
                        <TabPanel value="2" sx={{overflowX: "scroll"}}>
                            <Editteam                              
                                register={register}
                                //guiTeam={nhanTeam}
                            />
                        </TabPanel>
                        <TabPanel value="3">
                            <Edittask 
                               //guiTask={nhanTask}
                            />
                        </TabPanel>
                        <TabPanel value="4">
                            <Notifiproject
                                register={register}
                            />
                        </TabPanel>
                    </TabContext> 
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={closeCancel}>Cancel</Button>
                    <Button 
                        disabled={watch("name") && watch("code") && watch("timeStart")!=="Invalid date" && watch("timeEnd")!=="Invalid date"?false:true}
                        sx={{backgroundColor: '#d9534f', color: 'white'}}
                        onClick={ handleSubmit(saveEdit)}  autoFocus>Save</Button>         
                </DialogActions>  
            </Dialog> 
        </div>
    )
}

export default Editbut;