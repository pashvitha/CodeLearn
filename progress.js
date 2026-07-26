async function fetch_progress() { 
    try{ 
        let res=await fetch("https://codelearn-oln7.onrender.com/progress");
        if(!res.ok){
            throw new Error("something went wrong");
        }
        let data=await res.json(); 
        let id1=JSON.parse(localStorage.getItem("loggedInuser"));


        let res1=await fetch("https://codelearn-oln7.onrender.com/challenges");
        if(!res1.ok){
            throw new Error("something went wrong");
        }
        let data1=await res1.json();
        

        // <td> 
        //     <button onclick="editProgress(${ele.id})">Edit</button>
        //     <button onclick="deleteProgress(${ele.id})">Delete</button>
        // </td>
            
        let cont=document.getElementById("table1")
        cont.innerHTML = `
        <tr>
            <th>Challenge</th> 
            <th>Status</th>
            <th>Score</th>
            <th>Submitted</th>
            
        </tr>
        `;
        data.forEach(ele=>{
            let chalngename=data1.find(item=>item.id==ele.challengeId);
            let row=document.createElement("tr");
            if(ele.userId==id1.id){ 
                row.innerHTML=` 
                <td> ${chalngename.title}</td>
                <td> ${ele.status}</td>
                <td> ${ele.score} </td>
                <td> ${ele.submittedAt} </td>  
                


                ` 
                cont.appendChild(row);

            }
        })

    }catch(err){
        alert(err.message);
    }
    

    
} 

//edit status
// async function editProgress(id) {
//     try{ 
//         // Fetch the existing progress record
//         let res = await fetch(`http://localhost:3000/progress/${id}`);

//         if (!res.ok) {
//             throw new Error("Something went wrong");
//         }

//         let data = await res.json();

//         // Ask the user for the new status
//         let newStatus = prompt(
//             "Enter new status (Solved/Attempted):",
//             data.status
//         );

//         // If the user clicks Cancel, stop here
//         newStatus = newStatus?.trim();

//         if (
//             newStatus === null ||
//             (newStatus !== "Solved" && newStatus !== "Attempted")
//         ) {
//             alert("Please enter either Solved or Attempted");
//             return;
//         }

//         // Update only the status
//         let res1 = await fetch(`http://localhost:3000/progress/${id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 status: newStatus
//             })
//         });

//         if (!res1.ok) {
//             throw new Error("Update failed");
//         }

//         alert("Status updated successfully!");

//         // Refresh the table
//         fetch_progress();

//     } catch(err){
//         alert(err.message); 
//     }
    
// }

// // delte progess

// async function deleteProgress(id) {
//     try{ 
//         let check = confirm("Are you sure you want to delete this progress?");

//         if (!check) {
//             return;
//         }

//         let res = await fetch(`http://localhost:3000/progress/${id}`, {
//             method: "DELETE"
//         });

//         if (!res.ok) {
//             throw new Error("Delete failed");
//         }

//         alert("Progress deleted successfully!");

//         fetch_progress();

//     }catch(err){
//         alert(err.message);
//     }

    
// }

fetch_progress();