async function check_login() {  
    let login_mail=document.getElementById("email");
    let login_pswd=document.getElementById("p"); 
    if(login_mail.value==""){
        alert("please enter full mail");
        return;
    }
    if(login_pswd.value==""){
        alert("please enter password");  
        return;
    } 
    get_local_storage1();

}

async function get_local_storage1() {  
    let users1=JSON.parse(localStorage.getItem("users")); 
    let mail3=document.getElementById("email");
    let pswd3=document.getElementById("p");
    let filterd=users1.filter(user=>user.email==mail3.value && 
                user.password==pswd3.value
    ) 

    if(filterd.length>0){
        alert("login sucessfull"); 
        window.location.href = "dashboard.html";
    } 
    else{
        alert("invalid mail or pswd"); 
    } 
    localStorage.setItem("loggedInuser",JSON.stringify(filterd[0]));
}
