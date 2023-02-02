import axiosTv from "../../Api/axiosTv";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {Task} from '../../Intertype/Typetask';

function ArchTask(e: any){
 
    const handleCloseUnarchive = () => {
        e.setOpenUnarchive(false);
    };

    const getData=()=>{
        if(e.taskGetAll){
            if(e.comtasks){
                const innews1=e.comtasks.map((Task: Task) => {
                    if(Task.id === e.indexarchive){
                        return {...Task, isDeleted: false};                   
                    } else{
                        return Task;
                    }
                })
                seTaskCom(innews1);
            }
            if(e.othtasks){
                const innews2=e.othtasks.map((Task: Task) => {
                    if(Task.id === e.indexarchive){
                        return {...Task, isDeleted: false};                   
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

    const taskUnarchive=(event: React.MouseEvent<HTMLButtonElement>)=>{   
        axiosTv.post('api/services/app/Task/DeArchive', {
            id: e.indexunarchive,
        })         
        .then((data)=> {
            console.log(data);
            e.setOpenUnarchive(false); 
        })
        .catch(function (error) {
            e.setOpenUnarchive(false);        
        });
        getData();
    }

    return(
        <div>
             <Dialog
                open={e.openunarchive}
                onClose={handleCloseUnarchive}>                
                <DialogContent>                                
                    <h1>Are you sure?</h1>
                    <Button onClick={handleCloseUnarchive}>Cancel</Button>
                    <Button onClick={taskUnarchive}>Yes</Button>           
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default ArchTask;