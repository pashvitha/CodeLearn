async function loadLeaderboard() {

    let res = await fetch("https://codelearn-oln7.onrender.com/users")
    if (!res.ok) {
        throw new Error("Something went wrong");
    }

    let users = await res.json();

    let res1 = await fetch("https://codelearn-oln7.onrender.com/progress");
    if (!res1.ok) {
        throw new Error("Something went wrong");
    } 

    let progress = await res1.json();

    let table = document.getElementById("leaderboardtable");

    // Keep only the header
    table.innerHTML = `
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Score</th>
        </tr>
    `;

    let leaderboard = [];

    // Calculate score of every user
    users.forEach(ele => {

        let total_score = 0;

        progress.forEach(item => {

            if (ele.id == item.userId) {
                total_score += item.score;
            }

        });

        leaderboard.push({
            name: ele.fullName,
            score: total_score
        });

    });

    // Sort in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // Display leaderboard
    leaderboard.forEach((player, index) => {

        let rows = document.createElement("tr");

        rows.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
        `;

        table.appendChild(rows);

    });

}

loadLeaderboard();