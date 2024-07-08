import { GameProvider } from "@/contexts/useGameContext";

interface GameProps {
    children: React.JSX.Element | React.JSX.Element[]
}


const Game = ({ children } : GameProps ) => {
    return (  
        <GameProvider>
            <div className="flex h-screen">
                {children}
            </div>
        </GameProvider>     
    )
};

export { Game };