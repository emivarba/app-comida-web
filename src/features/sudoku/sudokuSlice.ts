import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { getSudoku } from "sudoku-gen";
import { getBoardByPuzzle } from "../../utils/SudokuUtils";

interface SudokuState {
    board: string[][],
    puzzle: string,
    solution: string,
}

const initialPuzzle = getSudoku('easy');

const initialState: SudokuState = {
    puzzle: initialPuzzle.puzzle,
    board: getBoardByPuzzle(initialPuzzle.puzzle),
    solution: initialPuzzle.solution,
};

export const sudokuSlice = createSlice({
    name: 'sudoku',
    initialState,
    reducers: {
        updateCell: (state, action: PayloadAction<{ row: number; col: number; value: string}>) => {
            const { row, col, value } = action.payload;

            state.board[row][col] = value;
        },
        resetSudoku(state, action: PayloadAction<string>) {
            state.puzzle = action.payload;
            state.board = getBoardByPuzzle(action.payload);
          },
    }
})

export const {updateCell, resetSudoku} = sudokuSlice.actions;

export default sudokuSlice.reducer;