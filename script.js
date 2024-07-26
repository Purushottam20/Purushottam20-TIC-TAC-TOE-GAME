let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.style.color = "blue"
            box.style.backgroundColor = "black"
            turn0 = false;
        }
        else {
            box.innerText = "X";
            box.style.color = "red"
            box.style.backgroundColor = "black"
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
        checkDraw();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "white"
    }
};
let isGameOver = false;
const showWinner = (winner) => {
    isGameOver = true;
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }

};

const checkDraw = () => {
    if (isGameOver != true) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerText === "") isDraw = false;
        })
        if (isDraw) {
            msg.innerText = `DRAW`;
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);