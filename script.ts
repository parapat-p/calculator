// Define setting
const gapNumpad = 20;
const operatePad = "789/456*123-0.=+";
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
    grid.className = "numpad";
    grid.style.display = "flex";
    // grid.style.boxSizing = "border-box";
    grid.style.border = "1px solid";
    grid.style.flex = "1";
    grid.style.justifyContent = "center";
    grid.style.alignItems = "center";
    grid.style.fontSize = "32px";
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
    for(let i = 0;i<row;i++){
        for(let j = 0;j<column;j++){
            gridArray[i][j].textContent = operatePad.split("")[indexOperatePad];
            indexOperatePad+=1
        }
    }
}


function main(){
    const numPad = selectDivQueryTypeSafe("Numpad");
    numPad.style.gap = `${gapNumpad}px`;
    const operatePadGrid = createGrid(numPad,4,4);
    assignOperatePad(operatePadGrid);
    console.log("This is worked!");
}

main();