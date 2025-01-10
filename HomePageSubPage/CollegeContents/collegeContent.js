let isButton= document.querySelector(".open-is-cw");
console.log(isButton);

isButton.addEventListener("click",()=>{
    let pswfield= prompt("enter password given by bibek");
    if(pswfield=="12345"){
        window.open("./../isCourseWork/Course_Work1_Information_System/index.html");
    }
});