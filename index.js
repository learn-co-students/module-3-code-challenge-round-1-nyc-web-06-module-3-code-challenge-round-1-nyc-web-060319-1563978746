const COURSES_URL = "https://warm-shore-17060.herokuapp.com/api/v1/users/56/courses"
const STUDENTS_URL = "https://warm-shore-17060.herokuapp.com/api/v1/users/56/students"
const courseContainer = document.querySelector('#course-container')
const courseDetail = document.querySelector('#course-detail')
const studentForm = document.querySelector('#student-form')

function getEverything() {
  fetch(COURSES_URL)
  .then(resp => resp.json())
  .then(courseObjects => renderCourses(courseObjects))
}
getEverything()

function renderCourses(courses) {
  courses.forEach(course => addSingleCourseToPage(course))
}

function addSingleCourseToPage(course) {
  courseContainer.innerHTML += `
    <p id=${course.id}> ${course.name} </p>
    <p> ${course.instructor} </p>
    <p> ${course.semester} </p>
    <button id=${course.id}> See Detail </button>
  `
}
courseContainer.addEventListener('click', (e) => {
  const courseId = e.target.id
  getSingleCourse(courseId)
  console.log(courseId)
})

function getSingleCourse(courseId) {
  // console.log(`${COURSES_URL}/${courseId}`)
  fetch(`${COURSES_URL}/${courseId}`)
  .then(resp => resp.json())
  .then(fullClass => renderStudent(fullClass.students))
  let students = fullClass.students
}

function renderStudent(students) {
  // console.log(students)
  students.forEach(student => addSingleStudent(student))
}

function addSingleStudent(student) {
  courseDetail.innerHTML += `
    <li id=${student.id}> ${student.name} ${student.percentage}</li>
  `
//need to fix, each list of students is adding to whole list
}

courseDetail.addEventListener('click', (e) => {
  // console.log(e.target.parentElement)
	const studentId = e.target.id
  getSingleStudent(studentId)
})

function getSingleStudent(studentId) {
  console.log(`${STUDENTS_URL}/${studentId}`)
  fetch(`${STUDENTS_URL}/${studentId}`)
  .then(resp => resp.json())
  .then(student => renderSingleStudent(student))
}

function renderSingleStudent(student) {
  studentForm.innerHTML = `
  <p id=${student.id}> ${student.name} </p>
  <p> ${student.class_year} </p>
  <p id="studentPercentage"> ${student.percentage} </p>
  <form> Percentage <input type="text"          value="${student.percentage}"> </form>
  <button data-id=${student.id}> Save </button>
  `
}
studentForm.addEventListener('click', (e) => {
  // console.log(e.target.dataset.id)
  console.log(e.target)
  debugger
//   if (e.target.innerText === 'Save') {
//     updateStudent(e)
//   }
// })
// function updateStudent(e) {
//   console.log(e.target.dataset.id)
//   studentId = e.target.dataset.id
//   fetch(`${STUDENTS_URL}/${studentId}` {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       percentage: e.target.parentElement.
//     })
//   }
//ran out of time, needed to grab percentage element and update it to the input.value with a PATCH
})
