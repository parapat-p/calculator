// Define setting
const gapNumpad = 20;
const operatePad = "789/456*123-.0=+";
//

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

function createBox(): HTMLDivElement{
    let grid:HTMLDivElement = document.createElement("div");
    grid.style.display = "flex";
    // grid.style.boxSizing = "border-box";
    grid.style.border = "1px solid";
    grid.style.flex = "1";
    grid.style.justifyContent = "center";
    grid.style.alignItems = "center";
    grid.style.fontSize = "32px";
    grid.textContent = "";
    grid.addEventListener("click",() => {
        updateDisplay(grid);
    });
    return grid
}

function createRowGrid() :HTMLDivElement{
    let rowGrid = document.createElement("div");
    rowGrid.style.display = "flex"
    rowGrid.style.flexDirection ="row";
    rowGrid.className = "rowGrid";
    rowGrid.style.flex = "1";
    rowGrid.style.gap = `${gapNumpad}px`;
    return rowGrid;
}

function createGrid(Div:HTMLDivElement,sizeX:number,sizeY:number):HTMLDivElement[][]{
    let gridArray:HTMLDivElement[][] = [];
    for(let row = 0;row<sizeY;row++){
        let Row:HTMLDivElement = createRowGrid();
        let gridRow:HTMLDivElement[] = [];
        for(let column = 0;column<sizeX;column++){
            let grid = createBox();
            Row.appendChild(grid);
            gridRow.push(grid);
        }
        Div.appendChild(Row);
        gridArray.push(gridRow);
    }
    return gridArray;
}

function selectDivQueryTypeSafe(divClass:string):HTMLDivElement{
    const div = document.querySelector<HTMLDivElement>(`.${divClass}`)
    if(!div){
        throw new Error(`Element .${divClass} not found`);
    }
    return div;
};

function assignOperatePad(gridArray:HTMLDivElement[][]){
    let row = gridArray.length;
    let column = gridArray[0].length;
    let indexOperatePad = 0;
    gridArray[0][0].textContent = "Clear";
    gridArray[0][1].textContent = "Delete";
    gridArray[0][2].remove();
    gridArray[0][3].remove();
    for(let i = 1;i<row;i++){
        for(let j = 0;j<column;j++){
            gridArray[i][j].textContent = operatePad.split("")[indexOperatePad];
            assignClassToPad(gridArray[i][j]);
            indexOperatePad+=1
        }
    }
}

function assignClassToPad(gridBox:HTMLDivElement){
    let content = parseInt(gridBox.textContent);
    if(content){
        gridBox.className = "number";
    }
    else{
        gridBox.className = "operator";
    }
    return;
}

let displayText:string[] = [""];
let currPointerTextDisplay:number = 0;

function updateDisplay(gridBox:HTMLDivElement){
    const display = selectDivQueryTypeSafe("Display");
    let text = gridBox.textContent;
    if(text==="Clear"){
        display.textContent = "";
        displayText = [""];
    }
    else if(text==="Delete"){
        let bufferText:string[] = display.textContent.split("");
        display.textContent=bufferText.slice(0,bufferText.length-1).join("");
        if((displayText[currPointerTextDisplay]==="") && (displayText.length!=1)){
            displayText.pop();
            displayText.pop();
            currPointerTextDisplay -= 2;
        }
        else{
            displayText[currPointerTextDisplay] = displayText[currPointerTextDisplay].slice(0,displayText[currPointerTextDisplay].length-1);
        }
    }
    else{
        display.textContent += text;
        if(gridBox.className === "number"){
            displayText[currPointerTextDisplay] += text;
        }
        else{
            displayText.push(text)
            displayText.push("")
            currPointerTextDisplay += 2;
        }
    }
    console.log(displayText);
    return;
}


function main(){
    const numPad = selectDivQueryTypeSafe("Numpad");
    numPad.style.gap = `${gapNumpad}px`;
    const operatePadGrid = createGrid(numPad,4,5);
    assignOperatePad(operatePadGrid);
    console.log("This is worked!");
}

main();