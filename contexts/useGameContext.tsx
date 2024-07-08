"use client";

import React, { useState, createContext, Dispatch, SetStateAction } from "react";

import { PieceType, Player, initialBoard } from "@/enums/Pieces";

interface Piece {
    type: PieceType;
    player: Player;
}

interface Coord {
    row: number | null;
    col: number | null;
}


interface GameContextProps {
    board: (Piece | null)[][];
    setBoard: Dispatch<SetStateAction<(Piece | null)[][]>>;
    possibleMoves: Coord | Coord[] | [];
    setPossibleMoves: Dispatch<SetStateAction<Coord | Coord[]>>;
    currentPiecePos: Coord;
    setCurrentPiecePos: Dispatch<SetStateAction<Coord>>;

}

const GameContext = createContext<GameContextProps>({
    board: initialBoard,
    setBoard: () => {},
    possibleMoves: [],
    setPossibleMoves: () => {},
    currentPiecePos: { row: null, col: null },
    setCurrentPiecePos: () => {}
});


interface GameProviderProps {
    children?: React.JSX.Element | React.JSX.Element[];
}

const GameProvider = ({ children } : GameProviderProps) => {

    const [board, setBoard] = useState(initialBoard);
    const [currentPiecePos, setCurrentPiecePos] = useState<Coord>({row: null, col: null})
    const [possibleMoves, setPossibleMoves] = useState<Coord | Coord[]>({row: null, col: null});

    return (
        <GameContext.Provider value={{ board, setBoard, possibleMoves, setPossibleMoves, currentPiecePos, setCurrentPiecePos }}>
            {children}
        </GameContext.Provider>
    )
};

export { GameContext, GameProvider };