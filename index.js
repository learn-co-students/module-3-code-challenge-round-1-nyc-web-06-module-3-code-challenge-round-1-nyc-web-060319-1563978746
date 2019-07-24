function fetchAllCourses() {
  const allCoursesData = fetch('https://warm-shore-17060.herokuapp.com/api/v1/users/49/courses')
  allCoursesData
  .then(res => res.json())
  .then(body =>{
    displayAllCourses(body)
  })
}

function displayAllCourses(body) {
  const courseContainer = document.querySelector('#course-container')
  body.forEach(function(course){
    const newCourse = document.createElement('h2')
    newCourse.innerHTML = course.name
    const newButton = document.createElement("button")
    newButton.innerText = "See Detail"
    newButton.id = course.id
    newCourse.appendChild(newButton)
    courseContainer.appendChild(newCourse)
  })
}

function listenToDetailButtons() {
  const courseContainer = document.querySelector('#course-container')
  courseContainer.addEventListener("click", function(event){
    if (event.target.tagName === "BUTTON") {
      fetchOneCourse(event.target.id)
    }
  })
}

function fetchOneCourse(id) {
  const oneCourseData = fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/49/courses/${id}`)
  oneCourseData
  .then(res => res.json())
  .then(body => {
    displayOneCourse(body)
  })
}

function displayOneCourse(body){
  const studentContainer = document.querySelector('#student-form')
  const detailContainer = document.querySelector('#course-detail')
  detailContainer.innerHTML = ""
  studentContainer.innerHTML = ""
  studentContainer.class = body.id
  const instructor = document.createElement('p')
  instructor.innerHTML = "Instructor: " + body.instructor
  const semester = document.createElement('p')
  semester.innerHTML = "Semester: " + body.semester

  //console.log(body.students)

  body.students.forEach(function(student){
    const newStudent = document.createElement('p')
    const name = document.createElement('p')
    name.innerHTML = "Name: " + student.name
    const year = document.createElement('p')
    year.innerHTML = "Year: " + student.class_year
    const percentage = document.createElement('p')
    percentage.innerHTML = "Percentage: " + student.percentage
    const editButton = document.createElement('button')
    editButton.innerText = "Edit Percentage"
    editButton.id = student.id
    percentage.appendChild(editButton)
    newStudent.appendChild(name)
    newStudent.appendChild(year)
    newStudent.appendChild(percentage)
    studentContainer.appendChild(newStudent)
  })
  detailContainer.appendChild(instructor)
  detailContainer.appendChild(semester)
}

function listenToEditBUttons() {
  const studentContainer = document.querySelector('#student-form')
  studentContainer.addEventListener('click', function(event){
    if (event.target.tagName === "BUTTON") {
      const newPercentage = prompt("Please enter new percentage");
      console.log(newPercentage)
      if (newPercentage != null)
        {changePercentage(event.target.id, newPercentage)}
    }
  })
}

function changePercentage(id, newPercentage) {
  const studentContainer = document.querySelector('#student-form')
  const courseId = studentContainer.class
  const oneStudentData = fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/49/students/${id}`,
    {
      method: "PATCH",
      headers:
        {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify({percentage: newPercentage})
    })
    oneStudentData
    .then(res => res.json())
    .then(body => {
      fetchOneCourse(courseId)
    })
}






fetchAllCourses()
listenToDetailButtons()
listenToEditBUttons()
