const gameBoard = document.querySelector("#gameBoard");
const digits = document.querySelector("#digits");
const deleteNum = document.querySelector("#delete");
const mistake = document.querySelector("#mistake");
let lastSelected = null;
let error = 0;

//puzzle
const puzzle = [
   "8-6-1----",
   "--3-64-9-",
   "9-----816",
   "-8-396---",
   "7-2-4-3-9",
   "---572-8-",
   "521-----4",
   "-3-75-2--",
   "----2-1-5",
];

const solution = [
   "856917423",
   "213864597",
   "947235816",
   "185396724",
   "762148359",
   "394572681",
   "521683974",
   "439751268",
   "678429135",
];

window.onload = (() => {
   for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
         const div = document.createElement("div");
         div.classList.add("box");
         div.addEventListener("click", selectBox);
         div.setAttribute("row", i);
         div.setAttribute("col", j);


         if (puzzle[i][j] != "-") {
            div.innerText = puzzle[i][j];
            div.classList.add("filled");
         }

         if (i == 2 || i == 5) {
            div.classList.add("border-bottom");
         }

         if (j == 2 || j == 5) {
            div.classList.add("border-right");
         }
         gameBoard.appendChild(div);
      }
   }

   for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.classList.add("box");
      div.addEventListener("click", addNumber);
      div.innerText = i + 1;
      div.style.height = gameBoard.querySelector(".box").clientHeight + "px";
      digits.appendChild(div);
   }
});

function selectBox() {
   if (lastSelected != null) {
      lastSelected.classList.remove("select-box");
   }
   lastSelected = this;
   lastSelected.classList.add("select-box");
}

function addNumber() {
   if (lastSelected.innerText == "" || lastSelected.classList.contains("danger")) {
      lastSelected.innerText = this.innerText;
   }

   let row = lastSelected.getAttribute("row");
   let col = lastSelected.getAttribute("col");
   if (solution[row][col] == lastSelected.innerText) {
      lastSelected.classList.remove("danger");

   } else {
      lastSelected.classList.add("danger");
      addErrorandDisplay();
   }

   if (error > 2) {
      alert("You Lost!");
      location.reload();
   }

   if (isAllBoxesFilled()) {
      const allBoxes = gameBoard.querySelectorAll(".box");
      let userAnswer = [...allBoxes].map((box) => {
         return box.innerText;
      });
      let num = 0;
      for (let i = 0; i < 9; i++) {
         for (let j = 0; j < 9; j++) {
            if (solution[i][j] != userAnswer[num]) {
               allBoxes[num].classList.add("danger");
            }
            num++
         }
      }

      let dangerClass = [...allBoxes].some((box) => {
         return box.classList.contains("danger");
      });

      if (dangerClass) {
         if (error > 2) {
            alert("you lost!");
            location.reload();
         }
      } else {
         alert("Congratuations! You win the puzzle!");
      }
   }
}

deleteNum.onclick = () => {
   if (!lastSelected.classList.contains("filled")) {
      lastSelected.innerText = "";

   }
}

function addErrorandDisplay() {
   error++;
   mistake.innerText = error;
}

function isAllBoxesFilled() {
   const allBoxes = gameBoard.querySelectorAll(".box");
   return [...allBoxes].every((box) => {
      return box.innerText != "";
   });
}