import { Routes, Route, Navigate} from "react-router-dom";
import Login from "../components/login/Login";
import Main from "../components/home/main/Main";
import Projects from "../components/home/projects/MainProjects";
import Tasks from "../components/home/task/MainTasks";

function Layout() {

    return (
        <div>
            <Routes>
                <Route path="/" element={localStorage.getItem('accessToken')?<Navigate to="/Home/Main" />:<Login />} /> 
                <Route path="/Home/Main" element={localStorage.getItem('accessToken')?<Main />:<Navigate to="/" />}>
                    <Route path="Projects" element={<Projects />} />
                    <Route path="Tasks" element={<Tasks/>} />
                </Route>             
            </Routes>
        </div>
    );
  }
  
  export default Layout;
  