let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-game");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

// Player X // Player Y //

let turnO = true;
let count = 0;

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) =>
  box.addEventListener("click", () => {
    if (turnO === true) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (!isWinner && count === 9) {
      drawGame();
    }
  })
);

const resetGame = () => {
  turnO = true;
  enabledBtns();
  msgContainer.classList.add("hide");
  count = 0;
};

const disabledBtns = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};

const enabledBtns = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

let drawGame = () => {
  msg.innerText = "The game is draw";
  msgContainer.classList.remove("hide");
  disabledBtns();
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! The winner is ${winner}.`;
  msgContainer.classList.remove("hide");
  disabledBtns();
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    let firstVal = boxes[pattern[0]].innerText;
    let secondVal = boxes[pattern[1]].innerText;
    let thirdVal = boxes[pattern[2]].innerText;
    if (firstVal !== "" && secondVal !== "" && thirdVal !== "") {
      if (firstVal == secondVal && secondVal == thirdVal) {
        console.log("winner");
        showWinner(firstVal);
        return true;
      }
    }
  }
};

// newBtn.disabled = false;
// resetBtn.disabled = false;

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
