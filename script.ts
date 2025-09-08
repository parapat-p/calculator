// Define setting
const gapNumpad:number = 20;
const operatePad:string = "789/456*123-.0=+";
let disableOperatorPad:boolean = true;
let currentSolution:string = "";
let divZeroflag = false;
//


function operate(a:number,b:number,operator:string){

    switch(operator){
        case "+":
            return String(a+b);
        case "-":
            return String(a-b);
        case "/":
            if(b===0){
                return "NaN";
            }
            return String(a/b);
        case "*":
            return String(a*b);
        default:
            return String(0);
    }
}

function resetDisplay(){
    const display = selectDivQueryTypeSafe("Display");
    display.textContent = "";
    displayText = [""];
    currPointerTextDisplay = 0;
}

function calculate() {
    const display = selectDivQueryTypeSafe("Display");
    if(displayText.length===3){
        let a = Number(displayText[0]);
        let operator = displayText[1];
        let b = Number(displayText[2]);
        
        currentSolution = operate(a,b,operator);

        if(currentSolution=== "NaN" ){
            display.textContent = "Divide by zero detected";
            divZeroflag=true;
        }
        else{
            display.textContent = currentSolution;
            displayText = [currentSolution];
        }
        currPointerTextDisplay=0;
    }
    else{
        currentSolution=displayText[0];
    }
    return;
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
        if(gridBox.textContent!=="="){
            toggleOperatorPad("Off");
        }
        else{
            //DO nothing
        }
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

function toggleSinglePad(gridBox:HTMLDivElement,action:string){
    switch(action){
        case "On":
            gridBox.style.opacity = "1";
            gridBox.addEventListener("click",gridEvent);
            break;
        case "Off":
            gridBox.style.opacity = "0.2";
            gridBox.removeEventListener("click",gridEvent);
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
    setGridStyleOperator(gridArray[0][0])
    setGridStyleOperator(gridArray[0][1])
    addHover(gridArray[0][0]);
    addHover(gridArray[0][1]);
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

function addHover(gridBox:HTMLDivElement){
    let boxClass = gridBox.className;
    if(boxClass==="number"){
        gridBox.addEventListener("mouseenter",() =>{
            gridBox.style.backgroundColor = "#ccc";
        })
        gridBox.addEventListener("mouseleave",() => {
            gridBox.style.backgroundColor = "#ffffff";
        });
    }
    else{
        gridBox.addEventListener("mouseenter",() => {
            gridBox.style.backgroundColor = "#e07b00";
        });
        gridBox.addEventListener("mouseleave",() => {
            gridBox.style.backgroundColor = "#ff9500";
        });
    }
}

function setGridStyleOperator(gridBox:HTMLDivElement){
    gridBox.style.backgroundColor = "#ff9500";
    gridBox.style.color = "#ffffff";
}

function setGridStyleNumber(gridBox:HTMLDivElement){
    gridBox.style.backgroundColor = "#ffffff";
    gridBox.style.color = "#000000";
}

function assignClassToPad(gridBox:HTMLDivElement){
    const text = gridBox.textContent ?? "";
    const num = Number(text);
    if (!isNaN(num) && text.trim() !== "") {
        gridBox.className = "number";
        setGridStyleNumber(gridBox);
    } else {
        gridBox.className = "operator";
        setGridStyleOperator(gridBox);
    }
    const gridOperators = document.querySelectorAll<HTMLDivElement>(".operator");
            gridOperators.forEach(grid => {
            grid.style.opacity = "0.2";
            grid.removeEventListener("click",gridEvent);
        })
    addHover(gridBox);
    operatePadGrid[4][0].className = "float";
}
const display = selectDivQueryTypeSafe("Display");
let displayText:string[] = [""];
let currPointerTextDisplay:number = 0;
let currentIsFloat = false;

function updateDisplay(gridBox:HTMLDivElement){
    const display = selectDivQueryTypeSafe("Display");
    let text = gridBox.textContent;
    if(!currentIsFloat && gridBox.className!=="float"){
        toggleSinglePad(operatePadGrid[4][0],"On");
    }
    switch(text){
        case "Clear":
            resetDisplay();
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

        case ".":
            if(displayText[currPointerTextDisplay].indexOf(".") === -1){
                display.textContent += text;
                displayText[currPointerTextDisplay]+= text;
                toggleSinglePad(gridBox,"Off");
                currentIsFloat = true;
            }
            break;

        case "=":
            if(displayText.length===3){
                calculate();
            }
            else{
                display.textContent = currentSolution;
                displayText=[currentSolution];
                currPointerTextDisplay=0;
            }
            toggleOperatorPad("On");
            break;

        default:
            if(gridBox.className==="operator"){
                calculate();
            }
            display.textContent += text;
            if(divZeroflag){
                    divZeroflag = false;
                    resetDisplay()
                }
            if(gridBox.className === "number"){
                displayText[currPointerTextDisplay] += text;
            }
            else{
                currentIsFloat = false;
                displayText.push(text)
                displayText.push("")
                currPointerTextDisplay += 2;
            }
            break;
    }
    console.log(displayText);
    return;
}

const numPad = selectDivQueryTypeSafe("Numpad");
numPad.style.gap = `${gapNumpad}px`;
const operatePadGrid = createGrid(numPad,4,5);

function main(){
    assignOperatePad(operatePadGrid);
    console.log("This is worked!");
}



main();