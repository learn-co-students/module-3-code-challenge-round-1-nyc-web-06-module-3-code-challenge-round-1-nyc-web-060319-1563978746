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
    const courseList = document.createElement("p")
    courseList.innerHTML = course.name
    courseContainer.appendChild(courseList)
    })
  })

}

getAllCourses()
