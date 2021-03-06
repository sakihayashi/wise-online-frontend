import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"

import editIcon from '../Assets/images/edit-icon.png'

//axios
import { startAttendance, logout } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'

class ProfessorAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendanceCode: '',
            course: {
                classId: '...',
            },
        }
    }

    static contextType = AuthContext;

    async loadAttendance(course) {
        const response = await startAttendance(course._id);
        console.dir(response.data);
        if(response.status === 401){
            sessionStorage.clear();
            logout()
            this.props.history.push({
                pathname: '/professor-login',
                state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
              })
        }else{
            const attendanceData = response.data;
            const state = Object.assign({}, this.state);
    
            state.attendanceCode = attendanceData.keyCode;
            this.setState(state);
        }
        
    }
    
    componentDidMount() {
        console.log('mounted');
        const { course } = this.props.location.state;
        console.log('course:');
        console.dir(course);

        const state = Object.assign({}, this.state);
        state.course = course;
        this.loadAttendance(course);
        this.setState(state);

        this.timer = setInterval(
            () => this.checkCookie(),
            
            300000
          );
    }
    componentWillUnmount() {
        clearInterval(this.timer);
      }
    checkCookie(){
    const { cookies } = this.context
    console.log('cookies: ', cookies);
    
    if(cookies === undefined){
        this.props.history.push('/professor-login')
    }else{return}
    }
    render(){
        const { attendanceCode } = this.context
        return(
            <Fragment>
                <div className="container">
                    <img src={editIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>Attendance Started for {this.state.course.classId}</h1>
                    <div className="spacer-vertical"></div>
                    
                    <div className='jumbo-text text-plain'>
                        {this.state.attendanceCode}
                    </div>

                    <div className="spacer-vertical-s"></div>
                    <p className="text-plain xlarge-text width-50">
                    {attendanceCode}
                    Write this code down, and provide it to your students during class.
                    </p>
                    <div className="spacer-vertical"></div>
                    <Link to="/professor/course">
                        <button className="btn">Done</button>
                    </Link>
                </div>
            </Fragment>
        )
    }
}

export default ProfessorAttendance;