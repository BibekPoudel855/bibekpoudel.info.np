let faqBoxes=document.querySelectorAll(".faq-inner-container");
let faqAns=document.querySelectorAll(".faq-ans");
console.log(faqBoxes);
faqBoxes.forEach((box)=>{
    box.addEventListener("click",(e)=>{
    let contChild=box.childNodes;
    let qnsChlid=contChild[1].childNodes;
    let i=qnsChlid[3];
    i.classList.toggle("js-rotate");
    contChild[3].classList.toggle("js-passive");
    });
});

///2nd method
////////////
function methodIIForFaq(){
    // not called 
    for (let i = 0; i < faqBoxes.length; i++) {
        faqBoxes[i].addEventListener("click",(e)=>{
            faqAns[i].classList.toggle("js-passive");
        });
    };
}
function methodIII() {
    // 1 method
// not calleddd
// remove any one method 
// we are doing this method by selecting childnodess
faqBoxes.forEach((box)=>{
    let i=box.querySelector("i");
    box.addEventListener("click",(e)=>{
    i.classList.toggle("js-rotate");
    let ans=box.childNodes;
    ans[3].classList.toggle("js-passive");
        });
    });
}