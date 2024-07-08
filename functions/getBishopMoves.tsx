import { PieceType, Player } from "@/enums/Pieces";

interface Piece {
    type: PieceType;
    player: Player;
}


const getBishopMoves = (board: (Piece | null)[][], row: number, col: number): { row: number, col: number }[] => {
    const moves: { row: number, col: number }[] = [];
    const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        while (x >= 0 && x < 8 && y >= 0 && y < 8 && !board[x][y]) {
            moves.push({ row: x, col: y });
            x += dx;
            y += dy;
        }
        if (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y]?.player !== board[row][col]?.player) {
            moves.push({ row: x, col: y });
        }
    }
    return moves;
};

export { getBishopMoves };