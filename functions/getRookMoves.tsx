import { PieceType, Player } from "@/enums/Pieces";

interface Piece {
    type: PieceType;
    player: Player;
}


const getRookMoves = (board: (Piece | null)[][], row: number, col: number): { row: number, col: number }[] => {
    const moves: { row: number, col: number }[] = [];
    const rookMoves = [
        [-1, 0], [1, 0], [0, -1], [0, 1] // cima, baixo, esquerda, direita
    ];

    for (const [dx, dy] of rookMoves) {
        let x = row + dx;
        let y = col + dy;
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (!board[x][y] || board[x][y]?.player !== board[row][col]?.player) {
                moves.push({ row: x, col: y });
                if (board[x][y]) break; // Parar se encontrar uma peça (amiga ou adversária)
            } else {
                break; // Parar se encontrar uma peça amiga
            }
            x += dx;
            y += dy;
        }
    }

    return moves;
};


export { getRookMoves };