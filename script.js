const container = document.getElementById('grid-container');
const colorPicker = document.getElementById('colorPicker');
const btn = document.querySelectorAll('button');
let lastGridSize = 16;
let currentMode = 'black';
let customColor = '#ff0000';

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;
}

function colorCell(cell) {
  switch (currentMode) {
    case 'black':
      cell.style.backgroundColor = 'black';
      break;
    case 'rainbow':
      cell.style.backgroundColor = getRandomColor();
      break;
    case 'white':
      cell.style.backgroundColor = 'white';
      break;
    case 'custom':
      cell.style.backgroundColor = customColor;
      break;
  }    
}
function makeGrid(size) {
  lastGridSize = size;
  container.innerHTML = '';

  for (let row = 0; row < size; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('grid-row');

    for (let col = 0; col < size; col++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-item');

      cell.addEventListener('mouseenter', () => {
        colorCell(cell);
      });

      rowDiv.appendChild(cell);
    }

    container.appendChild(rowDiv);
  }
}

// Prompt user for grid size
function getNumberBetween1And100() {
  let userInput;
  while (true) {
    userInput = prompt("Enter a number between 1 and 100 (Cancel for default 16):");
    if (userInput === null) {
      const confirmCancel = confirm("Are you sure you want to cancel?");
      if (confirmCancel) return null;
      else continue;
    } else if (userInput.trim() === "") {
      alert("Please enter something.");
      continue;
    }

    const number = Number(userInput);
    if (!isNaN(number) && number >= 1 && number <= 100) {
      return number;
    } else {
      alert("Invalid input. Enter a number between 1 and 100.");
    }
  }
}
    
btn.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener('click', () => {
    const id = button.id;
    switch (id) {
      case 'generate-btn':
        const result = getNumberBetween1And100();
        const gridSize = result !== null ? result : 16;
        makeGrid(gridSize);
        break;
    
      case 'black':
        currentMode = 'black';
        break;
      
      case 'multiColor':
        currentMode = 'rainbow';
        break;
      
      case 'erase':
        currentMode = 'white';
        break;
      
      case 'customColorBtn':
        currentMode = 'custom';
        customColor = colorPicker.value;
        break;
      
      case 'clearGrid':
        const allCells = document.querySelectorAll('.grid-item');
        allCells.forEach(cell => cell.style.backgroundColor = '');
        break;  
    }
  });
});

colorPicker.addEventListener('input', () => {
  customColor = colorPicker.value;
});

window.addEventListener('resize', () => {
  makeGrid(lastGridSize);
});
  
// Initial grid
makeGrid(lastGridSize);  