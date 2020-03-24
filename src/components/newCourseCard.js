import React, { Component } from 'react';

const initialStyle = {
    "box-shadow": "0 0 8px #4BA7EF",
    "border-radius": "1rem",
    "margin": "2rem",
    "padding": "2rem",
}

class NewCourseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const state = Object.assign({}, this.state);
        state.clicked = true;
        this.setState(state);
    }

    render() {
        if (this.state.clicked) {
            return (
                <div className="col-sm-6">
                    <div className="shadow" >
                        <div className="row">
                            <div className="col-sm-6">
                                <form onSubmit={this.props.handleSubmit}>
                                    <input type="text" placeholder="Enter class ID" style={this.props.inputStype} onChange={this.props.handleChangeID}/>
                                    <input type="submit" style={{textAlign: 'center'}} className="btn-upload" value="Create"/>
                                </form>
                            </div>
                            <div className="col-sm-6 text-plain-s">
                                Create a unique class ID<br/>
                                e.g. My ECON 101
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="col-sm-6"onClick={this.handleClick}>
                    <div style={initialStyle} >
                        <div className="row">
                            <div style={{"text-align": "center"}}>
                                <br/><br/><br/>
                                <h2 className="course-title">Create course</h2>
                                <br/><br/><br/><br/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default NewCourseCard;