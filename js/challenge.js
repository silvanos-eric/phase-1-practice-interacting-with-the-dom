// Application state
let count = 0;
let timerId = null;
let numberOfLikes = 0;
let lastCheckedCount = -1;
let likesForPreviousCount = 0;

// Elements of interest
const counterEl = document.querySelector("h1#counter");
const minusBtnEl = document.querySelector("button#minus");
const plusBtnEl = document.querySelector("button#plus");
const likeBtnEl = document.querySelector("button#heart");
const likesEl = document.querySelector("ul.likes");
const pauseBtnEl = document.querySelector("button#pause");
const submitBtnEl = document.querySelector("button#submit");

// State update functions
function incrementCount() {
  count++;
}

function decrementCount() {
  count--;
}

function incrementLikes() {
  numberOfLikes++;
}

function resetLikes() {
  numberOfLikes = 0;
}

function incrementLikesForCurrentNumber() {
  if (!hasTimerIncreased()) {
    incrementLikes();
  } else {
    likesForPreviousCount = numberOfLikes;
    resetLikes();
    incrementLikes();
  }
}

// Utility functions
function repeatAfterInterval(cb, interval) {
  timerId = setInterval(cb, interval);
}

function updateElTextContent(el, newTextContent) {
  el.textContent = newTextContent;
}

function updateCounterElTextContent() {
  updateElTextContent(counterEl, count);
}

function hasTimerIncreased() {
  if (count > lastCheckedCount) {
    lastCheckedCount = count;
    return true;
  } else {
    return false;
  }
}

function addCurrentCountLikes() {
  const currentCount = count;

  // Check if element already exist in the DOM,
  // if it exists, update it, else create it
  const element = document.getElementById(`${count}`);

  if (element) {
    element.textContent = `${count} has been liked ${numberOfLikes} times`;
  } else {
    const likeEl = document.createElement("li");
    likeEl.setAttribute("id", `${count}`);
    likeEl.textContent = `${count} has been liked ${numberOfLikes} ${
      numberOfLikes === 1 ? "time" : "times"
    }`;
    likesEl.appendChild(likeEl);
  }
}

function pauseCounter() {
  clearInterval(timerId);
}

function disableAllBtnsExceptPauseBtn() {
  const btns = [minusBtnEl, plusBtnEl, likeBtnEl, submitBtnEl];

  btns.forEach((btn) => btn.setAttribute("disabled", true));
}

function switchLabelToResume() {
  pauseBtnEl.textContent = "resume";
}

// DOM Manipulation
document.addEventListener("DOMContentLoaded", () => {
  // As soon as the page is loaded the timer should increment every second
  repeatAfterInterval(() => {
    incrementCount();
    updateCounterElTextContent();
  }, 1000);

  // Manually increment and decrement the counter using plus and minus buttons
  minusBtnEl.addEventListener("click", () => {
    decrementCount();
    updateCounterElTextContent();
  });

  plusBtnEl.addEventListener("click", () => {
    incrementCount();
    updateElTextContent(counterEl, count);
  });

  // Display the number of likes associated with with a number
  likeBtnEl.addEventListener("click", () => {
    incrementLikesForCurrentNumber();
    addCurrentCountLikes();
  });

  // Functionality to pause the counter
  pauseBtnEl.addEventListener("click", () => {
    pauseCounter();
    disableAllBtnsExceptPauseBtn();
    switchLabelToResume();
  });
});
