document.addEventListener("DOMContentLoaded", function() {

    const courses = document.querySelector('#course-container');
    const detailContainer = document.querySelector('#course-detail');


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
                courseStudent.innerHTML = "Course Student : "  + student.name;

                // const studentUL = document.createElement('ul');

                const editStudentBtn = document.createElement('button');
                editStudentBtn.innerText = "Edit Student";
                editStudentBtn.dataset.id = student.id;
                courseStudent.appendChild(editStudentBtn);
                editStudentBtn.addEventListener('click', editStudentFunc)

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

    function editStudentFunc(event){
        console.log(event.target.dataset.id)
    }
});


// `https://warm-shore-17060.herokuapp.com/api/v1/users/1/courses/:id`