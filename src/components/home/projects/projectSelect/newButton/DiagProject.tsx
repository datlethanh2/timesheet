import * as React from 'react';
import { useForm } from "react-hook-form";
import {Newpro, UserNotPagging, Task, Taskp, Usepro, CustomerClient} from "../../../../../interface/InterfaceProject";
import Generalproject  from "./GeneralProject";
import Notifiproject  from "./NotifiProject";
import Taskproject  from "./TaskProject";
import Teamproject from "./tabTeam/teamProject";
import {useAppDispatch, useAppSelector} from "../../../../../redux/Hook";
import {newPost} from "../../../../../redux/action/ProjectThunk";
import {setNewMove, setResetTask} from "../../../../../redux/readucer/ProjectSlice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';

function Diaproject(props: any){

    const [value1, setValue1] = React.useState("1");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue1(newValue);
    };

    const {register, setValue, handleSubmit, watch, reset,formState: { errors } } = useForm<Newpro>({
        defaultValues:{
            projectType: 1,
            customerId: 1,
            name: "",
            code: "",
        }
    });
    const newteam = useAppSelector((state) => state.projects.newteam);
    const comtasks = useAppSelector((state) => state.projects.comtasks);
    const customer = useAppSelector((state) => state.projects.customer);
    const dispatch = useAppDispatch();
    const saveProject= async(data:Newpro)=>{
        const user:(Usepro[])=([]);
        let pms1: any=[];
        newteam.forEach((UserNotPagging: UserNotPagging) =>{
            user.push({
                id: 0,
                userId: UserNotPagging.id,           
                type: UserNotPagging.branchId,
            })
            if(UserNotPagging.branchId===1){
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
        comtasks.forEach((Task:Task) =>{
            taskp.push({
                taskId: Task.id,
                billable: Task.isDeleted,
                id: 0,
            })       
        }); 
        const newpro={
            name: data.name,
            code: data.code,
            status: 0,
            timeStart: data.timeStart,
            timeEnd: data.timeEnd,
            note: data.note,
            isAllUserBelongTo: data.isAllUserBelongTo,
            projectType: data.projectType,
            customerId: data.customerId,
            tasks: taskp,
            users: user,
            projectTargetUsers: [],
            komuChannelId:data.komuChannelId,
            isNotifyToKomu: true,
            // isNoticeKMSubmitTS: data.isNoticeKMSubmitTS,
            // isNoticeKMRequestOffDate: data.isNoticeKMRequestOffDate,
            // isNoticeKMApproveRequestOffDate: data.isNoticeKMApproveRequestOffDate,
            // isNoticeKMRequestChangeWorkingTime:data.isNoticeKMRequestChangeWorkingTime,
            // isNoticeKMApproveChangeWorkingTime: data.isNoticeKMApproveChangeWorkingTime,           
            id: 0,
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
            id: 0,
        }
        //console.log(newpro);
        dispatch(newPost({newpro:newpro, getpro: getpro}));  
        props.setOpen(false);
        dispatch(setNewMove());
        dispatch(setResetTask());
        reset({
            name: "",
            code: "",
            timeStart: "",
            timeEnd: "",
            note: "",
            projectType: 1,
            customerId: 1,
            komuChannelId:"",
            isNoticeKMSubmitTS: false,
            isNoticeKMRequestOffDate: false,
            isNoticeKMApproveRequestOffDate: false,
            isNoticeKMRequestChangeWorkingTime:false,
            isNoticeKMApproveChangeWorkingTime: false,
            isAllUserBelongTo: false,
        }) 
        //dispatch(props.projectGet());
        
    };
    const closeCancel=()=>{
        props.setOpen(false);
        dispatch(setNewMove());
        dispatch(setResetTask());
        reset({
            name: "",
            code: "",
            timeStart: "",
            timeEnd: "",
            note: "",
            projectType: 1,
            customerId: 1,
            komuChannelId:"",
            isNoticeKMSubmitTS: false,
            isNoticeKMRequestOffDate: false,
            isNoticeKMApproveRequestOffDate: false,
            isNoticeKMRequestChangeWorkingTime:false,
            isNoticeKMApproveChangeWorkingTime: false,
            isAllUserBelongTo: false,
        }) ;
    }

    return(
        <div>
            <Dialog
                open={props.open}
                onClose={closeCancel}  
                maxWidth={"lg"}  
                fullWidth={true}          
            >                 
                <DialogTitle sx={{display:"flex",justifyContent: "space-between", borderBottom: "0.5px solid #80808054",padding: 0, marginLeft: "25px",marginRight: "25px"  }}>
                    <p><b>Create projects</b></p>
                    <Button onClick={closeCancel} sx={{color: "black"}}><CloseIcon /></Button>         
                </DialogTitle >               
                <DialogContent sx={{height: "500px"}}>                  
                    <Box>
                        <TabContext value={value1}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange}>
                                    <Tab label="General" value="1" />
                                    <Tab label="Team" value="2"/>
                                    <Tab label="Tasks" value="3"/>
                                    <Tab label="Notification" value="4" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                
                                <Generalproject 
                                    register={register}
                                    setValue={setValue}
                                    watch={watch}
                                    errors={errors}
                                />
                            </TabPanel>
                            <TabPanel value="2" sx={{overflowX: "scroll"}}>
                                <Teamproject
                                    register={register}
                                    //guiTeam={nhanTeam}
                                />
                            </TabPanel>
                            <TabPanel value="3">
                                <Taskproject
                                    //guiTask={nhanTask}
                                />
                            </TabPanel>
                            <TabPanel value="4">
                                <Notifiproject 
                                    register={register}
                                />
                            </TabPanel>
                        </TabContext>
                    </Box>  
                </DialogContent>
                <DialogActions sx={{marginLeft: "15px",marginRight: "15px"}}>
                    <Button variant="outlined" onClick={closeCancel}>Cancel</Button>
                    <Button 
                        disabled={watch("name").length>0 && watch("code").length>0 && watch("timeStart")!=="Invalid date" &&watch("timeStart") && watch("timeEnd") && watch("timeEnd")!=="Invalid date"?false:true}
                        sx={{backgroundColor: '#d9534f', color: 'white'}} 
                        onClick={handleSubmit(saveProject)} autoFocus
                    >   Save
                    </Button>         
                </DialogActions>            
            </Dialog>
        </div>
    )
}
export default Diaproject;