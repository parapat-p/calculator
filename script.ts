function add(a:number,b:number){
    return a+b;
}

function subtract(a:number,b:number){
    return a-b;
}

function multiply(a:number,b:number){
    return a*b;
}

function divide(a:number,b:number){
    return a/b;
}

function operate(a:number,b:number,operator:string){
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
}