import { PieceType, Player } from "@/enums/Pieces";

interface Piece {
    type: PieceType;
    player: Player;
}


const getKingMoves = (board: (Piece | null)[][], row: number, col: number): { row: number, col: number }[] => {
    const moves: { row: number, col: number }[] = [];
    const kingMoves = [
        [1, 0], [1, 1], [0, 1], [-1, 1],
        [-1, 0], [-1, -1], [0, -1], [1, -1]
    ];

    for (const [dx, dy] of kingMoves) {
        const x = row + dx;
        const y = col + dy;
        if (x >= 0 && x < 8 && y >= 0 && y < 8 && (!board[x][y] || board[x][y]?.player !== board[row][col]?.player)) {
            moves.push({ row: x, col: y });
        }
    }
    return moves;
};

export { getKingMoves };