// http://localhost:3000/challenges
let search=document.getElementById("search");
let cont=document.getElementById("chalen");
let level = document.getElementById("level");
let topic1 = document.getElementById("topic");
let sort = document.getElementById("sort");

let allchallenges=[];
async function fetch_chaln(){
    let res= await fetch("http://localhost:5000/challenges");
    if(!res.ok){
        throw new Error("something went wrong");
    }
    let data=await res.json(); 
    allchallenges=data; 
    // displayChallenges(data);
    applyFilters();
    // // console.log(data); 
    // data.forEach(ele=>{
    //     let item=document.createElement("div"); 
    //     item.innerHTML=`  
    //     <p> problem : ${ele.title} </p> 
    //     <p> topic : ${ele.topic} </p>
    //     <p> difficulty : ${ele.difficulty} </p>
    //     <button onclick="openChallenge(${ele.id})">solve</button>
        

    //     ` 
        
    //     cont.appendChild(item);               
        

        
        
    // }) 
    


} ; 

function openChallenge(id){
    localStorage.setItem("prblms",JSON.stringify(id)); 
    window.location.href="chalange.html" 
    
    
}

fetch_chaln();  

// to filter , what user types
// search.addEventListener("input",function(){
//     let filterdata=[]
//     allchallenges.forEach(ele=>{


//         if(ele.title.toLowerCase().includes(search.value.toLowerCase())){  
//             filterdata.push(ele)

            
            
//         }
        
//     });
//     displayChallenges(filterdata);
// })  

// for dropdown of level selection;
// level.addEventListener("change",function(){ 
//     let levl=[];
//     if(level.value=="All"){
//         displayChallenges(allchallenges);
//         return;
//     }

//     allchallenges.forEach(ele=>{
//         if(ele.difficulty==level.value){ 
//             levl.push(ele);
            
           

//         }
//     });
    
//     displayChallenges(levl);

    
    
// }) 

// for topic selection 
// topic1.addEventListener("change",function(){ 
//     let topics=[]
//     if(topic1.value=="All"){
//         displayChallenges(allchallenges);
//         return;
//     }
//     allchallenges.forEach(ele=>{
//         if(topic1.value==ele.topic){ 
//             topics.push(ele);

//         }
//     });
//     displayChallenges(topics);


// })


let order = {
        Easy: 1,
        Medium: 2,
        Hard: 3
    };

let prev=document.getElementById("prev");
let next=document.getElementById("next");
let pageno=document.getElementById("pageno");
let currentpage=1;
let itemsperpage=5;
let totalpages = 1;

function applyFilters(){  
    let filtered=allchallenges;
    filtered=filtered.filter(ele=>{
        return ele.title.toLowerCase().includes(search.value.toLowerCase()) 
            
        
    }) ;
    filtered=filtered.filter(ele=>{
        if(level.value=="All"){
            
            return true;
        }
        else
            return ele.difficulty==level.value
        
    });
    filtered=filtered.filter(ele=>{ 
        if(topic1.value=="All"){
            
            return true;
        }
        else
            return topic1.value==ele.topic
        
    }); 

    if(sort.value=="az"){
        filtered.sort((a,b)=>{ 
            return a.title.localeCompare(b.title);
    
        });

    } 

    else if(sort.value=="za"){
        filtered.sort((a,b)=>{ 
            return b.title.localeCompare(a.title);
    
        });

    } 

    
    else if (sort.value == "easyhard") {
       

        filtered.sort((a, b) => {
            return order[a.difficulty] - order[b.difficulty];
        });
    } 

    else if (sort.value == "hardeasy") {
      
        filtered.sort((a, b) => {
            return order[b.difficulty] - order[a.difficulty];
        });
    }
    
    // pagination 

  
    let startidx=(currentpage-1)*itemsperpage;
    let endidx=startidx+itemsperpage; 
    let pageData=filtered.slice(startidx,endidx);
    totalpages=Math.ceil(filtered.length/itemsperpage);
    




    // displayChallenges(filtered);
    displayChallenges(pageData);



}
search.addEventListener("input", function () { 
    currentpage = 1;
    pageno.textContent = currentpage;
    applyFilters();
});

level.addEventListener("change", function () { 
    currentpage = 1;
    pageno.textContent = currentpage;
    applyFilters();
});

topic1.addEventListener("change", function () {
    currentpage = 1;
    pageno.textContent = currentpage;
    applyFilters();
});

sort.addEventListener("change",function(){
    currentpage = 1;
    pageno.textContent = currentpage;
    applyFilters();
})

//
next.addEventListener("click", function () {  
    // console.log(currentpage);
    // console.log(totalpages);
    if(currentpage<totalpages){
        currentpage++;
        pageno.textContent=currentpage;
        applyFilters();
    } 


});
prev.addEventListener("click", function () { 
    if(currentpage>1){
        currentpage--;
        pageno.textContent=currentpage;
        applyFilters();
    }

});


// display 
// async function displayChallenges(data) { 
//     cont.innerHTML='';
//      data.forEach(ele=>{
//         let item=document.createElement("div"); 
        
//         item.innerHTML=`  
//         <p> problem : ${ele.title} </p> 
//         <p> topic : ${ele.topic} </p>
//         <p> difficulty : ${ele.difficulty} </p>
//         <button onclick="openChallenge(${ele.id})">solve</button>
        

//         ` 
        
//         cont.appendChild(item);               
        

        
        
//     })  
    
    
// } 
async function displayChallenges(data) {

    cont.innerHTML = "";

    // Header Row
    let header = document.createElement("div");
    header.className = "challenge-header";

    header.innerHTML = `
        <span>Problem</span>
        <span>Topic</span>
        <span>Difficulty</span>
        <span>Action</span>
    `;

    cont.appendChild(header);

    data.forEach(ele => {

        let item = document.createElement("div");

        item.className = "challenge-row";

        item.innerHTML = `
            <span>${ele.title}</span>

            <span>${ele.topic}</span>

            <span class="${ele.difficulty.toLowerCase()}">
                ${ele.difficulty}
            </span>

            <button onclick="openChallenge(${ele.id})">
                Solve
            </button>
        `;

        cont.appendChild(item);

    });

}






