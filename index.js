document.addEventListener("DOMContentLoaded", function() {

    //MY ID IS 51!!! Matt Cummings

//     "https://warm-shore-17060.herokuapp.com/api/v1/users/1/courses` # See all courses  
// `https://warm-shore-17060.herokuapp.com/api/v1/users/1/courses/:id` # See a single course  
// `https://warm-shore-17060.herokuapp.com/api/v1/users/1/students/:id` # Update a student  

// The API endpoint we need to retrieve all the courses is a conventional RESTful route
// * **Route:** GET `https://warm-shore-17060.herokuapp.com/api/v1/users/1/courses`


// To see the students for a specific course you'll need to make a GET request 
// * **Route:** GET `https://warm-shore-17060.herokuapp.com/api/v1/users/1/courses/:id`

// To update a students percentage you'll need to make a PATCH request
// * **Route:** PATCH `https://warm-shore-17060.herokuapp.com/api/v1/users/1/students/:id`
// * **Body:**

    COURSES_URL = "https://warm-shore-17060.herokuapp.com/api/v1/users/51/courses" 
    STUDENTS_URL = "https://warm-shore-17060.herokuapp.com/api/v1/users/51/students"
    let courseContainer = document.querySelector("#course-container")
    let courseDetailContainer = document.querySelector("#course-detail")
    let studentForm = document.querySelector("#student-form")

    
    
    // **As a user, when looking at the details of a course. 
    // I can edit a student's percentage. Clicking the 'Edit' button will save any changes added to the description in the database**
    
    
    //Since doing DOMcontent loaded, remember fetch setup wil be diferent!





    // DELIVERABLE 1 show index of all courses with name, teacher, semester
    // **As a user, when the page loads I should see a list of courses retrieved from an API on the left hand side of the screen.**
    
    //showAllCourses COMPLETE
    fetch(COURSES_URL)
    .then(res => res.json())
    // .then(allCoursesJson => console.log(allCoursesJson)) // 
    .then(allCoursesJson => {
        allCoursesJson.forEach( courseJson => {
            let newCourseCard = document.createElement("div")
            newCourseCard.dataset.id = courseJson.id //appears as data-is on html
            newCourseCard.innerHTML = `<ul>
                                            <li><u>Course ID:</u> ${courseJson.id}</li>
                                            <li><u>Course name:</u> ${courseJson.name} </li>
                                            <li><u>Instructor:</u> ${courseJson.instructor}</li>
                                            <li><u>Semester:</u> ${courseJson.semester}</li>
                                        </ul>`
            let seeDetailButton = document.createElement("button")
            seeDetailButton.innerText = `See Details for ${courseJson.name}`
            seeDetailButton.addEventListener("click", showDetailsForCourse)
            newCourseCard.appendChild(seeDetailButton)
            courseContainer.appendChild(newCourseCard)
        }) //end of for Each
    }) //end of final then


    //DELIVERABLE 2
    // **As a user, when I click the `See Detail` button, the application should reveal more information about that particular class.**
    //From gif, shows students and grade next to students
    //Note: added course name to see detail because it lead to spatial confusion, aded labels to nanema nd percentage to easily idetify

    function showDetailsForCourse(e){
        // console.log(e.target.parentElement.dataset.id) // div with data-id == course id ex 97 == 97
        let courseId = e.target.parentElement.dataset.id
        let listOfCourseStudents = document.createElement("ul")
        //make Get request to specific course
        fetch(COURSES_URL + "/" + courseId)
        .then(res => res.json())
        // .then(courseJson => console.log(courseJson.students)) // returns students: [ {name grade whatevr }{}{}{} ]
        .then(courseJson => courseJson.students.forEach(studentObj => { // for each student obj...
            let newStudentListItem = document.createElement("li")
            newStudentListItem.classList.add("student-list-item")
            newStudentListItem.dataset.id = studentObj.id
            newStudentListItem.addEventListener("click", showDetailsOfStudent)
            newStudentListItem.innerHTML = `<p><u>Name:</u> ${studentObj.name}<br><u>Grade Percentage:</u> ${studentObj.percentage}</p>`
            listOfCourseStudents.appendChild(newStudentListItem)
        } )
        )
        courseDetailContainer.innerHTML = "<h3>Course Details</h3>"
        courseDetailContainer.appendChild(listOfCourseStudents)
    }
    

    //DELIVERABLE 3
    // **As a user, when looking at the details of a course. 
    // I can edit a student's percentage. Clicking the 'Edit' button will save any changes added to the description in the database**
    
    function showDetailsOfStudent(e){
        // console.log(e.target.parentElement.parentElement.dataset.id) //I'm aware this is a crappy way to do this
        let idOfStudent = e.target.parentElement.parentElement.dataset.id
        fetch(STUDENTS_URL + "/" + idOfStudent)
        .then(res => res.json())
        .then(studentObj => {
            let studentDetailList = document.createElement("ul")
            studentDetailList.innerHTML = `<li><u>Student ID:</u> ${studentObj.id}</li>
                                           <li><u>Student Name:</u> ${studentObj.name}</li>
                                           <li><u>Class Year:</u> ${studentObj.class_year}</li>
                                           <li><u>Grade Percentage:</u> ${studentObj.percentage}</li>`
            
            let editPercentageForm = document.createElement("form")
            editPercentageForm.dataset.id = studentObj.id
            let newPercentage = document.createElement("input")
            editPercentageForm.appendChild(newPercentage)

            let submitButton = document.createElement("input")
            submitButton.type = "submit"
            editPercentageForm.appendChild(submitButton)
            
            editPercentageForm.addEventListener("submit", changePercentage)
            
            studentForm.innerHTML = "<h3>Student Details</h3>"
            
            studentForm.appendChild(studentDetailList)
            studentForm.appendChild(editPercentageForm)
        })

    }

    function changePercentage(e){
        e.preventDefault()
        let idOfStudentWhoseGradeWillBeChanged =  e.target.dataset.id
        let newPercentage = e.target.firstChild.value
        // console.log(e.target.previousElementSibling.children[3])
        let studentPercentage = e.target.previousElementSibling.children[3]

        fetch(STUDENTS_URL + "/" + idOfStudentWhoseGradeWillBeChanged, {
            method: "PATCH",
            headers: {
              "Content-Type" : "application/json",
              "Accept": "application/json"  
            },
            body: JSON.stringify({
                percentage: newPercentage
            })
        })
        .then(res => res.json())
        .then( studentObj => {
            studentPercentage.innerHTML = `<u>Grade Percentage</u>: ${studentObj.percentage }`
        })
    }

    //sometimes get weird error when I do this not sure why?? BUt it works

});
