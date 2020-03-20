import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route
   } from "react-router-dom";

//components
import AdminLogin from '../components/adminLogin'
import StudentLogin from '../components/studentLogin'
import ProfessorLogin from '../components/professorLogin'
import SchoolLogin from '../components/schoolLogin'
import ProfessorCourse from '../components/professorCourse'
import StudentDashboard from '../components/studentDashboard'
import StudentClass from '../components/studentClass'
import StudentClassAtt from '../components/studentClassAtt'
import AdminDownload from '../components/adminDownload'
import SchoolStep1 from '../components/createSchoolStep1'
import SchoolStep2 from '../components/createSchoolStep2'
import SelectRole from '../components/selectRole'

//pages
import CreateSchoolPage from './CreateSchoolPage'
import SetUpSchoolPage from '../components/SetUpSchoolPage';
import StudentTest from '../components/studentTest';


class HomePage extends Component {
  render(){
      return(
          <Router>
            <div className="wrap">
                <div className="page-header"></div>

                <Switch>
                        <Route path="/set-up-school" component={SetUpSchoolPage} />
                        <Route path="/create-school/step2" component={SchoolStep2} />
                        <Route path="/create-school" component={SchoolStep1} />
                        {/* <Route path="/create-school" component={CreateSchoolPage} /> */}
                        <Route path="/admin/download" component={AdminDownload} />
                        <Route path="/set-up-school" component={SetUpSchoolPage} />
                        <Route path="/select-role" component={SelectRole} />
                        <Route path="/admin-login" component={AdminLogin} />
                        <Route path="/professor-login" component={ProfessorLogin} />
                        <Route path="/professor-course" component={ProfessorCourse} />
                        <Route path="/student-login" component={StudentLogin} />
                        <Route path="/student/dashboard" component={StudentDashboard} />
                        <Route path="/student/classes" component={StudentClass} />
                        <Route path="/student/tests" component={StudentTest} />
                        <Route path="/student/class/attendance" component={StudentClassAtt} />
                        <Route exact path="/" component={SchoolLogin} />   
                </Switch>   
            </div>
          </Router>
      )
  }
}

export default HomePage;