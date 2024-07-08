

enum PieceType {
    King = "King",
    Queen = "Queen",
    Bishop = "Bishop",
    Knight = "Knight",
    Rook = "Rook",
    Pawn = "Pawn"
}

enum Player {
    White = "White",
    Black = "Black"
}

interface Piece {
    type: PieceType;
    player: Player;
}

const initialBoard: (Piece | null)[][] = [
    [
        { type: PieceType.Rook, player: Player.Black },
        { type: PieceType.Knight, player: Player.Black },
        { type: PieceType.Bishop, player: Player.Black },
        { type: PieceType.Queen, player: Player.Black },
        { type: PieceType.King, player: Player.Black },
        { type: PieceType.Bishop, player: Player.Black },
        { type: PieceType.Knight, player: Player.Black },
        { type: PieceType.Rook, player: Player.Black }
    ],
    Array(8).fill({ type: PieceType.Pawn, player: Player.Black }),

    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),

    Array(8).fill({ type: PieceType.Pawn, player: Player.White }),
    [
        { type: PieceType.Rook, player: Player.White },
        { type: PieceType.Knight, player: Player.White },
        { type: PieceType.Bishop, player: Player.White },
        { type: PieceType.Queen, player: Player.White },
        { type: PieceType.King, player: Player.White },
        { type: PieceType.Bishop, player: Player.White },
        { type: PieceType.Knight, player: Player.White },
        { type: PieceType.Rook, player: Player.White }
    ]
];

export { PieceType, Player, initialBoard }