import React from 'react';

import { Routes, Route} from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from './Components/Main/Home/Home';
import Projects from './Components/Projects/Projects';
import Tasks from './Components/Tasks/Tasks';
import Header from "./Components/Main/Home/Header";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/Main/Home" element={<Home />}>
                <Route path="Projects" element={<Projects />} />
                <Route path="Tasks" element={<Tasks/>} />
            </Route>                  
      </Routes>
    
    </div>
  );
}

export default App;
