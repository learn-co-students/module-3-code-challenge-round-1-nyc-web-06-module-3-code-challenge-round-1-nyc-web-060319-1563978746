// document.addEventListener("DOMContentLoaded", function() {});

//deliverable #1 : INDEX
// see a list of courses

const courseContainer = document.querySelector("#course-container")

function getAllCourses(){
  fetch('https://warm-shore-17060.herokuapp.com/api/v1/users/57/courses')
  .then(function(response){
    return response.json()
  })
  .then(function(courses){
    courses.forEach(function(course){
    //get all courses
    const courseList = document.createElement("p")
    courseList.innerHTML = course.name
    courseList.dataset.id = course.id
    const courseInstructor = document.createElement("p")
    courseInstructor.innerHTML = course.instructor
    courseContainer.appendChild(courseInstructor)
    //courseSemester
    const courseSemester = document.createElement("p")
    courseSemester.innerHTML = course.semester
    courseContainer.appendChild(courseSemester)
    courseContainer.appendChild(courseList)
    //button for each course
    const seeDetailButton = document.createElement("button")
    seeDetailButton.innerHTML = "See Detail"
    courseContainer.appendChild(seeDetailButton)
    seeDetailButton.addEventListener("click",
      getStudentInfo
    )
    })
  })
}//end of getAllCourses
getAllCourses()

//***had to change my code b/cuz the deliverables and demo are a little different

//deliverable #2
// function getCourseDetail(courseList){
//   fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/57/courses/${courseList.dataset.id}`)
//   .then(function(response){
//     return response.json()
//   })
//   .then(function(course){
//     // const courseDetail = document.querySelector("#course-detail")
//     //courseName
//     // const courseName = document.createElement("p")
//     // courseName.innerHTML = course.name
//     // courseContainer.appendChild(courseName)
//     //courseInstrcutor
//     const courseInstructor = document.createElement("p")
//     courseInstructor.innerHTML = course.instructor
//     courseContainer.appendChild(courseInstructor)
//     //courseSemester
//     const courseSemester = document.createElement("p")
//     courseSemester.innerHTML = course.semester
//     courseContainer.appendChild(courseSemester)
//   })
// } //end of getCourseDetail

function getStudentInfo(){
  fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/57/students`)
  .then(function(response){
    return response.json()
  })
  .then(function(students){
    students.forEach(function(student){
      const courseDetail = document.querySelector("#course-detail")
      const studentList = document.createElement("p")
      studentList.innerHTML = student.name
      studentList.dataset.id = student.id
      courseDetail.appendChild(studentList)
      const studentPercentage = document.createElement("p")
      studentPercentage.innerHTML = student.percentage
      courseDetail.appendChild(studentPercentage)
      //should do the below code and load the form (even though i know its just floating on the page right now)
      studentList.addEventListener("click", function(){
        studentFormInfo})

      //the code below works so the eventListener should tech be working
      // studentList.addEventListener("click", function(){
      //   alert("hi")
      // })
    })
  })
}

function studentFormInfo(){
  // alert("not currently working")

  const studentForm = document.querySelector("#student-form")
  const studentName = studentForm.getElementsByTagName('input')[0].value
  const studentClassYear =  studentForm.getElementsByTagName('input')[1].value
  const studentPercentage =  studentForm.getElementsByTagName('input')[2].value
  // studentForm.appendChild(studentName)
  // studentForm.appendChild(studentClassYear)
  // studentForm.appendChild(studentPercentage)
  // studentForm.name =
}


function editStudentPercentage(studentList){
  fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/57/students/${studentList.dataset.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      //i wanted to put in the value of studentPercentage (on line 88) in for value of the percentage that I went to send over to the server so that it can update the database and then return the new updated student info
      percentage: "new percent" //this shoudld be the const studentPercentage
    })
  })
}
