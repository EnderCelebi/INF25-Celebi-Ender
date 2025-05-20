let parola = document.getElementById("parola");
let reParola = document.getElementById("re-parola");
let error = document.getElementById("error");
let schimbaBtn = document.getElementById("schimba");

parola.addEventListener("input", validareParola)
reParola.addEventListener("input", (ev) => validareParola())
schimbaBtn.addEventListener("click" , schimbaParola);


function validareParola(ev){
    if(parola.value == reParola.value){
        schimbaBtn.removeAttribute("disabled");
        error.innerText = "";
    }
    else{
        schimbaBtn.setAttribute("disabled", true);
        error.innerText = "Parolele nu sunt identice";
    }
}

function schimbaParola(ev) {
    ev.preventDefault();
}

let a = document.getElementById("a");
let b = document.getElementById("b");

a.addEventListener("click", () => console.log("a"));
b.addEventListener("click", (ev) => {
    ev.stopPropagation();
    console.log("b");
});
let add = document.getElementById("add");

add.addEventListener("click", adaugaNotita);

function adaugaNotita() {
    let nota = document.createElement("div");
    nota.innerText = document.getElementById("todo").value;
    document.getElementById("notite").appendChild(nota);
}
