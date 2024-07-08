import { PieceType, Player } from "@/enums/Pieces";
import { getBishopMoves } from "./getBishopMoves";
import { getKingMoves } from "./getKingMoves";
import { getQueenMoves } from "./getQueenMoves";
import { getKnightMoves } from "./getKnightMoves";
import { getRookMoves } from "./getRookMoves";
import { getPawnMoves } from "./getPawnMoves";

interface Piece {
    type: PieceType;
    player: Player;
}


const calcPossibleMoves = (board: (Piece | null)[][], row: number, col: number): { row: number, col: number }[] => {
    const piece = board[row][col];
    if (!piece) return [];

    switch (piece.type) {
        case PieceType.King:
            return getKingMoves(board, row, col);
        case PieceType.Queen:
            return getQueenMoves(board, row, col);
        case PieceType.Bishop:
            return getBishopMoves(board, row, col);
        case PieceType.Knight:
            return getKnightMoves(board, row, col);
        case PieceType.Rook:
            return getRookMoves(board, row, col);
        case PieceType.Pawn:
            return getPawnMoves(board, row, col);
        default:
            return [];
    }
};

export { calcPossibleMoves };