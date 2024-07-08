import { UseGame } from "@/hooks/useGame";
import { useEffect, useRef, useState } from "react";
import { calcPossibleMoves } from "@/functions/calcPossibleMoves";

interface SquareProps {
    row: number;
    col: number;  
    children?: React.JSX.Element;
}


const Square = ({ row, col, children } : SquareProps) => {
    const squarePieceRef = useRef<HTMLDivElement>(null)
    const { board, setBoard, possibleMoves ,setPossibleMoves, setCurrentPiecePos, currentPiecePos } = UseGame();
    const [isPossibleMove, setIsPossibleMove] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const player = "White";

    useEffect(() => {
        setIsPossibleMove(false);
        setIsSelected(false);
    }, [possibleMoves]);
    
    useEffect(() => {
        const handleClick = () => {
            if (children?.props.player === player) {             
                const newPossibleMoves = calcPossibleMoves(board, row, col);
                
                if (JSON.stringify(possibleMoves) !== JSON.stringify(newPossibleMoves)) {
                    setPossibleMoves(newPossibleMoves);        
                    setCurrentPiecePos({ row: row, col: col });
                } else {
                    setPossibleMoves([]); 
                    setCurrentPiecePos({ row: null, col: null });              
                }

                const timeout = setTimeout(() => setIsSelected(!isSelected), 1);
                return () => clearTimeout(timeout);

            } else if (isPossibleMove) {
                const newBoard = [...board];

                if (currentPiecePos.row !== null && currentPiecePos.col !== null) {
                    newBoard[row][col] = board[currentPiecePos.row][currentPiecePos.col];
                    newBoard[currentPiecePos.row][currentPiecePos.col] = null;
                }

                setBoard(newBoard);
                setPossibleMoves([]);
                setCurrentPiecePos({ row: null, col: null });

            }
        };

        const currentSquarePieceRef = squarePieceRef.current;

        if (currentSquarePieceRef) {
            currentSquarePieceRef.addEventListener("click", handleClick);
            return () => currentSquarePieceRef.removeEventListener("click", handleClick);
        }
        
    },  [
            board, setBoard,
            row, col, 
            currentPiecePos.col, currentPiecePos.row, setCurrentPiecePos,
            possibleMoves, isPossibleMove, setPossibleMoves, 
            isSelected, children
        ]
    )
   
    useEffect(() => {
        if (Array.isArray(possibleMoves)) {
            possibleMoves.map(coord => {
                if (coord.row === row && coord.col === col) {
                    setIsPossibleMove(true);
                    return;
                }
            })       
        }
    }, [row, col, possibleMoves]);

    
    return (
        <div  
            className="relative flex items-center justify-center w-[12.5%] h-[12.5%] border-none" 
            style={{
                backgroundColor: (row + col) % 2 === 0 ? "#E9D0A5" : "#B88156",
            }}>
            <div 
                ref={squarePieceRef}
                className="absolute w-4/5 h-4/5"
                style={{
                    border: isPossibleMove ? "2px solid green" : isSelected ? "2px solid yellow" : "none",
                    cursor: children || isPossibleMove ? "pointer" : "auto"
                }}>            
            </div>
            {children}
        </div>
    )
};

export { Square };