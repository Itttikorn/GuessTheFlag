import { fetchAndDrawTable } from "./table.js";
import { createItem , editItem } from "./api.js";



let score = 0;
let name = "Guest";
let userid="";
let nation = [];
fetch('./flaglist.json')
    .then((response) => response.json())
    .then((json) => nation=json);

//const nation= JSON.parse(data);
let correctimg = "https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
let correctcountry = "America";//change correct country here


const closePopupButton = document.getElementById("closePopup");
const popup = document.getElementById("popup");
const popupans = document.getElementById("popupanswer");
const nextPopupButton = document.getElementById("next-button");
const okButton = document.getElementById("okbutton");
const popupuser = document.getElementById("popupuser");

okButton.addEventListener("click", async function(){
    var newname = document.getElementById("input").value;
    name=newname;
    if(name != ""){  
        const payload = {
          name: newname,
          score: 0,
        };
        userid = await createItem(payload);
        console.log(userid);
        popupuser.style.display = "none";
        re();
    }
    else{
        alert("Please fill your name!");
    }
})

closePopupButton.addEventListener("click", function () {
    location.reload();
});

async function closepopupans (x){
    if(x==1){
        await fetchAndDrawTable(userid);
        popupans.style.display = "none";
        popup.style.display = "block";
        re();
    }else{
      popupans.style.display = "none";
    }
}

// Close the popup if the user clicks outside of it
window.addEventListener("click", function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
});

async function plus(){
    popupcor();
    score++;
    const payload = {
      name: name,
      score: score,
    };
    await editItem(userid,payload)
    re();
}

function endg(){
    //popup.style.display = "block";
    
    popupwrong();
    score = 0;
    //pu.style.display = "block";
}

function re(){
    const sco = document.querySelector("#score");
    sco.innerText="score : "+score;
    sco.append;
    //console.log(score);
    let c = Math.floor(Math.random() * 200);
    correctimg = nation[c].flag;
    correctcountry = nation[c].country;
    let image = document.getElementById("image");
    image.innerHTML = "<img class = \"image_resize\" src="+correctimg+"></img>"
    image.append;
    let choice = document.querySelector("#choices");
    for(let i=0;i<4;i++){
        choice.children[0].remove();
        //console.log(children[0]);
    }
    let arr=[];
    let pos = Math.floor(Math.random() * 4);
    for(let i=0;i<4;i++){
        let ch = document.createElement("div");
        let result = Math.floor(Math.random() * 200); //change number of country here
        while(arr.includes(result) || result == c){
            result = Math.floor(Math.random() * 200); //change number of country here
        }
        if(i==pos){
            result = c;
            ch.addEventListener("click", () => plus());
            ch.innerHTML="<p>"+ nation[result].country + "</p>";
        }
        else{
            ch.addEventListener("click", () => endg());
            ch.innerHTML="<p>"+ nation[result].country + "</p>";
        }
        arr.push(result);
        //console.log(result);
        
        ch.className="choice";
        choice.appendChild(ch);
    }
}
function popupcor(){
    popupans.style.display = "block";
    let text = document.getElementById("textshow");
    console.log(text.children.length);
    let num = text.children.length;
    for(let i=0;i<num;i++){
        text.children[0].remove();
    }
    
    let intextimg = document.createElement("img");
    let intext = document.createElement("h2");
    let corcountry = document.createElement("p");
    let nextbutton = document.createElement("div");
    nextbutton.className="next";
    nextbutton.addEventListener("click", () => closepopupans(0));
    nextbutton.innerHTML="<p id=\"next-button\">Next</p>";
    corcountry.innerText = correctcountry;
    corcountry.className = "popup-text";
    intext.innerText = "Correct!";
    intextimg.setAttribute('src',correctimg);
    intextimg.className = "popup-image";
    intext.className = "popup-texthead";
    text.appendChild(intext);
    text.appendChild(intextimg);
    text.appendChild(corcountry);
    text.appendChild(nextbutton);
}

function popupwrong(){
    popupans.style.display = "block";
    let text = document.getElementById("textshow");
    console.log(text.children.length);
    let num = text.children.length;
    for(let i=0;i<num;i++){
        text.children[0].remove();
    }
    
    let intextimg = document.createElement("img");
    let intext = document.createElement("h2");
    let corcountry = document.createElement("p");
    let para = document.createElement("p");
    let scoreshow = document.createElement("h4");
    let nextbutton = document.createElement("div");
    nextbutton.className="leader-button";
    nextbutton.addEventListener("click", () => closepopupans(1));
    nextbutton.innerHTML="<p id=\"next-button\">next</p>";
    corcountry.innerText = correctcountry;
    corcountry.className = "popup-text";
    intext.innerText = "Wrong!";
    
    scoreshow.innerText="Your score is : "+score;
    scoreshow.className = "popup-score";
    intextimg.setAttribute('src',correctimg);
    para.innerText = "The correct answer is..";
    para.className = "popup-para";
    intextimg.className = "popup-image";
    intext.className = "popup-texthead";
    text.appendChild(intext);
    text.appendChild(scoreshow);
    text.appendChild(intextimg);
    text.appendChild(para);
    text.appendChild(corcountry);
    text.appendChild(nextbutton);
}


