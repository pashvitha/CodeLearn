

async function get_users(){
    let d1=JSON.parse(localStorage.getItem("loggedInuser"));
    let cont=document.getElementById("dashboard");
    if(d1){
        let p=document.createElement("div");
        p.innerHTML=`<p>Welcome ${d1.fullName}<p>`
        cont.appendChild(p);
    }
    else{
         window.location.href = "login.html";
    }
}
get_users(); 

async function logout(){ 
    // let d2=JSON.parse(localStorage.getItem("loggedInuser"));
    localStorage.removeItem("loggedInuser");
    window.location.href = "login.html";


}  

//dashboard statiscs 
async function loadstatistics(){
    let res=await fetch("https://codelearn-oln7.onrender.com/challenges");
    if(!res.ok){
        throw new Error("something went wrong");
    }
    let challengess=await res.json();

    let res1=await fetch("https://codelearn-oln7.onrender.com/progress");
    if(!res1.ok){
        throw new Error("something went wrong");
    }
    let progesss=await res1.json();

    let user=JSON.parse(localStorage.getItem("loggedInuser"));
    let cont1=document.getElementById("stats");
    // progesss.forEach(ele=>{ 
    //     if(user.id==ele.id){

    //     }

    // })
    let myprogress=progesss.filter(ele=>user.id==ele.userId)
    let totalchallenges=challengess.length;
    document.getElementById("totalChallenge").textContent=totalchallenges;
    
    let solved=myprogress.filter(ele=>ele.status=="solved");
    let attempted=myprogress.filter(ele=>ele.status=="Attempted")
    document.getElementById("solved").textContent=solved.length;
    document.getElementById("attempted").textContent=attempted.length; 
    let notattempted=totalchallenges-(solved.length+attempted.length); 
    document.getElementById("notAttempted").textContent=notattempted;
    let sum = 0;

    myprogress.forEach(ele => {
        if (ele.userId == user.id) {
            sum += ele.score;
        }
    });

    document.getElementById("score").textContent = sum;

}
loadstatistics()
