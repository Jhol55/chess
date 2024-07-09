



const Card = ({ children } : { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col justify-center w-[90%] h-[90%] max-w-[500px] p-4 space-y-4 rounded shadow-lg bg-white">
            {children}
        </div>
    )
};

export { Card };