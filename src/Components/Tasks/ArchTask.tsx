import axiosTv from "../../Api/axiosTv";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {Task} from '../../Intertype/Typetask';
import {useState} from 'react';

function ArchTask(e: any){
 
    const handleCloseArchive = () => {
        e.setOpenArchive(false);
    };

    const getData=()=>{
        if(e.taskGetAll){
            if(e.comtasks){
                const innews1=e.comtasks.map((Task: Task) => {
                    if(Task.id === e.indexarchive){
                        return {...Task, isDeleted: true};                   
                    } else{
                        return Task;
                    }
                })
                seTaskCom(innews1);
            }
            if(e.othtasks){
                const innews2=e.othtasks.map((Task: Task) => {
                    if(Task.id === e.indexarchive){
                        return {...Task, isDeleted: true};                   
                    } else{
                        return Task;
                    }
                })
                seTaskOth(innews2);
            }
        } 
    }
    const seTaskCom=(an: Task[])=>{
        e.guiTasksCom(an);
    }
    const seTaskOth=(an: Task[])=>{
        e.guiTasksOth(an);
    }  
 
    const taskArchive=(event: React.MouseEvent<HTMLButtonElement>)=>{          
        axiosTv.delete('api/services/app/Task/Archive', {
            params:{
                Id:e.indexarchive,
            }
        })         
        .then((data)=> {
            e.setOpenArchive(false);
        })
        .catch(function (error) {
            e.setOpenArchive(false);     
        });
        getData(); 
    }

    return(
        <div>
            <Dialog
                open={e.openarchive}
                onClose={handleCloseArchive}>                
                <DialogContent>                                
                    <h1>Are you sure?</h1>
                    <Button onClick={handleCloseArchive}>Cancel</Button>
                    <Button onClick={taskArchive}>Yes</Button>           
                </DialogContent>
            </Dialog>
            
        </div>
    )
}
export default ArchTask;