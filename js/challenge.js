// Application state
let timer = 0;
let timerId = null;

// Elements on interest
const counterEl = document.querySelector("h1#counter");
const minusButtonEl = document.querySelector("button#minus");
const plusButtonEl = document.querySelector("button#plus");

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

function updateCounterEl() {
  updateElTextContent(counterEl, timer);
}

document.addEventListener("DOMContentLoaded", () => {
  // As soon as the page is loaded the timer should increment every second
  repeatAfterInterval(() => {
    incrementTimer();
    updateCounterEl();
  }, 1000);

  // Manually increment and decrement the counter using plus and minus buttons
  minusButtonEl.addEventListener("click", () => {
    decrementTimer();
    updateCounterEl();
  });

  plusButtonEl.addEventListener("click", () => {
    incrementTimer();
    updateElTextContent(counterEl, timer);
  });
});
