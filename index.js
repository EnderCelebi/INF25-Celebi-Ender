//console.log(validatorCif("1234test"));
//console.log(validatorCif("1234567890123"));
//console.log(validatorCif("14826496"));


function validatorCif(cif){
    const cheie = "753217532".split("").reverse();
    if(cif.slice(0, 2) == 'RO')
        cif = cif.slice(2);
    if(!/^\d+$/.test(cif)){
        console.error("Cif/Cui este format doar din cifre");
        return false;
    }

    if(cif.length > 10){
        console.error("Cif/Cui poate avea maxim 10 caractere numerice");
        return false;
    }
    
    cif = cif.split("").reverse();
    let control=0;
    for(let i=1; i < cif.length ; i++){
        control += cif[i] * cheie[i-1];
    }

    control = (control * 10) % 11;

    if(control == 10) control = 0;

    return control == cif[0];
}

function validareISBN13(isbn){
    if(!/^\d{1,3}-?\d{10,12}$/.test(isbn)){
        console.error("Format incorect");
        return false;
    }

    let j = 1;
    let res = 0;
    for(let i=0 ; i < isbn.length -1; i++){
        if(isbn[i] == "-") continue;

        if(j % 2 == 0)
            res += isbn[i] * 3;
        else 
            res += Number.parseInt(isbn[i]);
        j++;
    }
    console.log(res, isbn[isbn.length -1]);
    return (res + Number.parseInt(isbn[isbn.length-1])) % 10 == 0;
}
console.log(validareISBN13("978-0571281749"))