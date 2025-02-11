import { getPuzzleByBoard, isFillableCell } from "../utils/SudokuUtils";
import "../styles/Sudoku/SudokuView.scss"
import SudokuCell from "../components/Sudoku/SudokuCell";
import { useAppSelector } from "../utils/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { updateCell } from "../features/sudoku/sudokuSlice";

function SudokuView() {
    const dispatch = useDispatch<AppDispatch>()
    const { board, puzzle, solution } = useAppSelector((state) => state.sudoku);

    function dragStart(event: React.DragEvent): void {
        const number : string = event.currentTarget.textContent || "0"
        event.dataTransfer.setData("text", number);
    }

    function handleCellUpdate(row: number, col: number, value: string) {
        dispatch(updateCell({row, col, value}))
    };

    function solveSudoku(){
        if(getPuzzleByBoard(board) === solution){
            console.log("Bieeen")
        }else{
            console.log('Vuelve a intentarlo')
        }
        
    }

    function naturalNumbers() {
        return (
          <div className="sudoku--numbers">
            {Array.from({ length: 9 }, (_, i) => (
                <div
                    key={i}
                    className="number-options" 
                    draggable={true} 
                    onDragStart={dragStart} 
                >
                    {i + 1}
                </div>
            ))}
          </div>
        );
      }

    return (
        <div className="container">
            <div className="sudoku-title">
                <h1>SUDOKU</h1>
                <button className="primary-button" onClick={solveSudoku}>Resolver</button>
            </div>
            <div className="sudoku-board" >
                {
                    board.map((row, rowIndex) => (
                        row.map((cell, cellIndex) => (
                            <SudokuCell
                                key={(rowIndex * 9) +  cellIndex}
                                cellValue={cell}
                                cellRow={rowIndex}
                                cellColumn={cellIndex}
                                fillable={isFillableCell(puzzle, (rowIndex * 9) +  cellIndex)}
                                onCellUpdate={handleCellUpdate}
                            ></SudokuCell>
                        ))
                    ))
                }
            </div>
            {naturalNumbers()}
        </div>
    );
}

export default SudokuView;