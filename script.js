// Define setting
var gapNumpad = 20;
var operatePad = "789/456*123-.0=+";
var disableOperatorPad = true;
var currentSolution = "";
var divZeroflag = false;
//
function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return String(a + b);
        case "-":
            return String(a - b);
        case "/":
            if (b === 0) {
                return "NaN";
            }
            return String(a / b);
        case "*":
            return String(a * b);
        default:
            return String(0);
    }
}
function resetDisplay() {
    var display = selectDivQueryTypeSafe("Display");
    display.textContent = "";
    displayText = [""];
    currPointerTextDisplay = 0;
}
function calculate() {
    var display = selectDivQueryTypeSafe("Display");
    if (displayText.length === 3) {
        var a = Number(displayText[0]);
        var operator = displayText[1];
        var b = Number(displayText[2]);
        currentSolution = operate(a, b, operator);
        if (currentSolution === "NaN") {
            display.textContent = "Divide by zero detected";
            divZeroflag = true;
        }
        else {
            display.textContent = currentSolution;
            displayText = [currentSolution];
        }
        currPointerTextDisplay = 0;
    }
    else {
        currentSolution = displayText[0];
    }
    return;
}
function createBox() {
    var grid = document.createElement("div");
    grid.style.display = "flex";
    grid.style.border = "1px solid";
    grid.style.flex = "1";
    grid.style.justifyContent = "center";
    grid.style.alignItems = "center";
    grid.style.fontSize = "32px";
    grid.textContent = "";
    grid.addEventListener("click", gridEvent);
    return grid;
}
function gridEvent(e) {
    var gridBox = e.currentTarget;
    var currentInput = gridBox.className;
    if (currentInput === "operator") {
        updateDisplay(gridBox);
        if (gridBox.textContent !== "=") {
            toggleOperatorPad("Off");
        }
        else {
            //DO nothing
        }
    }
    else if (currentInput === "number") {
        updateDisplay(gridBox);
        if (disableOperatorPad) {
            toggleOperatorPad("On");
        }
    }
    else {
        updateDisplay(gridBox);
        if (displayText[currPointerTextDisplay] === "") {
            toggleOperatorPad("Off");
        }
    }
}
function toggleOperatorPad(action) {
    var gridOperators = document.querySelectorAll(".operator");
    switch (action) {
        case "On":
            gridOperators.forEach(function (grid) {
                grid.style.opacity = "1";
                grid.addEventListener("click", gridEvent);
            });
            disableOperatorPad = false;
            break;
        case "Off":
            gridOperators.forEach(function (grid) {
                grid.style.opacity = "0.2";
                grid.removeEventListener("click", gridEvent);
            });
            disableOperatorPad = true;
            break;
    }
}
function toggleSinglePad(gridBox, action) {
    switch (action) {
        case "On":
            gridBox.style.opacity = "1";
            gridBox.addEventListener("click", gridEvent);
            break;
        case "Off":
            gridBox.style.opacity = "0.2";
            gridBox.removeEventListener("click", gridEvent);
            break;
    }
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
    setGridStyleOperator(gridArray[0][0]);
    setGridStyleOperator(gridArray[0][1]);
    addHover(gridArray[0][0]);
    addHover(gridArray[0][1]);
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
function addHover(gridBox) {
    var boxClass = gridBox.className;
    if (boxClass === "number") {
        gridBox.addEventListener("mouseenter", function () {
            gridBox.style.backgroundColor = "#ccc";
        });
        gridBox.addEventListener("mouseleave", function () {
            gridBox.style.backgroundColor = "#ffffff";
        });
    }
    else {
        gridBox.addEventListener("mouseenter", function () {
            gridBox.style.backgroundColor = "#e07b00";
        });
        gridBox.addEventListener("mouseleave", function () {
            gridBox.style.backgroundColor = "#ff9500";
        });
    }
}
function setGridStyleOperator(gridBox) {
    gridBox.style.backgroundColor = "#ff9500";
    gridBox.style.color = "#ffffff";
}
function setGridStyleNumber(gridBox) {
    gridBox.style.backgroundColor = "#ffffff";
    gridBox.style.color = "#000000";
}
function assignClassToPad(gridBox) {
    var _a;
    var text = (_a = gridBox.textContent) !== null && _a !== void 0 ? _a : "";
    var num = Number(text);
    if (!isNaN(num) && text.trim() !== "") {
        gridBox.className = "number";
        setGridStyleNumber(gridBox);
    }
    else {
        gridBox.className = "operator";
        setGridStyleOperator(gridBox);
    }
    var gridOperators = document.querySelectorAll(".operator");
    gridOperators.forEach(function (grid) {
        grid.style.opacity = "0.2";
        grid.removeEventListener("click", gridEvent);
    });
    addHover(gridBox);
    operatePadGrid[4][0].className = "float";
}
var display = selectDivQueryTypeSafe("Display");
var displayText = [""];
var currPointerTextDisplay = 0;
var currentIsFloat = false;
function updateDisplay(gridBox) {
    var display = selectDivQueryTypeSafe("Display");
    var text = gridBox.textContent;
    if (!currentIsFloat && gridBox.className !== "float") {
        toggleSinglePad(operatePadGrid[4][0], "On");
    }
    switch (text) {
        case "Clear":
            resetDisplay();
            break;
        case "Delete":
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
            break;
        case ".":
            if (displayText[currPointerTextDisplay].indexOf(".") === -1) {
                display.textContent += text;
                displayText[currPointerTextDisplay] += text;
                toggleSinglePad(gridBox, "Off");
                currentIsFloat = true;
            }
            break;
        case "=":
            if (displayText.length === 3) {
                calculate();
            }
            else {
                display.textContent = currentSolution;
                displayText = [currentSolution];
                currPointerTextDisplay = 0;
            }
            toggleOperatorPad("On");
            break;
        default:
            if (gridBox.className === "operator") {
                calculate();
            }
            display.textContent += text;
            if (divZeroflag) {
                divZeroflag = false;
                resetDisplay();
            }
            if (gridBox.className === "number") {
                displayText[currPointerTextDisplay] += text;
            }
            else {
                currentIsFloat = false;
                displayText.push(text);
                displayText.push("");
                currPointerTextDisplay += 2;
            }
            break;
    }
    console.log(displayText);
    return;
}
var numPad = selectDivQueryTypeSafe("Numpad");
numPad.style.gap = "".concat(gapNumpad, "px");
var operatePadGrid = createGrid(numPad, 4, 5);
function main() {
    assignOperatePad(operatePadGrid);
    console.log("This is worked!");
}
main();
