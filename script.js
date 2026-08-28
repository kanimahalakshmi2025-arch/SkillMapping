/* =====================================================
   ACADEMIA CONNECT
   Main JavaScript
===================================================== */


/* =====================================================
   PAGE NAVIGATION
===================================================== */

const navButtons = document.querySelectorAll(".nav-btn");

const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const pageId = button.dataset.page;

        showPage(pageId);

        navButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   DASHBOARD INTERNAL LINKS
===================================================== */

const pageLinks = document.querySelectorAll("[data-page-link]");

pageLinks.forEach(link => {

    link.addEventListener("click", () => {

        const pageId = link.dataset.pageLink;

        showPage(pageId);

        navButtons.forEach(btn => {

            btn.classList.remove("active");

            if (btn.dataset.page === pageId) {
                btn.classList.add("active");
            }

        });

    });

});


/* =====================================================
   ROLE SELECTOR
===================================================== */

const roleSelect = document.getElementById("roleSelect");

roleSelect.addEventListener("change", function () {

    const role = this.value;

    if (role === "student") {

        showToast(
            "Student portal selected"
        );

        showPage("dashboard");

    }

    else if (role === "academician") {

        showToast(
            "Academician portal selected"
        );

        showPage("faculty");

    }

    else if (role === "industry") {

        showToast(
            "Industry portal selected"
        );

        showPage("opportunities");

    }

    else if (role === "institution") {

        showToast(
            "Institution analytics selected"
        );

        showPage("analytics");

    }

});


/* =====================================================
   TOAST MESSAGE
===================================================== */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================================
   APPLICATION SYSTEM
===================================================== */

const applyButtons = document.querySelectorAll(".apply-btn");

applyButtons.forEach(button => {

    button.addEventListener("click", () => {

        const opportunity =
            button.dataset.opportunity;

        applyForOpportunity(opportunity);

    });

});


function applyForOpportunity(opportunity) {

    const confirmed = confirm(
        "Apply for:\n\n" +
        opportunity +
        "\n\nDo you want to continue?"
    );

    if (!confirmed) {
        return;
    }


    const table =
        document.getElementById("applicationTable");


    const row =
        document.createElement("tr");


    const parts =
        opportunity.split(" - ");


    const role =
        parts[0] || opportunity;


    const company =
        parts[1] || "Industry Partner";


    const currentDate =
        new Date().toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    row.innerHTML = `

        <td>${role}</td>

        <td>${company}</td>

        <td>Internship / Job</td>

        <td>${currentDate}</td>

        <td>
            <span class="success-badge">
                Applied
            </span>
        </td>

    `;


    table.appendChild(row);


    showToast(
        "Application submitted successfully!"
    );


    showPage("applications");


    updateApplicationsCount();

}


/* =====================================================
   APPLICATION COUNT
===================================================== */

function updateApplicationsCount() {

    const rows =
        document.querySelectorAll(
            "#applicationTable tr"
        );

    console.log(
        "Total applications:",
        rows.length
    );

}


/* =====================================================
   LEARNING PROGRAMS
===================================================== */

const enrollButtons =
    document.querySelectorAll(".enroll-btn");


enrollButtons.forEach(button => {

    button.addEventListener("click", () => {

        const course =
            button.dataset.course;

        const confirmed =
            confirm(
                "Enroll in:\n\n" +
                course +
                "\n\nContinue?"
            );

        if (!confirmed) {
            return;
        }

        button.textContent = "Enrolled ✓";

        button.style.background =
            "#16a34a";

        button.disabled = true;

        showToast(
            "Successfully enrolled in " + course
        );

    });

});


/* =====================================================
   SKILL ASSESSMENT
===================================================== */

const assessmentForm =
    document.getElementById("assessmentForm");


assessmentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const python =
            document.querySelector(
                'input[name="python"]:checked'
            );

        const sql =
            document.querySelector(
                'input[name="sql"]:checked'
            );

        const communication =
            document.querySelector(
                'input[name="communication"]:checked'
            );


        if (
            !python ||
            !sql ||
            !communication
        ) {

            showToast(
                "Please answer all questions."
            );

            return;
        }


        const pythonScore =
            Number(python.value);

        const sqlScore =
            Number(sql.value);

        const communicationScore =
            Number(communication.value);


        const total =
            (
                pythonScore +
                sqlScore +
                communicationScore
            ) / 3;


        const score =
            Math.round(total);


        let level = "";


        if (score >= 85) {

            level = "Expert";

        }

        else if (score >= 70) {

            level = "Advanced";

        }

        else if (score >= 50) {

            level = "Intermediate";

        }

        else {

            level = "Beginner";

        }


        const result =
            document.getElementById(
                "assessmentResult"
            );


        result.style.display = "block";


        result.innerHTML = `

            <h2>Assessment Completed 🎉</h2>

            <br>

            <p>
                <strong>Overall Skill Score:</strong>
                ${score}%
            </p>

            <p>
                <strong>Skill Level:</strong>
                ${level}
            </p>

            <br>

            <h3>Recommended Improvements</h3>

            <br>

            <ul>

                <li>
                    SQL and database concepts
                </li>

                <li>
                    Machine Learning fundamentals
                </li>

                <li>
                    Data visualization
                </li>

            </ul>

            <br>

            <button
                class="primary-btn"
                id="learningRecommendation">

                View Recommended Learning

            </button>

        `;


        const recommendationButton =
            document.getElementById(
                "learningRecommendation"
            );


        recommendationButton.addEventListener(
            "click",
            () => {

                showPage("learning");

                navButtons.forEach(btn => {

                    btn.classList.remove("active");

                    if (
                        btn.dataset.page ===
                        "learning"
                    ) {

                        btn.classList.add("active");

                    }

                });

            }
        );


        showToast(
            "Skill profile generated successfully!"
        );

    }
);


/* =====================================================
   OPPORTUNITY SEARCH
===================================================== */

const searchInput =
    document.getElementById(
        "opportunitySearch"
    );


searchInput.addEventListener(
    "input",
    function() {

        const keyword =
            this.value.toLowerCase().trim();


        const opportunities =
            document.querySelectorAll(
                ".searchable"
            );


        opportunities.forEach(card => {

            const text =
                card.textContent.toLowerCase();


            if (
                text.includes(keyword)
            ) {

                card.style.display =
                    "block";

            }

            else {

                card.style.display =
                    "none";

            }

        });

    }
);


/* =====================================================
   FACULTY OPPORTUNITIES
===================================================== */

const facultyButtons =
    document.querySelectorAll(
        ".faculty-btn"
    );


facultyButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const name =
                button.dataset.name;


            const confirmed =
                confirm(
                    name +
                    "\n\nDo you want to continue?"
                );


            if (!confirmed) {
                return;
            }


            button.textContent =
                "Submitted ✓";


            button.style.background =
                "#16a34a";


            button.disabled = true;


            showToast(
                "Request submitted successfully!"
            );

        }
    );

});


/* =====================================================
   NOTIFICATION
===================================================== */

const notification =
    document.querySelector(
        ".notification"
    );


notification.addEventListener(
    "click",
    () => {

        alert(
            "Notifications\n\n" +
            "• TechNova reviewed your application\n" +
            "• New AI internship available\n" +
            "• SQL course starts Monday"
        );

    }
);


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "AcademiaConnect loaded successfully."
        );

    }
);
