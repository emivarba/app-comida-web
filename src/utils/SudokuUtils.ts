export function getBoardByPuzzle(puzzle: string) {
    const board: string[][] = []
    const splittedPuzzle = puzzle.split('');

    for(let i=0; i < splittedPuzzle.length; i+=9) {
        board.push(splittedPuzzle.slice(i, i+9))
    }

    return board;
}

export function getPuzzleByBoard(board: string[][]) {
    let puzzle = '';
    
    for (const row of board) {
        puzzle += row.join('');
    }

    return puzzle;
}

export function isFillableCell(puzzle: string, cellIndex: number): boolean{
    return (puzzle.length > cellIndex) && (puzzle[cellIndex] === "-")
}