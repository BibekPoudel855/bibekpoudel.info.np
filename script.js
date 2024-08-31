// Selections
let mainContainer=document.querySelector(".main-container");
// main code
let clutter='';
addStructure();
function addStructure() {
    projectData.forEach((data)=>{
        console.log(data.projectLink);
        clutter+=`
        <div class="card">
                <img src="${data.projectImg}" alt="img">
                <h1><a href="${data.projectLink}" target="_blank">${data.projectName}</a></h1>
                <p>${data.projectDescription}</p>
                <p class="last-updated">Last Updated ${data.projectChangesDate}</p>
            </div>
        `;
    });
    addClutterToPage(clutter);
}
function addClutterToPage(clutter) {
    mainContainer.innerHTML=clutter;
}