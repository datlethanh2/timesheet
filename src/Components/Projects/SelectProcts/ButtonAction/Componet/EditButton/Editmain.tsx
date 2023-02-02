import * as React from 'react';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Edittask from "./Edittask";
import Editteam from "./Editteam";
import Editclient from "./Editclient";
import Generalproject from "../../../../NewProject/Component/Generalproject";
import Notifiproject from "../../../../NewProject/Component/Notifiproject";
import {Newpro} from "../../../../../../Intertype/Typeproject";

function Editmain(props: any){

    const [value1, setValue1] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue1(newValue);
    };

    const {register, setValue, handleSubmit, watch} = useForm<Newpro>({
        defaultValues:{
            name: (props.projects)? props.projects.name: "hello",
            code: (props.projects)? props.projects.code: "hello",
            timeStart: (props.projects)? props.projects.timeStart: "hello",
            timeEnd: (props.projects)? props.projects.timeEnd: "hello",
            note: (props.projects)? props.projects.note: "hello",
            isAllUserBelongTo: (props.projects)? props.projects.isAllUserBelongTo: "hello",
            komuChannelId: (props.projects)? props.projects.komuChannelId: "hello",
            isNoticeKMSubmitTS: (props.projects)? props.projects.isNoticeKMSubmitTS: "hello",
            isNoticeKMRequestOffDate: (props.projects)? props.projects.isNoticeKMRequestOffDate: "hello",
            isNoticeKMApproveRequestOffDate: (props.projects)? props.projects.isNoticeKMApproveRequestOffDate: "hello",
            isNoticeKMRequestChangeWorkingTime: (props.projects)? props.projects.isNoticeKMRequestChangeWorkingTime: "hello",
            isNoticeKMApproveChangeWorkingTime: (props.projects)? props.projects.isNoticeKMApproveChangeWorkingTime: "hello",
        }
    });

    return(
        <div>
            <TabContext value={value1}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Genetal" value="1" />
                        <Tab label="Team" value="2" />
                        <Tab label="Tasks" value="3" />
                        <Tab label="Notification" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Editclient

                    />
                    <Generalproject 
                        register={register}
                        setValue={setValue}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <Editteam
                        projects={props.projects}
                        teamprojects={props.teamprojects}
                    />
                </TabPanel>
                <TabPanel value="3">
                    <Edittask 
                        projects={props.projects}
                        taskprojects={props.taskprojects}
                    />
                </TabPanel>
                <TabPanel value="4">
                    <Notifiproject
                        register={register}
                    />
                </TabPanel>
            </TabContext>  
        </div>
    )
}

export default Editmain;