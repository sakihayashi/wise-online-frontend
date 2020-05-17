import React, { Component, Fragment } from 'react'

import editIcon from '../Assets/images/edit-icon.png'
import CourseCardRow from './courseCardRow';

//axios
import { createCourse, editCourse, getCourses } from '../store/axios'
import { AuthContext } from '../contexts/AuthContext'

class ProfessorCourse extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            inputStype: {
                borderRadius: '0.5rem',
                width: '100%',
                marginBottom: '5px',
            },
            courseName: '',
            courseId: '',
            courses: [],
        }

        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmitNewCourse = this.handleSubmitNewCourse.bind(this);
        this.handleSubmitEditCourse = this.handleSubmitEditCourse.bind(this);
    }
    
    static contextType = AuthContext;

    handleChangeID = e => {
        const state = Object.assign({}, this.state);

        state.courseId = e.target.value;
        this.setState(state);
    }

    handleChangeName = e => {
        const state = Object.assign({}, this.state);

        state.courseName = e.target.value;
        this.setState(state);
    }

    async handleSubmitEditCourse(e, courseId, name, classId) {
        e.preventDefault()
        await editCourse(courseId, name, classId);
        await this.loadCourses();
    }

    handleSubmitNewCourse = async e =>{
        e.preventDefault()
        await createCourse(this.state.courseName, this.state.courseId);
        await this.loadCourses();
    }

    async loadCourses() {
        // const { userID, schoolID } = this.context;
        const userID = sessionStorage.getItem('userID')
        const schoolID = sessionStorage.getItem('schoolID')
        
        let state = Object.assign({}, this.state);
        state.courses = [];
        this.setState(state);

        const response = await getCourses(schoolID, userID);
        console.log('res: ', response);
        
        const courses = response.data
        sessionStorage.setItem('courses', courses)
        state = Object.assign({}, this.state);

        state.courses = courses;

        this.setState(state);
    }

    async componentDidMount() {
  
        await this.loadCourses();

    }
    // componentWillUnmount() {
    //     clearInterval(this.timer);
    //   }
    // checkCookie(){
    // const { cookies } = this.context
    // console.log('cookies: ', cookies);
    
    // if(cookies === undefined){
    //     console.log('cookies expired: ', cookies);
        
    //     this.props.history.push('/professor-login')
    // }else{return}
    // }
    render() {
        return(
            <Fragment>
                <div className="container">
                        <img src={editIcon} className="page-icon" alt="login icon"/>
                        <div className="spacer-vertical"></div>
                    <h1>My Courses</h1>
                    {
                        (() => {
                            const rows = [];
    
                            for (let index = 0; index < this.state.courses.length; index++) {
                                if (index % 2){
                                    continue;
                                }
    
                                const course = this.state.courses[index];
                                const coursesForRow = [course];
    
                                if (index + 1 < this.state.courses.length) {
                                    coursesForRow.push(this.state.courses[index + 1]);
                                }
    
                                rows.push(
                                    <CourseCardRow 
                                        courses={coursesForRow}
                                        inputStype={this.state.inputStype}
                                        key={`CoursesRow${index}`} 
                                        lastRow={index >= this.state.courses.length - 1}
                                        handleSubmitNewCourse={this.handleSubmitNewCourse}
                                        handleChangeID={this.handleChangeID}
                                        handleChangeName={this.handleChangeName}
                                        handleSubmitEditCourse={this.handleSubmitEditCourse}
                                    />
                                );
                            }
    
                            if (this.state.courses.length % 2 === 0) {
    
                                rows.push(
                                    <CourseCardRow 
                                        courses={[]}
                                        inputStype={this.state.inputStype}
                                        key={`CoursesRowLast`} 
                                        lastRow={true}
                                        handleSubmitNewCourse={this.handleSubmitNewCourse}
                                        handleChangeID={this.handleChangeID}
                                        handleChangeName={this.handleChangeName}
                                        handleSubmitEditCourse={this.handleSubmitEditCourse}
                                    />
                                );
    
                            }
    
                            return rows;
                        })()
                    }
                
                </div>
            </Fragment>
        )

    }
}

export default ProfessorCourse;