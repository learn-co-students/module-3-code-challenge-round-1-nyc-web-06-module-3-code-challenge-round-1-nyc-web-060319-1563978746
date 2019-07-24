"use strict";

const MY_API_BASE_URL = `https://warm-shore-17060.herokuapp.com/api/v1/users/50`;
const COURSE_DETAIL_BUTTON_CLASS_NAME = "see-course-detail-button";
const STUDENT_DETAIL_LIST_ELEMENT_CLASS_NAME = "student-detail-list-element-class";
const STUDENT_DETAIL_LIST_ID = "student-detail-list";
const STUDENT_FORM_EDIT_FORM = "student-form-edit-form";
const STUDENT_EDIT_PERCENTAGE_INPUT_FIELD = "student-edit-percentage-input-field";
const STUDENT_EDIT_FORM_CURRENT_STUDENT = "student-edit-form-student-id";
// const STUDENT_EDIT_PERCENTAGE_FORM = 


const courseContainer = document.querySelector("#course-container");
const courseDetail = document.querySelector("#course-detail");
const studentForm = document.querySelector("#student-form");

function coursesURL() {
    return `${MY_API_BASE_URL}/courses`;
}

function coursesDetailURL(id) {
    return `${coursesURL()}/${id}`;
}

function studentDetailURL(studentID) {
    return `${MY_API_BASE_URL}/students/${studentID}`;
}

function createCourseDiv(course) {
    const newCourseDiv = document.createElement("div");
    newCourseDiv.dataset.id = course.id;
    newCourseDiv.className = "single-course-master-div";
    return newCourseDiv;
}

function createCourseTitle(course) {
    const newCourseTitle = document.createElement("h3");
    newCourseTitle.innerText = course.name;
    newCourseTitle.className = "course-name";
    return newCourseTitle;
}

function createCourseInstructor(course) {
    const newCourseInstructor = document.createElement("p");
    newCourseInstructor.innerText = course.instructor;
    newCourseInstructor.className = "course-instructor";
    return newCourseInstructor;
}

function createCourseSemester(course) {
    const newCourseSemester = document.createElement("p");
    newCourseSemester.innerText = course.semester;
    newCourseSemester.className = "course-semester";
    return newCourseSemester;
}

function createCourseDetailButton(course) {
    const newCourseDetailButton = document.createElement("button");
    newCourseDetailButton.innerText = "See Detail";
    newCourseDetailButton.className = COURSE_DETAIL_BUTTON_CLASS_NAME;
    return newCourseDetailButton;
}

function renderCourse(course) {
    const newCourseDiv = createCourseDiv(course)
    courseContainer.appendChild(newCourseDiv);

    newCourseDiv.appendChild(createCourseTitle(course));
    newCourseDiv.appendChild(createCourseInstructor(course));
    newCourseDiv.appendChild(createCourseSemester(course));
    newCourseDiv.appendChild(createCourseDetailButton(course));

}

function renderCourses() {
    return fetch(coursesURL()).then(response => response.json()).then(courses => {
        console.log("Got courses: " + courses);
        for (let i = 0; i < courses.length; i++) {
            renderCourse(courses[i]);
        }
    })
}

function renderSingleStudentListItem(student) {
    const studentLI = document.createElement("li");
    studentLI.dataset.id = student.id;
    studentLI.dataset.class_year = student.class_year;
    studentLI.dataset.percentage = student.percentage;
    studentLI.dataset.name = student.name;
    
    // not strictly necessary to keep two copies, but will make easier to think about later.
    studentLI.id = student.id;

    studentLI.innerText = `${student.name} ${student.percentage}`;
    studentLI.className = STUDENT_DETAIL_LIST_ELEMENT_CLASS_NAME;
    return studentLI;
}

function renderStudentList(course) {

    const studentListElement = document.createElement("ul");
    studentListElement.dataset.courseID = course.id;
    studentListElement.id = STUDENT_DETAIL_LIST_ID;
    for (let i = 0; i < course.students.length; i++) {
        const singleStudentListItem = renderSingleStudentListItem(course.students[i]);
        studentListElement.appendChild(singleStudentListItem);
    }
    return studentListElement;
}

function patchStudentPercentage(studentID, newPercentage) {
    fetch(studentDetailURL(studentID), {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            id: studentID,
            percentage: newPercentage
        })
    }).then(resp => resp.json()).then(resp => {
        console.log("patch response: " +resp);
        debugger;
    })
}

