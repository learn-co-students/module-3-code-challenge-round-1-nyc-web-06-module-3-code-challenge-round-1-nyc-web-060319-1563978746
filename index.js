// document.addEventListener("DOMContentLoaded", function () { });
const COURSES_URL = 'https://warm-shore-17060.herokuapp.com/api/v1/users/54/courses/'
const STUDENTS_URL = 'https://warm-shore-17060.herokuapp.com/api/v1/users/54/students/'

fetch(COURSES_URL).then(
    res => res.json()
).then(
    courses => displayCourses(courses)
)

function displayCourses(courses) {
    const coursesContainer = document.querySelector('#course-container')

    courses.forEach(
        function (course) {
            const courseContainer = document.createElement('div')
            courseContainer.innerText =
                `Name: ${course.name}\nInstructor: ${course.instructor}\nSemester: ${course.semester}\n`
            const detailButton = document.createElement('button')
            detailButton.innerText = 'See Detail'
            detailButton.dataset.courseId = course.id
            detailButton.className = 'detail-button'
            courseContainer.appendChild(detailButton)
            coursesContainer.appendChild(courseContainer)
        }
    )
    coursesContainer.addEventListener('click', loadStudents)
}

function loadStudents(event) {
    if (event.target.className === 'detail-button') {
        const courseId = event.target.dataset.courseId
        fetch(`${COURSES_URL}${courseId}`).then(
            res => res.json()
        ).then(
            course => displayStudents(course.students)
        )
    }
}

function displayStudents(students) {
    document.querySelector('#student-form').innerHTML = ""
    studentsContainer = document.querySelector('#course-detail')
    studentsContainer.innerHTML = ''
    studentsList = document.createElement('ul')
    students.forEach(
        function (student) {
            studentLi = document.createElement('li')
            studentLi.innerText =
                `${student.name}: ${student.percentage}`
            studentLi.dataset.studentId = student.id
            studentsList.appendChild(studentLi)
        }
    )
    studentsContainer.appendChild(studentsList)
    studentsContainer.addEventListener('click', loadStudent)
}

function loadStudent(event) {
    if (event.target.nodeName === 'LI') {
        const studentId = event.target.dataset.studentId
        fetch(`${STUDENTS_URL}${studentId}`).then(
            res => res.json()
        ).then(
            student => makeStudentForm(student)
        )

    }
}

function makeStudentForm(student) {
    const formDiv = document.querySelector('#student-form')
    formDiv.innerHTML = ""
    formDiv.innerText = `${student.name}\n\n${student.class_year}\n\n${student.percentage}`
    const studentForm = document.createElement('form')
    const percentInput = document.createElement('input')
    percentInput.type = 'text'
    percentInput.value = student.percentage
    const submitButton = document.createElement('input')
    submitButton.type = 'submit'
    studentForm.appendChild(percentInput)
    studentForm.appendChild(submitButton)
    studentForm.dataset.studentId = student.id
    studentForm.addEventListener('submit', changeStudent)
    formDiv.appendChild(studentForm)
}

function changeStudent(event) {
    event.preventDefault()
    const studentId = event.target.dataset.studentId
    const data = {
        percentage: event.target.children[0].value
    }
    options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(`${STUDENTS_URL}${studentId}`, options).then(
        res => res.json()
    ).then(
        student => reloadStudentData(student)
    )
}

function reloadStudentData(student) {
    makeStudentForm(student)
    const studentListContainer = document.querySelector('#course-detail')
    const liToUpdate = studentListContainer.querySelector(`[data-student-id='${student.id}']`)
    liToUpdate.innerText = `${student.name}: ${student.percentage}`
}