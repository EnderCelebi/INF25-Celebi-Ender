console.log(validareCNP("2990219469000"));

function validareCNP(cnp) {
    const cheie = "279146358279".split("");
    const cnpArray = cnp.split("");
    let control = 0;

    if(cnpArray.length != 13){
        console.error("CNP-ul trebuie sa contina 13 caractere!");
        return false;
    }
    
    for(let i=0; i<cheie.length; i++){
        console.log(isNaN(cnpArray[i]));
        if(isNaN(cnpArray[i])){
            console.error("CNP-ul trebuie sa contina doar cifre!");
            return false;
        }
        control += cheie[i] * cnpArray[i];
    }

    control = control % 11;

    if(control == 10) control = 1 ;

    return control == cnpArray[12];
}