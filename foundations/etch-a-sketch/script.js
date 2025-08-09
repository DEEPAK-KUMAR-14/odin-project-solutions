// Etch-a-Sketch (Flexbox version) - script.js
// Creates squares dynamically and colors them on hover using event delegation.

// ----------------- Config -----------------
const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;

const container = document.getElementById("gridContainer");
const newGridBtn = document.getElementById("newGridBtn");
const clearBtn = document.getElementById("clearBtn");
const modeSelect = document.getElementById("modeSelect");

let currentSize = DEFAULT_SIZE;

// ----------------- Helpers -----------------
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * For 'darken' mode we store a small "darkness" value on dataset and apply
 * rgba(0,0,0,alpha). Dataset stays with the element so it persists.
 */
function applyDarken(square) {
  let d = parseFloat(square.dataset.darkness) || 0; // 0..1
  d = Math.min(1, d + 0.1); // increment by 0.1 each hover
  square.dataset.darkness = d.toString();
  square.style.backgroundColor = `rgba(0,0,0,${d})`;
}

// ----------------- Grid creation and manage -----------------
/**
 * clearContainer: remove all children (fast).
 */
function clearContainer() {
  // Fast clear
  container.innerHTML = "";
}

/**
 * createGrid(size) - generate size x size squares.
 * We set each square's inline width/height so they exactly fill the container.
 */
function createGrid(size = DEFAULT_SIZE) {
  currentSize = clamp(parseInt(size, 10) || DEFAULT_SIZE, 1, MAX_SIZE);
  clearContainer();

  // Use fragment for performance
  const frag = document.createDocumentFragment();

  // Use container's computed width/height to compute exact square sizes.
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // allow fractional pixels — browsers handle subpixel rendering.
  const squareW = containerWidth / currentSize;
  const squareH = containerHeight / currentSize;

  const total = currentSize * currentSize;
  for (let i = 0; i < total; i++) {
    const sq = document.createElement("div");
    sq.classList.add("square");

    // Size inline style ensures exact fit regardless of CSS rounding
    sq.style.width = `${squareW}px`;
    sq.style.height = `${squareH}px`;

    // dataset used for progressive darkening mode
    sq.dataset.darkness = "0";

    frag.appendChild(sq);
  }

  container.appendChild(frag);
}

/**
 * clearColors - remove inline backgroundColor and reset darkness dataset
 */
function clearColors() {
  const squares = container.querySelectorAll(".square");
  squares.forEach((sq) => {
    sq.style.backgroundColor = "";
    sq.dataset.darkness = "0";
  });
}

// ----------------- Coloring logic (delegated) -----------------
/**
 * colorSquare - given a .square element, color it according to current mode
 */
function colorSquare(square) {
  const mode = modeSelect.value;
  if (mode === "black") {
    square.style.backgroundColor = "#000";
  } else if (mode === "random") {
    square.style.backgroundColor = getRandomColor();
  } else if (mode === "darken") {
    applyDarken(square);
  } else {
    // fallback
    square.style.backgroundColor = "#000";
  }
}

// ----------------- UI interaction -----------------
/**
 * promptForNewGrid - ask user for size and rebuild grid.
 */
function promptForNewGrid() {
  const raw = prompt(`Enter grid size (1-${MAX_SIZE}):`, currentSize);
  if (raw === null) return; // user cancelled
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) {
    alert("Please enter a valid number.");
    return;
  }
  const size = clamp(n, 1, MAX_SIZE);
  createGrid(size);
}

/**
 * Event listeners setup
 */
function attachListeners() {
  // Delegated hover: mouseover behaves like "enter" for element without children
  container.addEventListener("mouseover", (e) => {
    const target = e.target;
    if (!target.classList || !target.classList.contains("square")) return;
    colorSquare(target);
  });

  newGridBtn.addEventListener("click", promptForNewGrid);
  clearBtn.addEventListener("click", clearColors);

  // Optional: responsive: if the container size changes (resize), recalc sizes
  // A simple approach: on resize recalc square sizes to keep them square
  window.addEventListener("resize", () => {
    // small debounce
    if (window.__etchTimeout) clearTimeout(window.__etchTimeout);
    window.__etchTimeout = setTimeout(() => {
      // reapply sizes for current size
      const squares = container.querySelectorAll(".square");
      if (squares.length === 0) return;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const squareW = containerWidth / currentSize;
      const squareH = containerHeight / currentSize;
      squares.forEach((sq) => {
        sq.style.width = `${squareW}px`;
        sq.style.height = `${squareH}px`;
      });
    }, 120);
  });
}

// ----------------- Init -----------------
document.addEventListener("DOMContentLoaded", () => {
  createGrid(DEFAULT_SIZE);
  attachListeners();
});
