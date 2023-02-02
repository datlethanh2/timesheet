import * as React from 'react';
import { useState} from 'react';
import { useForm } from "react-hook-form";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Generalproject from './Generalproject';
import Teamproject from './Teamproject';
import Notifiproject from './Notifiproject';
import Taskproject from './Taskproject';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Newclient from './Newclient';
import axiosTv from '../../../../Api/axiosTv';
import {Newpro, UserNotPagging, Users, Task, Taskp} from "../../../../Intertype/Typeproject"


function Diaproject(e: any){

    const [open, setOpen] = useState(false); 
    const handleClose = () => {
        e.setOpen(false);
    };

    const {register, setValue, handleSubmit, watch} = useForm<Newpro>();

    // console.log("a", watch("projectTargetUsers.0.roleName"));

    const [value1, setValue1] = React.useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue1(newValue);
    };

   
    const [customerid, setCustomerId]=useState<number>(1);
    const nhanText=(id: string)=>{
        setCustomerId(Number(id));
    }

    const [users, setUsers]=useState<UserNotPagging[]>([]);
    
    const nhanTeam=(index: UserNotPagging[])=>{
        setUsers(index);
    }
    //console.log("b:", user);

    const [task, setTask]=useState<Task[]>([]);
    const nhanTask=(index: Task[])=>{
        setTask(index);
    }

    const saveProject= async(data:Newpro)=>{
        const user: Users[]=([]);
        users.forEach((UserNotPagging) =>
            user.push({
                id: 0,
                userId: UserNotPagging.id,
                isTemp: false,
                type: UserNotPagging.type,
            })
        );
        const taskp: Taskp[]=([]);
        task.forEach((Task) =>
            taskp.push({
                taskId: Task.id,
                billable: !Task.isDeleted,
                id: 0,
            })
        );  

        //console.log("a:", taskp);
        axiosTv({
            method: 'post',
            url: 'api/services/app/Project/Save',
            data:{
                name: data.name,
                code: data.code,
                status: 1,
                timeStart: data.timeStart,
                timeEnd: data.timeEnd,
                note: data.note,
                projectType: data.projectType,
                customerId: customerid,
                tasks: taskp,
                users: user,
                projectTargetUsers: [],
                komuChannelId:data.komuChannelId,
                isNotifyToKomu: true,
                isNoticeKMSubmitTS: data.isNoticeKMSubmitTS,
                isNoticeKMRequestOffDate: data.isNoticeKMRequestOffDate,
                isNoticeKMApproveRequestOffDate: data.isNoticeKMApproveRequestOffDate,
                isNoticeKMRequestChangeWorkingTime:data.isNoticeKMRequestChangeWorkingTime,
                isNoticeKMApproveChangeWorkingTime: data.isNoticeKMApproveChangeWorkingTime,
                isAllUserBelongTo: data.isAllUserBelongTo,
                id: 0,
            }
            })           
            .then((data)=> {
                e.setOpen(false); 
            })
            .catch(function (error) {
                console.log(error);
                e.setOpen(false);         
            });
    };



    return(
        <div>
             <Dialog
                open={e.open}
                onClose={handleClose}           
            >                
                <DialogContent>                  
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value1}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="General" value="1" />
                                <Tab label="Team" value="2" />
                                <Tab label="Tasks" value="3" />
                                <Tab label="Notification" value="4" />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Newclient
                                   guiText={nhanText}
                                />
                                <Generalproject 
                                    register={register}
                                    setValue={setValue}
                                />
                            </TabPanel>
                            <TabPanel value="2">
                                <Teamproject
                                    register={register}
                                    guiTeam={nhanTeam}
                                />
                            </TabPanel>
                            <TabPanel value="3">
                                <Taskproject
                                    guiTask={nhanTask}
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
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(saveProject)} autoFocus>Save</Button>         
                </DialogActions>   
            </Dialog>
        </div>
    )
}
export default Diaproject;