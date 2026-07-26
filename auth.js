// validate registration form
async function fetch_reg(){
    let fulname=document.getElementById("FullName");
    let mail=document.getElementById("Email");
    let pswd=document.getElementById("Password");
    let cpswd=document.getElementById("confirm_password");

    const P_mail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const p_name=/^[a-zA-Z]{2,}(?:\s[a-zA-Z]{1,})+$/;
    const p_pswd=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if(fulname.value==""){
        alert("Please enter your Full Name")
        return;
    }  
    if(p_name.test(fulname.value)==false){ 
        alert("Invalid Full Name")
        return;
        
    }
    if(mail.value==""){
        alert("please enter full mail");
        return;
    }

    if(P_mail.test(mail.value)==false){
        alert("invalid mail")
        return;
    }

    if(pswd.value==""){
        alert("please enter password");
        return;
    }

    if(p_pswd.test(pswd.value)==false){
        alert("invalid pswd");
        return;
    }
    
    if (cpswd.value == "") {
    alert("Please enter Confirm Password");
    return;
    } 
    if (pswd.value !== cpswd.value) {
    alert("Passwords do not match");
    return;
    } 
    else{
        // alert("registration sucessfull");
        await get_local_storage();
    }




    
    // console.log(fulname.value);
    // console.log(mail.value);
    // console.log(pswd.value);
    // console.log(cpswd.value);


}

//   http://localhost:3000/users 

// put user details into local storage
// async function set_local_storaage(){
//     // let res= await fetch("http://localhost:3000/users");

//     let res= await  fetch("https://codelearn-oln7.onrender.com/users")
   
//     try{ 

//         if(!res.ok){
//             throw new Error("something went wrong")
//         }
//         let data=await res.json();
//         localStorage.setItem("users",JSON.stringify(data));
//         console.log(data);

//     }
//     catch(error){
//         console.log(error);
//     }
    


// } 

async function set_local_storaage() {

    try {

        console.log("Fetching users...");

        let res = await fetch("https://codelearn-0ln7.onrender.com/users");

        console.log(res);

        if (!res.ok) {
            throw new Error("Fetch failed");
        }

        let data = await res.json();

        console.log("Fetched users:", data);

        localStorage.setItem("users", JSON.stringify(data));

        console.log("Saved successfully!");

    }

    catch (err) {

        console.error("ERROR:", err);

    }

}
set_local_storaage() 


// create new user obj and post into user.json

async function new_object(){
    let fulname=document.getElementById("FullName");
    let mail=document.getElementById("Email");
    let pswd=document.getElementById("Password");

    let options={
        "method":"post",
        "headers":{
            "Content-Type":"application/json",

        }, 
        "body":JSON.stringify({
            fullName: fulname.value.trim(),
            email: mail.value.trim(),
            password: pswd.value
        })
    };

    let res = await fetch("https://codelearn-0ln7.onrender.com/users", options);

    if (res.ok) {
        await set_local_storaage();
        // alert("Registration Successful");
        window.location.href = "login.html";
    } else {
        alert("Registration Failed");
    }
}
    // fetch("http://localhost:3000/users",options)
    // .then(res=>{ 
    //     // console.log("Response:", res);
    //     // console.log("Status:", res.status);
    //     // console.log("OK:", res.ok);
    //     // if(res.ok){
    //     //     set_local_storaage();
    //     //     alert("Registration Successful");
    //     //     console.log("Redirecting...");
    //     //     window.location.href = "login.html";
    //     // }

    //     if (res.ok) {
    //     // console.log("Inside if");

    //     // alert("Registration Successful");

    //     // console.log("About to redirect...");
    //     await set_local_storaage();
        
    //     window.location.href = "login.html";
    //     } else {
    //         console.log("Request failed");
    //     }


    // }).catch(error=>console.log(error));




// read data from local storage 
// async function get_local_storage() {  
//     let users1=JSON.parse(localStorage.getItem("users")); 
//     let mail2=document.getElementById("Email");
//     let filterdata=users1.filter(f_mail=>f_mail.email==mail2.value) 
    
    
//     if(filterdata.length>0){ 
//         alert("email already exists"); 

//     }  
//     else{
//         new_object(); 
        
//     }

   
// }

async function get_local_storage() {

    let users1 = JSON.parse(localStorage.getItem("users"));

    if (!users1) {

        await set_local_storaage();

        users1 = JSON.parse(localStorage.getItem("users")) || [];

    }

    let mail2 = document.getElementById("Email");

    let filterdata = users1.filter(user =>
        user.email === mail2.value.trim()
    );

    if (filterdata.length > 0) {

        alert("Email already exists");

    } else {

        await new_object();

    }

}

// //======================================================================================== 

