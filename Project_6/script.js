function accordionclick() {
    const accordion=document.querySelectorAll('.accordion');

// using each loop
accordion.forEach( accord=> {
    const icon=accord.querySelector('.fa-solid');
    const answer=accord.querySelector('.answer');

    accord.addEventListener('click', ()=>{
        icon.classList.toggle('active');
        answer.style.display='inline-block'
        // answer.classList.toggle('active');
    })
});
}
accordionclick();



