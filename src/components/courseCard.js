import React, { Component } from 'react';
import { Link } from "react-router-dom"

import downloadIcon from '../Assets/images/download-icon-white.svg'
import tickIcon from '../Assets/images/tick-icon-white.svg'
import settingIcon from '../Assets/images/settings.svg'
import editIcon from '../Assets/images/edit-icon-white.svg'
import viewIcon from '../Assets/images/eye-icon-white.svg'

import { downloadDataForCourseURL } from '../store/axios';

class CourseCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            classId: props.course.classId,
            name: props.course.name,
            editing: false
        }

        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    static inputStype = {
        borderRadius: '0.5rem',
        width: '100%',
        marginBottom: '5px',
    }

    handleClickEdit() {
        const state = Object.assign({}, this.state);
        state.editing = true;
        this.setState(state);
    }

    handleChangeId(e) {
        const state = Object.assign({}, this.state);
        state.classId = e.target.value;
        this.setState(state);
    }

    handleChangeName(e) {
        const state = Object.assign({}, this.state);
        state.name = e.target.value;
        this.setState(state);
    }

    downloadCourseData() {
        window.location = downloadDataForCourseURL(this.props.course._id);
    } 

    renderView() {
        return (
            <div className="col-sm-6">
                <div className="shadow">
                    <div className="row ">
                        
                        <div className="col-sm-6">
                            <h2 className="course-title">{this.props.course.name}</h2>
                            <p>Class ID: {this.props.course.classId}</p>
                            <ul className="text-plain custom-list">
                                <li>{this.props.course.attendances ? this.props.course.attendances.length : 0} class{this.props.course.attendances && this.props.course.attendances.length === 1 ? '' : 'es'} recorded</li>
                                <li>{this.props.course.tests ? this.props.course.tests.length : 0} test{this.props.course.tests && this.props.course.tests.length === 1 ? '' : 's'} recorded</li>
                            </ul>
                            <button className="btn-setting" onClick={this.handleClickEdit}>
                                <img src={settingIcon} className="icon-sm" alt="setting icon"/>
                                &nbsp;Settings
                            </button>
                        </div>
                        
                        <div className="col-sm-6">
                            <Link to={{
                                pathname: '/professor/attendance',
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={tickIcon} className="icon-xs" alt="tick icon" />Take attendance</button>
                            </Link>
    
                            <Link to={{
                                pathname: '/professor/exam',
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}><img src={editIcon} className="icon-xs" alt="edit icon" />Proctor exam</button>
                            </Link>

                            <button className="btn-upload" onClick={this.downloadCourseData.bind(this)} style={{marginBottom: '5px', fontSize: 'medium'}}><img src={downloadIcon} className="icon-xs" alt="download icon" />Download data</button>

                            <Link to={{
                                pathname: `/professor/proctoring/${this.props.course._id}`,
                                state: {
                                    course: this.props.course,
                                }
                            }}>
                            <button className="btn-upload" style={{marginBottom: '5px', fontSize: 'medium'}}>
                                <img src={viewIcon} className="icon-xs" alt="download icon" />
                                View proctoring
                            </button>
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }

    renederEdit() {
        return (
            <div className="col-sm-6">
                <div className="shadow" >
                    <div className="row">
                        <div className="col-sm-6">
                            <form onSubmit={(e) => { this.props.handleSubmit(e, this.props.course._id, this.state.name, this.state.classId) }}>
                                <input type="text" placeholder="Enter a new class name" style={CourseCard.inputStype} onChange={this.handleChangeName} value={this.state.name}/>
                                <input type="text" placeholder="Enter a new class ID" style={CourseCard.inputStype} onChange={this.handleChangeId} value={this.state.classId}/>
                                <input type="submit" style={{textAlign: 'center'}} className="btn-upload" value="Submit"/>
                            </form>
                        </div>
                        <div className="col-sm-6 text-plain-s">
                            Enter a new class name<br/>
                            e.g. ECON 101<br/>
                            Enter a new class ID<br/>
                            e.g. My ECON 101
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.editing) {
            return this.renederEdit();
        }
        return this.renderView();
    }
}

export default CourseCard;