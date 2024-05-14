// all selection
let main_input_field = document.querySelector("#input-box");
let add_button = document.querySelector("#add-button");
let ul_container = document.querySelector(".cont-tasks");
//main code
let cross_symbol;
function getInputValAndAddTask() {
    let input_val = main_input_field.value;
    if (input_val == "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Yon can't set field empty",
            footer: '<a href="#">Why do I have this issue?</a>',
        });
    } else {
        let li = document.createElement("li");
        li.classList.add("li-task");
        ul_container.appendChild(li);
        li.innerHTML = `<e class="fa-regular fa-circle"></e> ${input_val} <span id="cross-symbol-i"><p class="fa-solid fa-xmark"></p></span> `;
        cross_symbol = document.querySelector("#cross-symbol-i");
        main_input_field.value = "";
        storeToLocalStorage();
    }
}
//calling get val func when click
add_button.addEventListener("click", getInputValAndAddTask);

ul_container.addEventListener(
    "click",
    (e) => {
        let li_child = e.target.childNodes;
        if (e.target.tagName == "LI") {
            li_child[0].classList.toggle("checked");
            e.target.classList.toggle("li-checked");
            storeToLocalStorage();
        } else if (e.target.tagName == "P") {
            let iParent = e.target.parentElement;
            let spanParent = iParent.parentElement;
            spanParent.remove();
            storeToLocalStorage();
        }
    }
);

function storeToLocalStorage(){
    localStorage.setItem("data",ul_container.innerHTML);
}
function getDataFromLocalStorage() {
    ul_container.innerHTML=localStorage.getItem("data");
}
getDataFromLocalStorage();