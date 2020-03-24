import React, { Component, Fragment } from 'react'

import editIcon from '../Assets/images/edit-icon.png'
import CourseCardRow from './courseCardRow';

//axios
import { createCourse, getCourses } from '../store/axios'
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    static contextType = AuthContext;

    handleChangeID = e =>{
        const state = Object.assign({}, this.state);

        state.courseId = e.target.value;
        this.setState(state);
    }

    handleSubmit = async e =>{
        e.preventDefault()
        await createCourse(this.state.courseId);
        await this.loadCourses();
    }

    async loadCourses() {
        const { userID, schoolID } = this.context;
        const response = await getCourses(schoolID, userID);
        
<<<<<<< HEAD
        const allCourses = response.data
        const state = Object.assign({}, this.state);
=======
        
        const allCourses = response.data
        
        const state = Object.assign({}, this.state);
        console.log('state: ', state);


>>>>>>> 191d3fe1a7f62a2230afc905b7243cbf4c254647
        state.courses = allCourses;

        this.setState(state);
    }

    async componentDidMount() {
        await this.loadCourses();
    }

  render(){

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
                                    handleSubmit={this.handleSubmit}
                                    handleChangeID={this.handleChangeID}
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
                                    handleSubmit={this.handleSubmit}
                                    handleChangeID={this.handleChangeID}
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