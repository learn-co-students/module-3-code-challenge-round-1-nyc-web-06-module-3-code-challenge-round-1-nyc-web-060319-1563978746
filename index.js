document.addEventListener("DOMContentLoaded", function() {

    const courses = document.querySelector('#course-container');
    const detailContainer = document.querySelector('#course-detail');
    const studentForm = document.querySelector('#student-form');

    fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/53/courses`)
    .then(res => res.json())
    .then(res => {
        res.forEach(course => {
            //console.log(course.name)
            const newCourse = document.createElement('li')
            newCourse.innerHTML = course.name;
            newCourse.style.cursor = 'pointer';
            courses.appendChild(newCourse);

            const seeDetailBtn = document.createElement('button')
            seeDetailBtn.innerHTML = 'See Detail';
            seeDetailBtn.dataset.id = course.id;
            seeDetailBtn.addEventListener('click', seeDetails)
            newCourse.appendChild(seeDetailBtn);
        });
    });

    function seeDetails(event){
        //console.log(event.target.dataset.id);
        reqCourse = event.target.dataset.id;
        fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/53/courses/${reqCourse}`)
        .then(res => res.json())
        .then(course => {
            //console.log(res)
            detailContainer.innerHTML = "";
            const courseName = document.createElement('li')
            courseName.innerHTML = "Course Name : "  + course.name;
            detailContainer.appendChild(courseName);

            const courseInstructor = document.createElement('li')
            courseInstructor.innerHTML = "Course Instructor : "  + course.instructor;
            detailContainer.appendChild(courseInstructor);

            const courseSemester = document.createElement('li')
            courseSemester.innerHTML = "Course Semester : "  + course.semester;
            detailContainer.appendChild(courseSemester);

            const studentsUL = document.createElement('ul')
            course.students.forEach(student => {
                const courseStudent = document.createElement('div')
                courseStudent.dataset.id = student.id;
                courseStudent.innerHTML = "Course Student : "  + student.name;

                // const studentUL = document.createElement('ul');

                const editStudentBtn = document.createElement('button');
                editStudentBtn.innerText = "Edit Student Percentage";
                editStudentBtn.className = "edit-btn"
                editStudentBtn.dataset.id = student.id;
                courseStudent.appendChild(editStudentBtn);

                // getting student details here
                let studentDetails = getStudentDetails(student);
                courseStudent.appendChild(studentDetails)
                // got student details

                studentsUL.appendChild(courseStudent);
            })
            detailContainer.appendChild(studentsUL)
   
        })
    }

    function getStudentDetails(student){
        //console.log("getting details")
        const studentUL = document.createElement('ul');

        const studentYear = document.createElement('li')
        studentYear.innerText = "Year : " + student.class_year;
        studentUL.appendChild(studentYear);

        const studentPercentage = document.createElement('li')
        studentPercentage.innerText = "Percentage : " + student.percentage;
        studentUL.appendChild(studentPercentage);

        return studentUL;
    }

    document.addEventListener('click', function(event){
        if(event.target.className == 'edit-btn'){
            studentID = event.target.dataset.id;
            fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/53/students/${studentID}`)
            .then(res => res.json())
            .then(student => {
                console.log(student)
                editStudentFunc(event, student);
            })
            
        }
    })

    document.addEventListener('submit', function(event){
        event.preventDefault();
        console.log(event.target.children[2].value)
        let newPer = event.target.children[2].value;
        fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/53/students/${studentID}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                  "percentage": newPer
              })
        }).then(res => res.json())
        .then(res => {
            /* I still have to render the student show ul*/
           // console.log(detailContainer.children[3].children);
           let allStudents = detailContainer.children[3].children;
           //console.log(allStudents[1]);
           for (let student of allStudents) {
            //console.log(student.dataset.id);
            if(student.dataset.id == res.id){
                //console.log(student.children)
            }
        }
        });
    });

    function editStudentFunc(event, student){
        console.log(event.target.dataset.id);
        const studentID = event.target.dataset.id;
        const editForm = getEditForm(studentID,student);
        studentForm.innerHTML = editForm;
    }

    function getEditForm(studentID, student){
        
     return  `
        <form data-id = "${studentID}">
            Name: ${student.name}<br>
            Percentage:<br>
            <input type="text" placeholder="${student.percentage}">
            <br>
            <input type="submit" value="Submit">
        </form> 
        `;
    }
});


// `https://warm-shore-17060.herokuapp.com/api/v1/users/1/courses/:id`