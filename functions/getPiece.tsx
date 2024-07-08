
import { PieceType, Player } from "@/enums/Pieces";
import { King } from "@/components/Pieces/King";
import { Queen } from "@/components/Pieces/Queen";
import { Rook } from "@/components/Pieces/Rook";
import { Bishop } from "@/components/Pieces/Bishop";
import { Knight } from "@/components/Pieces/Knight";
import { Pawn } from "@/components/Pieces/Pawn";
import { UseGame } from "@/hooks/useGame";


interface Piece {
    type: PieceType;
    player: Player;
}


const getPiece = (row: number, col: number) => {

    const { board } = UseGame();
    const piece: (Piece | null) = board[row][col];

    switch(piece?.type) {
        case PieceType.King:
            return <King player={piece.player}/>
        case PieceType.Queen:
            return <Queen player={piece.player}/> 
        case PieceType.Rook:
            return <Rook player={piece.player}/> 
        case PieceType.Bishop:
            return <Bishop player={piece.player}/> 
        case PieceType.Knight:
            return <Knight player={piece.player}/>  
        case PieceType.Pawn:
            return <Pawn player={piece.player}/>   
    }
};

export { getPiece };