import * as React from 'react';
import {UserNotPagging, Users, Listtask} from "../../../../../../Intertype/Typeproject";

function Editteam(props: any){

    const [teamview, setTeamView]=React.useState<Listtask[]>([]);
    const viewTeam =()=>{  
        if(props.teamprojects.length>0){
            if(props.projects){
                const listTeam= props.teamprojects.filter(( UserNotPagging:  UserNotPagging) => props.projects.users.some((Users: Users) => Users.userId ===  UserNotPagging.id));               
                listTeam.forEach(( UserNotPagging:  UserNotPagging)=>{
                    if(teamview.length !==listTeam.length){
                        teamview.push({
                            id: UserNotPagging.id,
                            name: UserNotPagging.name,
                        })
                    }                   
                })
            }                   
        }
    }
    viewTeam();

    return(
        <div>
            <ul>
                {teamview? teamview.map((Listtask:Listtask)=>{
                    return (
                        <li key={Listtask.id}>
                            {Listtask.name}
                        </li>
                    )
                }): null}
            </ul>
            <ul>
                <p>Select user</p>
                {props.teamprojects? props.teamprojects.map((UserNotPagging:UserNotPagging)=>{
                    return (
                        <li key={UserNotPagging.id}>
                            <p>{UserNotPagging.name}</p>
                        </li>
                    )
                }): null}
            </ul>
        </div>
    )
}
export default Editteam;