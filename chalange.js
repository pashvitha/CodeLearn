async function get_prblmid(){
    let id=JSON.parse(localStorage.getItem("prblms"));
    
    let res= await fetch("http://localhost:5000/challenges");
    if(!res.ok){
        throw new Error("something went wrong");
    }
    let data=await res.json(); 
    let title=document.getElementById("title");
    let topic=document.getElementById("topic");
    let difficulty=document.getElementById("difficulty");
    let description=document.getElementById("description");
    data.forEach(ele=>{
        if(ele.id===id){
            
            title.innerText=ele.title;
            topic.innerText=ele.topic;
            difficulty.innerText=ele.difficulty;
            description.innerText=ele.description;
            
        } 
        
    })
}
get_prblmid()

let cont1=document.getElementById("output");
// let cont1=document.getElementById("otpt");
// async function runcode(){
//     let code=document.getElementById("editor").value;
//     cont1.innerText=code;
    
// }


async function runcode() {

    let code = document.getElementById("editor").value;
    let output = document.getElementById("output");

    output.textContent = "Running...";

    try {

        let res = await fetch("http://localhost:5000/run", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                code: code
            })

        });

        let result = await res.json();

        console.log(result);

        if (!res.ok) {

            output.textContent = result.error || result.message || "Execution Failed";
            return;

        }

        if (result.output) {

            output.textContent = result.output;

        }

        else if (result.error) {

            output.textContent = result.error;

        }

        else {

            output.textContent = JSON.stringify(result, null, 2);

        }

    }

    catch (err) {

        output.textContent = err.message;

    }

}

async function submitcode(){
    let userid=JSON.parse(localStorage.getItem("loggedInuser"));
    let challengeid=JSON.parse(localStorage.getItem("prblms"));
    let status="solved";
    let score=100;
    let today = new Date(); 

    // console.log(userid);
    // console.log(challengeId);
    // console.log(status);
    // console.log(score);
    // console.log(today.toISOString().split("T")[0]);
    // http://localhost:3000/progress
    let options={
        "method":"post",
        "headers":{
            "Content-Type":"application/json",

        }, 
        "body":JSON.stringify({
            userId:userid.id,
            challengeId:challengeid,
            status:status,
            score:score,
            submittedAt:today.toISOString().split("T")[0]
        })
    };
    let res=await fetch("http://localhost:5000/progress",options);
    if(!res.ok){
        throw new Error ("some thing went wrong");
    } 
    else{
        window.location.href = "progress.html";
    }


}

