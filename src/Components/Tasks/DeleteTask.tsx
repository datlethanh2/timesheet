import axiosTv from "../../Api/axiosTv";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {Task} from '../../Intertype/Typetask';

function DeleteTask(e: any){
 
    const handleCloseDelete = () => {
        e.setOpenDelete(false);
    };
    const taskDelete=(event: React.MouseEvent<HTMLButtonElement>)=>{   
        axiosTv.delete('api/services/app/Task/Delete', {
            params:{
                Id:e.indexdelete,
            }
        })         
        .then((data)=> {
            e.setOpenDelete(false);
            e.taskGetAll();
        })
        .catch(function (error) {
            e.setOpenDelete(false);        
        });
    }

    return(
        <div>
             <Dialog
                open={e.opendelete}
                onClose={handleCloseDelete}>                
                <DialogContent>                                
                    <h1>Are you sure?</h1>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={taskDelete}>Yes</Button>           
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default DeleteTask;