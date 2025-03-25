

document.addEventListener("DOMContentLoaded", () => {
    fetchProjects();

    // Project Submission Form
    document.getElementById("project-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let name = document.getElementById("project-name").value;
        let desc = document.getElementById("project-desc").value;
        
        fetch("server.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `project_name=${name}&project_desc=${desc}`
        }).then(response => response.text())
          .then(() => {
              document.getElementById("project-name").value = "";
              document.getElementById("project-desc").value = "";
              fetchProjects();
          });
    });

    // Contact Form Submission
    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        fetch("server.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `name=${name}&email=${email}&message=${message}`
        }).then(response => response.text())
          .then(() => {
              document.getElementById("name").value = "";
              document.getElementById("email").value = "";
              document.getElementById("message").value = "";
          });
    });
});

// Fetch Projects from Server
function fetchProjects() {
    fetch("server.php?fetch_projects=true")
        .then(response => response.json())
        .then(data => {
            let projectList = document.getElementById("project-list");
            projectList.innerHTML = "";
            data.forEach(project => {
                let div = document.createElement("div");
                div.classList.add("project-item");
                div.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <button class="delete-btn" onclick="deleteProject(${project.id})">Delete</button>
                `;
                projectList.appendChild(div);
            });
        });
}

// Delete Project Function
function deleteProject(projectId) {
    fetch("server.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `delete_project=${projectId}`
    }).then(() => fetchProjects());
}
