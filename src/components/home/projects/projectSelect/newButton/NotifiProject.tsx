import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Notifiproject(props: any){


    return(
        <div>
             <div>
                <TextField 
                    fullWidth 
                    label="Komu Channel id" 
                    variant="standard"               
                    {...props.register("komuChannelId")} 
                /> 

                <FormControlLabel 
                    control={<Checkbox 
                        {...props.register("isNoticeKMSubmitTS")} 
                    />
                    } label="Submit timesheet" />
                <p></p>
                <FormControlLabel 
                    control={<Checkbox 
                        {...props.register("isNoticeKMRequestOffDate")} 
                    />
                    } label="Request Off/Remote/Onsite/Đi muộn, về sớm" />
                <p></p>
                <FormControlLabel 
                    control={<Checkbox 
                        {...props.register("isNoticeKMApproveRequestOffDate")} 
                    />
                    } label="Approve/Reject Request Off/Remote/Onsite/Đi muộn, về sớm" />
                <p></p>
                <FormControlLabel 
                    control={<Checkbox 
                        {...props.register("isNoticeKMRequestChangeWorkingTime")} 
                    />
                    } label="Request Change Working Time" />
                <p></p>
                <FormControlLabel 
                    control={<Checkbox 
                        {...props.register("isNoticeKMApproveChangeWorkingTime")} 
                    />
                    } label="Approve/Reject Change Working Time" />
            </div>
        </div>
    )
}

export default Notifiproject;