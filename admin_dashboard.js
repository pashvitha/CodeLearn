
let admin1=JSON.parse(localStorage.getItem("admin"));
if(!admin1){
    alert("please login first");
    window.location.href="admin.html"
}

let name=document.getElementById("welcome");
name.innerText=`welcome, ${admin1.email}`;


async function dashboardStats(){ 
    try{
        let res1=await fetch("https://codelearn-oln7.onrender.com/users")
        if(!res1.ok){
            throw new Error("something went wrong");
        }
        let users=await res1.json();

        let res2=await fetch("https://codelearn-oln7.onrender.com/challenges");
        if(!res2.ok){
            throw new Error("something went wrong");
        }
        let challenges=await res2.json(); 

        let res3=await fetch("https://codelearn-oln7.onrender.com/progress");
        if(!res3.ok){
            throw new Error("something went wrong");
        }
        let progress=await res3.json(); 

        let users_len=users.length;
        let challenges_len=challenges.length;
        let progress_len=progress.length;
        document.getElementById("totalUsers").innerText=users_len;
        document.getElementById("totalChallenges").innerText=challenges_len;
        document.getElementById("totalSubmissions").innerText=progress_len;

        let cnt=0;
        progress.filter(ele=>{
            if(ele.status=="solved" || ele.status=="Solved"){
                cnt++;
            }
        });
        document.getElementById("totalSolved").innerText=cnt;


    }catch(err){
        console.log(err);
    }
    

}
dashboardStats();

function logout() {

    let confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    localStorage.removeItem("admin");

    alert("Logged out successfully");

    window.location.href = "admin.html";
}