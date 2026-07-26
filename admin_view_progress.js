// Check admin login
let admin = JSON.parse(localStorage.getItem("admin"));

if (!admin) {
    alert("Please login first");
    window.location.href = "admin.html";
}

// Load progress
async function loadProgress() {

    try {

        // Fetch all data
        let progressRes = await fetch("https://codelearn-oln7.onrender.com/progress");
        let usersRes = await fetch("https://codelearn-oln7.onrender.com/users");
        let challengesRes = await fetch("https://codelearn-oln7.onrender.com/challenges");

        if (!progressRes.ok || !usersRes.ok || !challengesRes.ok) {
            throw new Error("Something went wrong");
        }

        let progress = await progressRes.json();
        let users = await usersRes.json();
        let challenges = await challengesRes.json();

        let table = document.getElementById("progressTable");

        // Remove old rows except header
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        progress.forEach((item, index) => {

            let user = users.find(u => u.id == item.userId);

            let challenge = challenges.find(c => c.id == item.challengeId);

            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user ? user.fullName : "Unknown User"}</td>
                <td>${challenge ? challenge.title : "Unknown Challenge"}</td>
                <td>${item.status}</td>
                <td>${item.score}</td>
                <td>${item.submittedAt}</td>
            `;

            table.appendChild(row);

        });

    }
    catch (err) {
        alert(err.message);
    }

}

loadProgress();

function goBack() {
    window.location.href = "admin_dashboard.html";
}