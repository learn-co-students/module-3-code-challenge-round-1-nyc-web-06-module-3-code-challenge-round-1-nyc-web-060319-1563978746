document.addEventListener("DOMContentLoaded", function() {});

fetch('https://warm-shore-17060.herokuapp.com/api/v1/users/48/courses/')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    const divContainer = document.querySelector("#course-container")
    myJson.forEach(course => {
      console.log(course.name)
      const eachCourse = document.createElement("div")
      eachCourse.dataset.id = course.id
      eachCourse.innerHTML = course.name
      eachCourse.addEventListener('click', eachCourse)
      divContainer.appendChild(eachCourse)
    });
  });

function clickCourse(event) {
  console.log(event.target.dataset.id)
  fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/1/courses/${event.target.dataset.id}`)
  // :id/ instead of ${event.target.dataset.id}. maybe.
    .then(function (response) {
      return response.json();
    })
  .then(function (myJson) {
    console.log(myJson)
    //As a user, when I click the See Detail button, the application should reveal more information about that particular class.
    const theCourseDetail = document.querySelector("#course-detail")
    eachCourse.src = myJson.id
    theCourseDetail.appendChild(eachCourse)
      function makeButton() {
        const courseButton = document.createElement('button')        
        courseButton.innerHTML = 'Show Details'
        theCourseDetail.appendChild(courseButton)
      }
    courseButton.addEventListener('click', function () {
      fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/1/courses/${event.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
        body: JSON.stringify(eachCourse)})
        }
      )
    }
  )
}

      
