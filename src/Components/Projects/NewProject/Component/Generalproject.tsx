import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function Generalproject(props: any){

    return(
        <div>

            <b>Project Name*</b>
            <TextField 
                fullWidth 
                label="Project Name" 
                {...props.register("name", { required: true })} 
            /> 
            <b>Project Code*</b>
            <TextField 
                fullWidth 
                label="Project Code" 
                {...props.register("code", { required: true })} 
            /> 
            <b>Date*</b>
            <TextField 
                id="date"
                fullWidth 
                type="date" 
                //label="Start at"
                {...props.register("timeStart", { required: true })} 
            /> 
             <TextField 
                id="date"
                fullWidth 
                type="date" 
                //label="End at"
                {...props.register("timeEnd", { required: true })} 
            /> 

            <p><b>Note</b></p>
            <TextField 
                fullWidth 
                label="Note"                
                {...props.register("note", { required: true })} 
            /> 

            <b>All User</b>
            <FormControlLabel 
                control={<Checkbox 
                    {...props.register("isAllUserBelongTo", { required: true })} 
                />
            } label="Auto add user as a member of this project when creating new user" />

            <b>Project Type*</b>            
            <button onClick={()=>props.setValue("projectType", 0)}>T&M </button>
            <button onClick={()=>props.setValue("projectType", 1)}>Fixed Frice</button>
            <button onClick={()=>props.setValue("projectType", 2)}>Non-Bill</button>
            <button onClick={()=>props.setValue("projectType", 3)}>ODC</button>
            <button onClick={()=>props.setValue("projectType", 4)}>Product</button>
            <button onClick={()=>props.setValue("projectType", 5)}>Training</button>
            <button onClick={()=>props.setValue("projectType", 6)}>No Salary</button>        
        </div>
    )
}

export default Generalproject;