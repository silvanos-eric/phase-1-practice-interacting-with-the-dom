// Application state
let timer = 0;
let timerId = null;

// Elements on interest
const counter = document.querySelector("h1#counter");

// State update functions
function incrementTimer() {
  timer++;
}

function decrementTimer() {
  timer--;
}

// Utility functions
function repeatAfterInterval(cb, interval) {
  timerId = setInterval(cb, interval);
}

// Update an element's text content
function updateElTextContent(el, newTextContent) {
  el.textContent = newTextContent;
}

// As soon as the page is loaded the timer should increment every second
document.addEventListener("DOMContentLoaded", () => {
  repeatAfterInterval(() => {
    incrementTimer();
    updateElTextContent(counter, timer);
  }, 1000);
});
