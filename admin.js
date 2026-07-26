async function adminlogin() {

    try {

        let emaill = document.getElementById("email");
        let pswd = document.getElementById("password");

        let res = await fetch("http://localhost:5000/admins");

        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        let data = await res.json();

        let adminn = data.find(item => {
            return item.email == emaill.value &&
                   item.password == pswd.value;
        });

        if (!adminn) {

            alert("Invalid Email or Password");

        } 
        else { 

            localStorage.setItem("admin", JSON.stringify(adminn));

            alert("Login Successful");

            window.location.href = "admin_dashboard.html";
        }

    } 
    catch (err) {

        alert(err.message);

    }

}