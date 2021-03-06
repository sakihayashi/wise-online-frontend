const axios = require('axios');
// const baseURL = 'http://localhost:8080/';
const baseURL = 'https://internal-wiseattendonline.appspot.com/' // URL for hosted backend for test

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/* const baseURL = 'https://wiseonlineattend.appspot.com/' // DO NOT USE! URL for hosted production.*/ 
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/


axios.defaults.withCredentials = true

const backend = axios.create({
        baseURL,
        timeout: 5000,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        withCredentials: true,
        validateStatus: () => true,
})


  // Alter defaults after instance has been created

/* ----------------------------------------
    Logins
------------------------------------------*/

async function adminLogin(email, password) {
    const response = await backend.post('admin/login', {email, password})
    
    return response;
}

async function professorLogin(email, password) {
    const response = await backend.post('professor/login', {email, password});
    return response;
}

async function studentLogin(email, studentId) {
    const response = await backend.post('student/login', {email, password : studentId});
    return response;
}

async function logout() {
    const response = await backend.post('student/login', {});
    return response;
}

/* ----------------------------------------
    Unprotected Routes
------------------------------------------*/

async function createSchool(name, setupKey, email, password) {
    const response = await backend.post('admin/createSchool', {name, setupKey, email, password});
    return response;
}

async function claimProfessorAccount(setupKey, email, password) {
    const response = await backend.post('professor/claimAccount', {setupKey, email, password});
    return response;
}

/* ----------------------------------------
    Admin Routes
------------------------------------------*/

async function postFiles(professorFile, studentFile) {
    var formData = new FormData();
    formData.append('professorFile', professorFile)
    formData.append('studentFile', studentFile)
    const response = await backend.post('admin/setupSchool', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 60000,
    });
    return response;
}

async function adminRequestResetPW(email) {
    const response = await backend.post('/admin/requestPasswordReset', email);
    return response;
}
async function resetAdminPW(data){
    const response = await backend.post('/admin/resetPassword', data)
    return response
}

async function adminDownloadDataByCourseURL(termId) {
    // return baseURL + 'admin/courses/attendanceData/:id' + termId;
    const response = await backend.get('/admin/courses/attendanceData/', termId);
    return response;
}

async function adminDownloadDataByProfessorURL(termId) {
    // return baseURL + 'admin/professors/attendanceData/:id' + termId;
    const response = await backend.get('/admin/professors/attendanceData/', termId);
    return response;
}

async function adminDownloadDataByStudentURL(termId) {
    const response = await backend.get('admin/students/attendanceData/', termId);
    return response;
}

async function adminEditTerm(termId, name){
    const response = await backend.post('/admin/terms/edit', {termId, name})
    return response;
}

function getStudentTemplateURL() {
    return baseURL + 'admin/studentTemplate';
}

function getProfessorTemplateURL() {
    return baseURL + 'admin/professorTemplate';
}

async function getTerms(admin) {
    const response = await backend.get('admin/terms', admin);
    return response;
}

async function createTerm(termId, name) {
    const response = await backend.post('/admin/terms/create', {termId, name});
    return response;
}

async function  setCurrentTerm(termId) {
    const response = await backend.post('/admin/terms/setAsCurrent', {termId})
    return response;
}

/* ----------------------------------------
    Professor Routes
------------------------------------------*/

async function createCourse(name, classId, students) {
    const response = await backend.post('professor/createCourse', {name, classId, students});
    return response;
}
async function professorRequestResetPW(email) {
    const response = await backend.post('/professor/requestPasswordReset', email);
    return response;
}
async function resetProfessorPW(data){
    const response = await backend.post('/professor/resetPassword', data)
    return response
}

async function editCourse(courseId, name, classId) {
    const response = await backend.post('professor/editCourse', {id: courseId, name, classId});
    return response;
}

async function startAttendance(courseId) {
    const response = await backend.post('professor/startAttendance', {courseId});
    return response;
}

