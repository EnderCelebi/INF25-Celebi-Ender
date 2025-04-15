class Point {
    constructor(x, y) {
        this.x = x;   
        this.y = y;
    }
}

const polygon  = [new Point(2,2),new Point(2,10), new Point(13,5), new Point(5,5)];

let centruG = new Point(0,0);
const O=new Point(0,0);

afisarePoligon();

for(let punct of polygon){
    centruG.x += punct.x;
    centruG.y += punct.y;
}

centruG.x /= polygon.length;
centruG.y /= polygon.length;

console.log(`Centrul de greutate xG: ${centruG.x} yG: ${centruG.y}`);

for(let punct of polygon){
    punct.x -= centruG.x;
    punct.y -= centruG.y;
}

afisarePoligon();

for(let i=0 ; i< polygon.length ; i++){
    for(let j=i ; j< polygon.length; j++){
        if(comparare(polygon[i],polygon[j]) == -1){
            let temp= polygon[j];
            polygon[j] = polygon[i];
            polygon[i] = temp;
        }
    }
}

console.log("Dupa sortare::");
afisarePoligon();

let M= new Point(6,3);
M.x -= centruG.x;
M.y -= centruG.y;

let pos = 0;
for(let i=0; i<polygon.length; i++){
    if(comparare(M,polygon[i]) == -1)
        pos = i;
    else
        break;
}

function comparare(a, b) {
    let cadA = calculareCadran(a);
    let cadB = calculareCadran(b);

    if(cadA < cadB) 
        return 1;
    else if(cadA > cadB)
        return -1;
    else if(cadA == cadB){
        return calculareDeterminant(b, O, a) > 0 ? 1 : -1;
    } 
    return 0;
}

function calculareDeterminant(a , b , c){
    return a.x*b.y + b.x*c.y + c.x*a.y - b.y*c.x - c.y*a.x - a.y*b.x;
}

function calculareCadran(a) {
    if(a.x > 0 && a.y >= 0)
        return 1;
    else if(a.x <= 0 && a.y > 0)
        return 2;
    else if(a.x < 0 && a.y <= 0)
        return 3;
    return 4;
}

function afisarePoligon (){
    for(let punct of polygon){
        console.log(`x: ${punct.x} y: ${punct.y}`);
    }
}