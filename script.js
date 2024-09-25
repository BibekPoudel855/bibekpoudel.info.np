// Selections
let mainContainer = document.querySelector(".main-container");
let searchBox = document.querySelector("#nav-search");
let searchButtonBigScreen = document.querySelector("#search-for-big-scr");
let resultNotFound = document.querySelector(".result-not-found");

// main code
let clutter = "";
addStructure();
function addStructure() {
  projectData.forEach((data) => {
    clutter += `
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
  mainContainer.innerHTML = clutter;
}

// Search function
function searchProjects(query) {
  const lowerCaseQuery = query.toLowerCase();
  return projectData.filter((project) => {
    return (
      project.projectName.toLowerCase().includes(lowerCaseQuery) ||
      project.projectDescription.toLowerCase().includes(lowerCaseQuery) ||
      project.projectCategory.toLowerCase().includes(lowerCaseQuery)
    );
  });
}

searchBox.addEventListener("input", () => {
  let query = searchBox.value;
  const results = searchProjects(query);
  console.log(results);
  addStructureForSearchedData(results);
});
function addStructureForSearchedData(results) {
  clutter = "";
  results.forEach((data) => {
    clutter += `
        <div class="card">
                <img src="${data.projectImg}" alt="img">
                <h1><a href="${data.projectLink}" target="_blank">${data.projectName}</a></h1>
                <p>${data.projectDescription}</p>
                <p class="last-updated">Last Updated ${data.projectChangesDate}</p>
            </div>
        `;
  });
  // for to make if search not found then show all items
  if (clutter == "") {
    //for to show result-not-found
    resultNotFound.style.display = "block";
    addStructure();
  } else {
    //for to hide result-not-found
    resultNotFound.style.display = "none";
    addClutterToPage(clutter);
  }
}
