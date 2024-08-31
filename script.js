// Selections
let mainContainer=document.querySelector(".main-container");
let searchBox=document.querySelector("#nav-search");
let searchButtonBigScreen=document.querySelector("#search-for-big-scr");
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

// Search function
function searchProjects(query) {
    const lowerCaseQuery = query.toLowerCase();
    return projectData.filter(project => {
        return (
            project.projectName.toLowerCase().includes(lowerCaseQuery)||
            project.projectDescription.toLowerCase().includes(lowerCaseQuery) ||
            project.projectCategory.toLowerCase().includes(lowerCaseQuery)
        )
    });
}

searchBox.addEventListener("input",()=>{
    let query = searchBox.value;
    const results = searchProjects(query);
    addStructureForSearchedData(results);
});
function addStructureForSearchedData(results) {
    clutter='';
    results.forEach((data)=>{
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
