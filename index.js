//console.log(localStorage.getItem("tema"));
//localStorage["tema"]="dark";
//console.log(localStorage.getItem("tema"));

//sessionStorage["tema"]="darkkkk";

let user={nume: "Ender", oras: "DULCESTI"};

sessionStorage["user"] =JSON.stringify(user);

console.log(sessionStorage.getItem("user"));