async function startTest(courseId) {
    const response = await backend.post('professor/startTest', {courseId});
    return response;
}

function downloadDataForCourseURL(courseId) {
    return baseURL + 'professor/course/attendanceData/' + courseId;
}

async function getImage(testAttendanceId, imageNumber) {
    const response = await backend.get(`professor/testResults/${testAttendanceId}/images/${imageNumber}`);
    const image = response.data;
    return image;
}

async function getScreenshot(testAttendanceId, screenshotNumber) {
    const response = await backend.get(`professor/testResults/${testAttendanceId}/screenshots/${screenshotNumber}`);
    const image = response.data;
    return image;
}

/* ----------------------------------------
    Student Routes
------------------------------------------*/

async function markAttendance(classId, keyCode) {
    const response = await backend.post('student/markAttendance', {classId, keyCode});
    return response;
}

async function takeTest(classId, keyCode) {
    const response = await backend.post('student/takeTest', {classId, keyCode});
    return response;
}

// testAttendanceId will be returned as part of the response from takeTest()
async function submitConfidenceScore(testAttendanceId, confidenceScore, image) {
    const response = await backend.post('student/submitConfidenceScore', {testAttendanceId, confidenceScore, image});
    return response;
}

// testAttendanceId will be returned as part of the response from takeTest()
async function submitScreenshot(testAttendanceId, screenshot) {
    const response = await backend.post('student/submitScreenshot', {testAttendanceId, screenshot});
    return response;
}

async function submitTabs(testAttendanceId, tabs) {
    const response = await backend.post('student/submitTabs', {testAttendanceId, tabs});
    return response;
}

async function submitProctoringError(testAttendanceId, errorMessage) {
    const response = await backend.post('student/submitProctoringError', {testAttendanceId, errorMessage});
    return response;
}

async function submitFeeWaive(data) {
    const response = await backend.post('student/waiveFee', data);
    return response;
}
async function studentAgreeToTerms(student){
    const response = await backend.post('/student/agreeToTerms', student)
    return response;
}

/* ----------------------------------------
    Get Routes
------------------------------------------*/

async function getCourses(school, professor) {
    const response = await backend.post('get/courses', {school, professor});
    return response;
    
}

async function getTestsByCourse(professor, data) {
    const response = await backend.get(`/professor/courses/${data}/tests`, professor);
    return response;
}

// const tests = await testController.testsForCourse(professor, {courseId: ctx.params.courseId});

async function getTestResults(professor, data){
    const response = await backend.get(`/professor/tests/${data}/results`, {professor, data});
    return response;
}
async function getTestImage(testId, imgNum){
    const response = await backend.get(`/professor/testResults/${testId}/images/${imgNum}`);
    return response;
}

async function getStudents(school, professor, course) {
    const response = await backend.post('get/students', {school, professor, course});
    return response;
}
async function getSchoolNames() {
    const response = await backend.get('schools/active');
    return response;
}

export {
    adminLogin,
    professorLogin,
    studentLogin,
    logout,
    createSchool,
    claimProfessorAccount,
    adminDownloadDataByCourseURL,
    adminDownloadDataByProfessorURL,
    adminDownloadDataByStudentURL,
    getStudentTemplateURL,
    getProfessorTemplateURL,
    createCourse,
    editCourse,
    startAttendance,
    startTest,
    downloadDataForCourseURL,
    markAttendance,
    takeTest,
    submitConfidenceScore,
    submitScreenshot,
    submitTabs,
    submitProctoringError,
    getCourses,
    getStudents,
    postFiles,
    adminRequestResetPW,
    professorRequestResetPW,
    getSchoolNames,
    submitFeeWaive,
    resetAdminPW,
    resetProfessorPW,
    studentAgreeToTerms,
    getImage,
    getScreenshot,
    getTestsByCourse,
    getTestResults,
    getTestImage,
    getTerms,
    adminEditTerm,
    createTerm,
    setCurrentTerm,
}