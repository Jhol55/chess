import { PieceType, Player } from "@/enums/Pieces";

interface Piece {
    type: PieceType;
    player: Player;
}


const getPawnMoves = (board: (Piece | null)[][], row: number, col: number): { row: number, col: number }[] => {
    const moves: { row: number, col: number }[] = [];
    const player = board[row][col]?.player;

    // Movimentos para frente
    if (player === Player.White) {
        if (row > 0 && !board[row - 1][col]) {
            moves.push({ row: row - 1, col });
            if (row === 6 && !board[row - 2][col]) {
                moves.push({ row: row - 2, col });
            }
        }
    } else if (player === Player.Black) {
        if (row < 7 && !board[row + 1][col]) {
            moves.push({ row: row + 1, col });
            if (row === 1 && !board[row + 2][col]) {
                moves.push({ row: row + 2, col });
            }
        }
    }

    // Capturas diagonais
    const captureMoves = [
        { row: row - 1, col: col - 1 },
        { row: row - 1, col: col + 1 },
        { row: row + 1, col: col - 1 },
        { row: row + 1, col: col + 1 }
    ];

    for (const move of captureMoves) {
        const { row: r, col: c } = move;
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c]?.player !== player && board[r][c]) {
            moves.push({ row: r, col: c });
        }
    }

    return moves;
};

export { getPawnMoves };