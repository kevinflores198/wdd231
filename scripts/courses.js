
  const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Intro to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    completed: false,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    completed: false,
  },
];

const coursesContainer = document.getElementById("courses-container");
const totalCreditsSpan = document.getElementById("total-credits");
const filterButtons = document.querySelectorAll(".btn-container .btn");

function displayCourses(courseList) {
  coursesContainer.innerHTML = "";

  courseList.forEach((course) => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>${course.credits} credits</p>
    `;

    coursesContainer.appendChild(card);
  });

  const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsSpan.textContent = totalCredits;
}

let activeFilter = "all";

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    if (filter === activeFilter) {
      activeFilter = "all";
    } else {
      activeFilter = filter;
    }

    let filteredCourses;
    if (activeFilter === "all") {
      filteredCourses = courses;
    } else {
      filteredCourses = courses.filter((course) => course.subject === activeFilter);
    }

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    if (activeFilter !== "all") {
      button.classList.add("active");
    }

    displayCourses(filteredCourses);
  });
});

displayCourses(courses);

const navLinksAll = document.querySelectorAll("#nav-links a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinksAll.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("current");
    }
});