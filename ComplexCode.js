// Filename: ComplexCode.js

/*
This code is a complex implementation of a Sudoku solver using the backtracking algorithm.
The Sudoku grid is represented by a 2D array and the code uses recursion with backtracking
to solve the puzzle. The algorithm attempts to place a valid number in an empty cell, and 
if it reaches to an invalid placement, it backtracks to the previous cell and tries a different number.

Note: This code assumes that the Sudoku grid is a valid 9x9 grid.
*/

const GRID_SIZE = 9;

function solveSudoku(grid) {
  const row = findEmptyCell(grid);
  if (row === -1) {
    // All cells have been filled, Sudoku solved!
    return true;
  }

  for (let num = 1; num <= GRID_SIZE; num++) {
    if (isValidPlacement(grid, row, num)) {
      grid[row][col] = num;

      if (solveSudoku(grid)) {
        return true;
      }

      grid[row][col] = 0; // Unset the number and try a different one
    }
  }

  return false; // Trigger backtracking
}

function findEmptyCell(grid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) {
        return row; // Return the first empty cell row index
      }
    }
  }

  return -1; // No empty cells found
}

function isValidPlacement(grid, row, num) {
  // Check if number already exists in the row
  for (let col = 0; col < GRID_SIZE; col++) {
    if (grid[row][col] === num) {
      return false;
    }
  }

  // Check if number already exists in the column
  for (let r = 0; r < GRID_SIZE; r++) {
    if (grid[r][col] === num) {
      return false;
    }
  }

  // Check if number already exists in the 3x3 sub-grid
  const subGridStartRow = Math.floor(row / 3) * 3;
  const subGridStartCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[subGridStartRow + r][subGridStartCol + c] === num) {
        return false;
      }
    }
  }

  return true; // Number can be placed
}

// Test grid
const sudokuGrid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

console.log("Sudoku Grid (Before Solving):");
displayGrid(sudokuGrid);

if (solveSudoku(sudokuGrid)) {
  console.log("\nSudoku Grid (After Solving):");
  displayGrid(sudokuGrid);
} else {
  console.log("\nNo solution found for the given Sudoku grid.");
}

function displayGrid(grid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    let line = "";
    for (let col = 0; col < GRID_SIZE; col++) {
      line += grid[row][col] + " ";
    }
    console.log(line);
  }
}