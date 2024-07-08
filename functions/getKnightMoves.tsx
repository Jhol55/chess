import { PieceType, Player } from "@/enums/Pieces";

interface Piece {
    type: PieceType;
    player: Player;
}

const getKnightMoves = (board: (Piece | null)[][], row: number, col: number): { row: number, col: number }[] => {
    const moves: { row: number, col: number }[] = [];
    const knightMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    for (const [dx, dy] of knightMoves) {
        const x = row + dx;
        const y = col + dy;
        if (x >= 0 && x < 8 && y >= 0 && y < 8 && (!board[x][y] || board[x][y]?.player !== board[row][col]?.player)) {
            moves.push({ row: x, col: y });
        }
    }
    return moves;
};


export { getKnightMoves };