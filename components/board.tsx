"use client";

import { Square } from "./square";
import { getPiece } from "@/functions/getPiece";

const Board = () => {
    return (
        <div className="flex flex-wrap w-[600px] h-[600px] m-auto border-2 border-gray-600">
            <div className="flex flex-wrap w-[500px] h-[500px] m-auto">
                {Array.from({ length: 8 }, (_, row) => Array.from({ length: 8 }, (_, col) => {
            
                    return (
                        <Square key={`${row}-${col}`} row={row} col={col}>
                            {getPiece(row, col)}
                        </Square>
                    )
                }))}
            </div>
        </div>
    )
};

export { Board };