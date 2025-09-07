// Define setting
var gapNumpad = 20;
var operatePad = "789/456*123-.0=+";
//
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}
function createBox() {
    var grid = document.createElement("div");
    grid.style.display = "flex";
    // grid.style.boxSizing = "border-box";
    grid.style.border = "1px solid";
    grid.style.flex = "1";
    grid.style.justifyContent = "center";
    grid.style.alignItems = "center";
    grid.style.fontSize = "32px";
    grid.textContent = "";
    grid.addEventListener("click", function () {
        updateDisplay(grid);
    });
    return grid;
}
function createRowGrid() {
    var rowGrid = document.createElement("div");
    rowGrid.style.display = "flex";
    rowGrid.style.flexDirection = "row";
    rowGrid.className = "rowGrid";
    rowGrid.style.flex = "1";
    rowGrid.style.gap = "".concat(gapNumpad, "px");
    return rowGrid;
}
function createGrid(Div, sizeX, sizeY) {
    var gridArray = [];
    for (var row = 0; row < sizeY; row++) {
        var Row = createRowGrid();
        var gridRow = [];
        for (var column = 0; column < sizeX; column++) {
            var grid = createBox();
            Row.appendChild(grid);
            gridRow.push(grid);
        }
        Div.appendChild(Row);
        gridArray.push(gridRow);
    }
    return gridArray;
}
function selectDivQueryTypeSafe(divClass) {
    var div = document.querySelector(".".concat(divClass));
    if (!div) {
        throw new Error("Element .".concat(divClass, " not found"));
    }
    return div;
}
;
function assignOperatePad(gridArray) {
    var row = gridArray.length;
    var column = gridArray[0].length;
    var indexOperatePad = 0;
    gridArray[0][0].textContent = "Clear";
    gridArray[0][1].textContent = "Delete";
    gridArray[0][2].remove();
    gridArray[0][3].remove();
    for (var i = 1; i < row; i++) {
        for (var j = 0; j < column; j++) {
            gridArray[i][j].textContent = operatePad.split("")[indexOperatePad];
            assignClassToPad(gridArray[i][j]);
            indexOperatePad += 1;
        }
    }
}
function assignClassToPad(gridBox) {
    var content = parseInt(gridBox.textContent);
    if (content) {
        gridBox.className = "number";
    }
    else {
        gridBox.className = "operator";
    }
    return;
}
var displayText = [""];
var currPointerTextDisplay = 0;
function updateDisplay(gridBox) {
    var display = selectDivQueryTypeSafe("Display");
    var text = gridBox.textContent;
    if (text === "Clear") {
        display.textContent = "";
        displayText = [""];
    }
    else if (text === "Delete") {
        var bufferText = display.textContent.split("");
        display.textContent = bufferText.slice(0, bufferText.length - 1).join("");
        if ((displayText[currPointerTextDisplay] === "") && (displayText.length != 1)) {
            displayText.pop();
            displayText.pop();
            currPointerTextDisplay -= 2;
        }
        else {
            displayText[currPointerTextDisplay] = displayText[currPointerTextDisplay].slice(0, displayText[currPointerTextDisplay].length - 1);
        }
    }
    else {
        display.textContent += text;
        if (gridBox.className === "number") {
            displayText[currPointerTextDisplay] += text;
        }
        else {
            displayText.push(text);
            displayText.push("");
            currPointerTextDisplay += 2;
        }
    }
    console.log(displayText);
    return;
}
function main() {
    var numPad = selectDivQueryTypeSafe("Numpad");
    numPad.style.gap = "".concat(gapNumpad, "px");
    var operatePadGrid = createGrid(numPad, 4, 5);
    assignOperatePad(operatePadGrid);
    console.log("This is worked!");
}
main();
