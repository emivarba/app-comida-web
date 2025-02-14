import PropTypes from "prop-types";

interface SudokuCellProps {
    cellValue: string,
    cellRow: number,
    cellColumn: number,
    fillable:  boolean,
    onCellUpdate: (row: number, col: number, value: string) => void
}

function SudokuCell({cellValue, cellRow, cellColumn, fillable, onCellUpdate}: SudokuCellProps) {
    const formatedValue = isNaN(Number(cellValue)) ? "" : cellValue;
    let cellElement;

    function drop(event: React.DragEvent) {
        event.preventDefault()
        removeDragClass(event)
        onCellUpdate(cellRow, cellColumn, event.dataTransfer.getData("text"))
    }

    function allowDrop(event: React.DragEvent) {
        event.preventDefault();
        event.currentTarget.classList.add('drop-zone');
    }

    function removeDragClass(event: React.DragEvent) {
        event.currentTarget.classList.remove('drop-zone');
    }

    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault();
        
        const number = localStorage.getItem("touchedItem") || "0";
        onCellUpdate(cellRow, cellColumn, number);
        localStorage.removeItem("touchedItem");
      };

    if(fillable){
        cellElement = (
            <div className="sudoku--cell" onDrop={drop} onTouchEnd={handleTouchEnd} onDragOver={allowDrop} onDragLeave={removeDragClass}>
                {formatedValue}
            </div>
        )
    }else{
        cellElement = (
            <div className="sudoku--cell disabled-cell">
                <strong>{formatedValue}</strong>
            </div>
        )
    }

    return cellElement
}

SudokuCell.propTypes = {
    cellValue: PropTypes.string.isRequired,
    cellRow: PropTypes.number.isRequired,
    cellColumn: PropTypes.number.isRequired,
    fillable: PropTypes.bool.isRequired,
    onCellUpdate: PropTypes.func.isRequired,
}

export default SudokuCell;