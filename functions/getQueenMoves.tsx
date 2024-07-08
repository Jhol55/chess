import { PieceType, Player } from "@/enums/Pieces";

interface Piece {
    type: PieceType;
    player: Player;
}

const getQueenMoves = (board: (Piece | null)[][], row: number, col: number): { row: number, col: number }[] => {
    const moves: { row: number, col: number }[] = [];
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], 
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;

        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (board[x][y]) {
                if (board[x][y]?.player !== board[row][col]?.player) {
                    moves.push({ row: x, col: y }); // Pode capturar a peça adversária
                }
                break; // Para quando encontra uma peça (amiga ou adversária)
            }

            moves.push({ row: x, col: y });
            x += dx;
            y += dy;
        }
    }

    return moves;
};

export { getQueenMoves };
