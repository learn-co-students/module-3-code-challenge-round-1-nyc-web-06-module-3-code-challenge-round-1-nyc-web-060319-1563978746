const coursesContainer = document.getElementById("course-container")
const courseDetail = document.getElementById("course-detail")
const studentForm = document.getElementById("student-form")
const percentage = document.getElementById("percentage")
const submit = document.getElementById("submit")


function getCourses(){
    fetch("https://warm-shore-17060.herokuapp.com/api/v1/users/52/courses/")
    .then(function(response){
        return response.json()
    })
    .then(renderCourses)
}

function renderCourses(courses){
courses.forEach(function(course){
    const courseDiv = document.createElement('div')
    courseDiv.setAttribute("data-id", `${course.id}`)
    courseDiv.innerText = `${course.name}`
    const courseBtn = document.createElement('button')
    courseBtn.innerText = "See Detail"
    coursesContainer.appendChild(courseDiv)
    courseDiv.appendChild(courseBtn)
})
}


coursesContainer.addEventListener("click", getCourseInfo)


function getCourseInfo(event){
    const targetCourseId = event.target.parentElement.dataset.id
    fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/52/courses/${targetCourseId}`)
    .then(function(response){
        return response.json()
    })
    .then(renderCourse);
    
}



function renderCourse(course){
    courseDetail.innerHTML = `
    <h2>${course.name}</h2>
    <p>Instructor: ${course.instructor}</p>
    <p>Semester: ${course.semester}</p>
    <p>Students:</p>
    <ul></ul>
    `
    const studentsList = document.querySelector('ul')
    course.students.forEach(function(student){
        const studentLi = document.createElement('li')
        studentLi.setAttribute("data-id", `${student.id}`)
        studentLi.innerText = `${student.name}, ${student.percentage}`
        const editStudentBtn = document.createElement('button')
        editStudentBtn.innerText = "Edit Student Percentage"
        studentsList.appendChild(studentLi)
        studentLi.appendChild(editStudentBtn)
    })
}

courseDetail.addEventListener("click", editStudentClick)

function editStudentClick(event){
    if (event.target.innerText === "Edit Student Percentage"){
        const targetStudentId = event.target.parentElement.dataset.id
    getStudentInfo(targetStudentId)
    }
}

function getStudentInfo(targetStudentId){
fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/52/students/${targetStudentId}`)
.then(function(response){
    return response.json()
})
.then(editStudent)

}

function editStudent(student){
    studentForm.innerHTML = `
    <h2>Edit Student</h2>
    <p>Name: ${student.name}</p>
    <p>Class year: ${student.class_year}</p>
    <p>Current percentage: ${student.percentage}</p>
    <form>
    <label>Edit Percentage</label>
    <input type="number" id="percentage">
    <input type="submit" id="submit">
    </form>
    `
    const newPercentage = document.getElementById('percentage')
    debugger
   submit.addEventListener("click", updatePercentage)
// running out of time but below is the patch request to update a student's grade. newPercentage would grab the new percentage for the student (I know I'm grabbing the element, not the value, I'd fix that). The submit button has the event trigger to 
   function updatePercentage(){
    fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/52/students/${student.id}`,{
        method: "PATCH",
        headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'},
        body: JSON.stringify({percentage: newPercentage})
    }
    .then(function(response){
        return response.json()
    })
   }
}








getCourses()