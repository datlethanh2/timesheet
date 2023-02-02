import ProjectSelect from './SelectProcts/ProjectSelect';
import Viewproject from './SelectProcts/Viewproject';
import Newproject from './NewProject/Newproject';

function Projects() {

   

    return (
      <div>
          <Newproject/>
          <ProjectSelect />
          <Viewproject />
      </div>
    );
  }
  
  export default Projects;