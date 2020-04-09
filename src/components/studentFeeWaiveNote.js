import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import educationIcon from '../Assets/images/wise-education.png'

const StudentFeeWaiveNote = (props) => {

    // const { cookies } = useContext(AuthContext)
    // const checkCookie = ()=>{
    //     if(cookies === undefined){
    //         props.history.push('/student-login')
    //     }else{return}
    // }
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         checkCookie()
    //     }, 300000);
    //     return () => clearInterval(interval)
    // })

    return ( 
        <React.Fragment>
            <div className="container">
                <img src={educationIcon} className="page-icon" alt="wise education icon"/>
                <div className="spacer-vertical"></div>
                <h1>Input your information</h1>
                <div className="spacer-vertical"></div>
                <div className="width-slim">
                   <p className="text-plain">
                   Please enter the correct information associated with your school to ensure that your free-waiver is successful.
                   </p>
                </div>
                <div className="spacer-vertical"></div>
                <Link to="fee-waiver-form">
                    <button className="btn">Next</button>
                </Link>
                
            </div>
        </React.Fragment>
     );
}
 
export default StudentFeeWaiveNote;