const COURSE_URL = 'https://warm-shore-17060.herokuapp.com/api/v1/users/55/courses'
const STUDENT_URL = 'https://warm-shore-17060.herokuapp.com/api/v1/users/55/students'
const coursesContainer = document.querySelector('#course-container')
const courseDetailContainer = document.querySelector('#course-detail')
const studentForm = document.querySelector('#student-form')
let targetStudent;

fetch(COURSE_URL)
    .then(function(response) {
        return response.json()
    })
    .then(showCourses)
    .then(addCourseListener)

function showCourses(courses) {
    courses.forEach(function(course){
        coursesContainer.innerHTML += `  
            <h2>${course.name}</h2>
            <ul>
                <li>${course.instructor}</li>
                <li>${course.semester}</li>
            </ul>
            <button id=show-more data-id=${course.id}>See Detail</button>
        `
    })
}

function addCourseListener() {
    coursesContainer.addEventListener('click', function(event) {
        const showMoreButton = document.querySelector('#show-more')
        if (showMoreButton.innerText === 'See Detail') {
            courseDetailContainer.innerHTML = ''
            fetchSingleCourse(event)
        }
    })
}

function addStudentListener() {
    courseDetailContainer.addEventListener('click', function(event){
            // targetStudent = student
            studentForm.innerHTML = ''
            showStudentDetail(event)
        
    })
}

function fetchSingleCourse(event) {
    let courseId = event.target.dataset.id
    fetch(`${COURSE_URL}/${courseId}`)
        .then(function(response) {
            return response.json()
        })
        .then(renderStudents)
}

function renderStudents(course) {
    course.students.forEach(function(student) {
        // console.log(student)
        courseDetailContainer.innerHTML += `
        <li id=show-student data-id=${student.id}>${student.name} ${student.percentage}</li>
        `
        addStudentListener()
    })
}

function showStudentDetail(event) {
    fetchStudentDetail(event)
}

function fetchStudentDetail(event) {
    // debugger
    let studentId = event.target.dataset.id
    fetch(`${STUDENT_URL}/${studentId}`)
    .then(function(response) {
        return response.json()
    })
    .then(renderSingleStudent)
}

function renderSingleStudent(student) {
    studentForm.innerHTML = `
        <form>
            Name: ${student.name}<br>
            Grade: ${student.class_year}<br>
            Percentage: ${student.percentage}<br>
         <input type="text" value='new percent'>
        </form>
    `
    // need to grab value and set it to variable so i can pass that through to the fetch below
    // value will go into the *add here* that the function below is accepting
}

// function updateStudentDetail(*ADD HERE*) {
//     debugger
//     fetch(`${STUDENT_URL}/${studentId}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//             percentage: 'new percent'
//         })
//     })
//     .then(function(response){
//         return response.json()
//     })
//     .then(changePercentage)
// }

// function changePercentage(student) {
//     debugger
// }