let admin1=JSON.parse(localStorage.getItem("admin"));
if(!admin1){
    alert("please login first");
    window.location.href="admin.html"
}


async function loadusers(){ 
    try{ 
        let res=await fetch("http://localhost:5000/users");
        if(!res.ok){
            throw new Error("something went wrong");
        } 
        let users=await res.json();
        let table=document.getElementById("usersTable");
        users.forEach((user,idx)=>{
            let row=document.createElement("tr");
            row.innerHTML=` 
            <td>${idx+1}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="deleteuser(${user.id})">Delete</button>
            </td>
            `;
            table.appendChild(row);
        });

    } catch(err){
        console.log(err);
    }
    
    
}

async function deleteuser(id){  
    let confirmDelete=confirm("are you sure you want to delete this user?");
    if(!confirmDelete){
        return;
    }
    try{ 
        let res=await fetch(`http://localhost:5000/users/${id}`,{
            method:"DELETE"
        });
        if(!res.ok){
            throw new Error("delete failed");
        }
        alert("user deleted successfully");
        // location.reload();
        // loadusers();
        

    } 
    catch(err){
        console.log(err);
    }


}

loadusers();

function goBack() {

    window.location.href = "admin_dashboard.html";

}