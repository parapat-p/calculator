// Define setting
const gapNumpad = 20;
const operatePad = "789/456*123-.0=+";
let disableOperatorPad = true;
//


function operate(a:number,b:number,operator:string){
    switch(operator){
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "/":
            if(b===0){
                throw new Error(`Divide by zero!`);
            }
            return a/b;
        case "*":
            return a*b;
    }
}

function createBox(): HTMLDivElement{
    let grid:HTMLDivElement = document.createElement("div");
    grid.style.display = "flex";
    grid.style.border = "1px solid";
    grid.style.flex = "1";
    grid.style.justifyContent = "center";
    grid.style.alignItems = "center";
    grid.style.fontSize = "32px";
    grid.textContent = "";
    grid.addEventListener("click",gridEvent)
    return grid
}

function gridEvent(e: MouseEvent){
    const gridBox = e.currentTarget as HTMLDivElement;
    const currentInput = gridBox.className;
    if(currentInput==="operator"){
        updateDisplay(gridBox);
        toggleOperatorPad("Off");

    }
    else if(currentInput==="number"){
        updateDisplay(gridBox);
        if(disableOperatorPad){
            toggleOperatorPad("On");
        }
    }
    else{
        updateDisplay(gridBox);
        if(displayText[currPointerTextDisplay]===""){
            toggleOperatorPad("Off");
        }
    }


}

function toggleOperatorPad(action:string){
    const gridOperators = document.querySelectorAll<HTMLDivElement>(".operator");
    switch(action){
        case "On":
            gridOperators.forEach(grid => {
            grid.style.opacity = "1";
            grid.addEventListener("click",gridEvent);
            })
            disableOperatorPad = false;
            break;
        case "Off":
            gridOperators.forEach(grid => {
            grid.style.opacity = "0.2";
            grid.removeEventListener("click",gridEvent);
            })
            disableOperatorPad = true;
            break;
    }
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
    const text = gridBox.textContent ?? "";
    const num = Number(text);

    if (!isNaN(num) && text.trim() !== "") {
        gridBox.className = "number";
    } else {
        gridBox.className = "operator";
    }
    const gridOperators = document.querySelectorAll<HTMLDivElement>(".operator");
            gridOperators.forEach(grid => {
            grid.style.opacity = "0.2";
            grid.removeEventListener("click",gridEvent);
        })
}

let displayText:string[] = [""];
let currPointerTextDisplay:number = 0;

function updateDisplay(gridBox:HTMLDivElement){
    const display = selectDivQueryTypeSafe("Display");
    let text = gridBox.textContent;
    switch(text){
        case "Clear":
            display.textContent = "";
            displayText = [""];
            break;

        case "Delete":
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
            break;

        default:
            display.textContent += text;
            if(gridBox.className === "number"){
                displayText[currPointerTextDisplay] += text;
            }
            else{
                displayText.push(text)
                displayText.push("")
                currPointerTextDisplay += 2;
            }
            break;
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