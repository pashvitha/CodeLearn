let admin1=JSON.parse(localStorage.getItem("admin"));
if(!admin1){
    alert("please login first");
    window.location.href="admin.html"
}

// load challenges
async function loadChallenges() {

    try {

        let res = await fetch("http://localhost:5000/challenges");

        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        let challenges = await res.json();

        let table = document.getElementById("challengeTable");

        // Remove old rows except the header
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        challenges.forEach((challenge, index) => {

            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${challenge.title}</td>
                <td>${challenge.difficulty}</td>
                <td>${challenge.topic}</td>
                <td>${challenge.description}</td>
                <td>
                    <button onclick="editChallenge(${challenge.id})">Edit</button>
                    <button onclick="deleteChallenge(${challenge.id})">Delete</button>
                </td>
            `;

            table.appendChild(row);

        });

    }
    catch (err) {
        alert(err.message);
    }

}

// add new challanges
async function saveChallenge(){ 
    try{ 
        let title=document.getElementById("title").value;
        let difficulty=document.getElementById("difficulty").value;
        let topic=document.getElementById("topic").value;
        let description=document.getElementById("description").value;

        let newObject={
            title,
            difficulty,
            topic,
            description
        }
        let url = "http://localhost:5000/challenges";
        let method = "POST";

        if(editId != null){
            url = `http://localhost:5000/challenges/${editId}`;
            method = "PUT";
        }
        let options={
            "method":method,
            "headers":{
                "Content-Type":"application/json",

            }, 
            "body":JSON.stringify(
                newObject
            )
        }
        let res1=await fetch(url,options);
        if(res1.ok){

            if(editId == null){
                alert("Challenge added successfully");
            }
            else{
                alert("Challenge updated successfully");
            }

            document.getElementById("title").value = "";
            document.getElementById("difficulty").value = "";
            document.getElementById("topic").value = "";
            document.getElementById("description").value = "";

            editId = null;

            document.getElementById("saveBtn").innerText = "Add Challenge";

            loadChallenges();
        }
        else{
            alert("Challenge could not be added");
        }

    } 
    catch(err){
        console.log(err);
    }

   

}

// delte the challange
async function deleteChallenge(id) {

    let confirmDelete = confirm("Are you sure you want to delete this challenge?");

    if (!confirmDelete) {
        return;
    }

    try {

        let res = await fetch(`http://localhost:5000/challenges/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Delete failed");
        }

        alert("Challenge deleted successfully");

        loadChallenges();

    }
    catch (err) {
        alert(err.message);
    }

} 

// edit challenge  

let editId = null;

async function editChallenge(id){

    try{

        let res = await fetch(`http://localhost:5000/challenges/${id}`);

        if(!res.ok){ 
            throw new Error("Something went wrong");
        }

        let challenge = await res.json();

        document.getElementById("title").value = challenge.title;
        document.getElementById("difficulty").value = challenge.difficulty;
        document.getElementById("topic").value = challenge.topic;
        document.getElementById("description").value = challenge.description;

        editId = id;

        document.getElementById("saveBtn").innerText = "Update Challenge";

    }
    catch(err){
        alert(err.message);
    }

}


loadChallenges();

function goBack() {
    window.location.href = "admin_dashboard.html";
}
