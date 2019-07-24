// document.addEventListener("DOMContentLoaded", function() {});

// As a user, when the page loads I should see a list 
// of courses retrieved from an API on the left hand side 
// of the screen.

// As a user, when I click the See Detail button, 
// the application should reveal more information about 
// that particular class.

// As a user, when looking at the details of a course. I can edit a student's percentage. Clicking the 'Edit' button will save any changes added to the description in the database

//warm-shore-17060.herokuapp.com/api/v1/users/47/courses/

const courseCont = document.getElementById("course-container")
const courseDetail = document.getElementById("course-detail")
const studentForm = document.getElementById("student-form")

    function getCourses(){
        fetch("http://warm-shore-17060.herokuapp.com/api/v1/users/47/courses/")
        .then( function(resp){
            // console.log(resp)
            return resp.json();
        }).then( function(resp){
            for (const courseApi of resp) {
                renderCourse(courseApi);
            }
        })
    }


    function renderCourse(courseApi){
        let oneCourseCont = document.createElement("DIV");
        let courseBtn = document.createElement("BUTTON");
        let courseName = document.createElement("P");
        let courseProf = document.createElement("P");
        let courseDate = document.createElement("P");

        courseBtn.innerText = "See Detail"
        courseBtn.id = `cID${courseApi.id}`
        courseName.innerText = courseApi.name
        courseProf.innerText = courseApi.instructor
        courseDate.innerText = courseApi.semester

        courseBtn.addEventListener("click", function(e){
            renderCourseDetails(e);
            console.log("TT")
        })

        oneCourseCont.appendChild(courseName)
        oneCourseCont.appendChild(courseProf)
        oneCourseCont.appendChild(courseDate)
        oneCourseCont.appendChild(courseBtn)
        courseCont.appendChild(oneCourseCont)

    }



    function renderCourseDetails(e){
        console.log(e.target)
        clickedBtn= e.target
        courseId = e.target.id.slice(3);
        console.log(courseId);
        
        fetchOneCourse(courseId);
    }


    function fetchOneCourse(courseId){
        fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/47/courses/${courseId}`)
        .then( function(resp){
            console.log(resp)
            return resp.json();
        }).then( function(resp){
            console.log(resp)
            let studentsArr = resp["students"]
            for (const student of studentsArr) {
                renderStudent(student);
            }
        })
    }


    function renderStudent(student){
        console.log(student);

        let studentLi = document.createElement("LI");
        studentLi.innerText = `${student.name}  ${student.percentage}`
        studentLi.id = `sId${student.id}`
        // student.dataset.grade = student.percentage
        studentLi.dataset.grade = student.percentage
        studentLi.dataset.year = student.class_year



        studentLi.addEventListener("click", function(e){
            renderStudentDetails(e)
        })

        courseDetail.appendChild(studentLi)
    }


    function renderStudentDetails(studentBtn){
        console.log(studentBtn.target)
        clickedBtn= studentBtn.target
        let studentIdNo = studentBtn.target.id.slice(3);
        console.log(studentIdNo);

        // NEED TO DELETE PRIOR STUDENTS CLICKED, DON'T
        // HAVE TIME TO IMPLEMENT
        // var child = e.lastElementChild;  
        // while (child) { 
        //     e.removeChild(child); 
        //     child = e.lastElementChild;
        // }

        let studentName = document.createElement("P")
        let studentClassYr = document.createElement("P")
        let gradeDiv = document.createElement("DIV")
        let gradeBtnDiv = document.createElement("DIV")
        let studentPct = document.createElement("INPUT")
        // let studentGradeForm = document.createElement("FORM")
        // <input type="text" name="firstname">
        let studentPctSubmit = document.createElement("INPUT")
     


        studentName.innerText = clickedBtn.innerText.slice(0,-3);
        studentClassYr.innerText = clickedBtn.dataset.year
        console.log("Test: ")
        console.log(parseInt(clickedBtn.innerText))

        let grade = clickedBtn.innerText.slice(-3)
        console.log(grade);

        studentPct.placeholder = clickedBtn.dataset.grade

        let studentGradeForm =
        `<form action="" method="POST" id="idForPct${studentIdNo}">
            Percentage: <input type="text" name="fname" placeholder=${grade}><br>
        </form>`

        let gradeBtn =
        `<button type="submit" form="idForPctSubmit${studentIdNo}" id="gradeFor${studentIdNo} value="Submit">Submit</button>`;


        gradeDiv.innerHTML = studentGradeForm;
        gradeDiv.id = `gradeForm${studentIdNo}`
        gradeBtnDiv.innerHTML = gradeBtn;

        // gradeDiv.addEventListener("click", function(e){
            // need to listen for FORM submit... 
        gradeDiv.addEventListener("submit", function(e){
            // GETS FORM AS TARGET, ISNT PASSING THE VALUE...
            // ALSO ONLY WORKS WHEN HIT ENTER, NOT ON CLICK
            e.preventDefault()
            console.log("click")

            console.log("Grade target: ", e.target)
            console.log("Grade target VALUE: ", e.target.value)
        })


        // gradeDiv.appendChild(gradeBtnDiv)
        studentForm.appendChild(studentName)
        studentForm.appendChild(studentClassYr)
        studentForm.appendChild(gradeDiv)
        studentForm.appendChild(gradeBtnDiv)

    }


    // function updateGrade(e){
    //     e.preventDefault()
    //     console.log("Grade target: ", e.target)
    //     console.log("Grade target VALUE: ", e.target.value)
    //     // ^ only works when you click in input form AFTER # in
        

    // }


    getCourses();




// const courseCont = document.getElementById("")
// const courseCont = document.getElementById("")