function editStudentSubmitHandler(event) {
    console.log(event);
    console.log("new student percentage value: " + event.target.children[0].value);
    console.log("student ID: " + event.target.parentElement.dataset.id);

    patchStudentPercentage(event.target.parentElement.dataset.id, event.target.children[0].value);
    event.preventDefault();
    debugger;
}


function renderStudentForm(studentLI) {
    studentForm.innerHTML = "";
    const newFormStudentName = document.createElement("h3");
    // newFormStudentName.id = STUDENT_EDIT_FORM_CURRENT_STUDENT;
    newFormStudentName.innerText = studentLI.dataset.name;
    studentForm.appendChild(newFormStudentName);

    const newFormStudentClassYear = document.createElement("p");
    newFormStudentClassYear.innerText = studentLI.dataset.class_year;
    studentForm.appendChild(newFormStudentClassYear);

    const newFormStudentPercentage = document.createElement("p");
    newFormStudentPercentage.innerText = studentLI.dataset.percentage
    studentForm.appendChild(newFormStudentPercentage);

    const newFormStudentEditPercentage = document.createElement("form");
    newFormStudentEditPercentage.className = STUDENT_FORM_EDIT_FORM;

    const newFormStudentPercentageField = document.createElement("input");
    
    // why wasn't this working with a normal number field??!?
    newFormStudentPercentageField.setAttribute('type', 'number');

    newFormStudentEditPercentage.appendChild(newFormStudentPercentageField);
    newFormStudentPercentageField.id = STUDENT_EDIT_PERCENTAGE_INPUT_FIELD;
    newFormStudentPercentageField.name = STUDENT_EDIT_PERCENTAGE_INPUT_FIELD;
    

    const newFormStudentPercentageFieldLabel = document.createElement("label");
    newFormStudentPercentageFieldLabel.innerText = "Percentage";
    newFormStudentPercentageField.appendChild(newFormStudentPercentageFieldLabel);


    const newFormStudentEditButton = document.createElement("button");
    newFormStudentEditButton.innerText = "Edit";

    newFormStudentEditPercentage.appendChild(newFormStudentEditButton);

    studentForm.dataset.id = studentLI.dataset.id;
    studentForm.dataset.class_year = studentLI.dataset.class_year;
    studentForm.dataset.percentage = studentLI.dataset.percentage;
    studentForm.dataset.name = studentLI.dataset.name;

    // studentForm.dataset = studentLI.dataset;
    studentForm.appendChild(newFormStudentEditPercentage);

    newFormStudentEditPercentage.addEventListener('submit', editStudentSubmitHandler);

}

function handleCourseDetailStudentClicked(event) {
    if (event.target.className === STUDENT_DETAIL_LIST_ELEMENT_CLASS_NAME) {
        console.log("student element in detail list clicked: ")
        console.log("student element: " + event.target);
        console.log("student ID: " + event.target.dataset.id);
        renderStudentForm(event.target);
    }
}

function attachCourseDetailListButtons() {
    courseDetail.addEventListener('click', handleCourseDetailStudentClicked);
}

function renderCourseDetailFromFetch(course) {
    const studentListElement = renderStudentList(course);
    courseDetail.innerHTML = "";
    courseDetail.appendChild(studentListElement);
    attachCourseDetailListButtons();
}

function fetchCourseDetail(courseID) {
    return fetch(coursesDetailURL(courseID)).then(resp => resp.json());
}

function renderDetailForCourse(courseID) {
    fetchCourseDetail(courseID).then(response => {
        console.log(response);
        renderCourseDetailFromFetch(response);
    })
}

function handleCourseContainerClick(event) {
    if (event.target.className === COURSE_DETAIL_BUTTON_CLASS_NAME) {
        console.log("clicked course detail button!");
        console.log("clicked on button for class: " + event.target.parentElement.children[0]);
        const thisCourseID = event.target.parentElement.dataset.id;
        console.log(thisCourseID);
        renderDetailForCourse(thisCourseID);
        // debugger;
    }
}

function attachDetailButton() {
    courseContainer.addEventListener('click', handleCourseContainerClick);
}


function main() {
    renderCourses().then(attachDetailButton());
}

// Because I'm a C/C++ programmer. Don't @ me, bro.
main();