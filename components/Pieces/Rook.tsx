

import { Player } from "@/enums/Pieces";

const Rook = ({ player } : { player: Player }) => {
    switch(player) {
        case Player.Black:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="45" height="45">
                    <g fillRule="evenodd" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path strokeLinecap="butt" d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z" transform="translate(0 .3)"/>
                        <path strokeLinecap="butt" strokeLinejoin="miter" d="M14 29.5v-13h17v13H14z" transform="translate(0 .3)"/>
                        <path strokeLinecap="butt" d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" transform="translate(0 .3)"/>
                        <path fill="none" stroke="#fff" strokeLinejoin="miter" strokeWidth="1" d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23" transform="translate(0 .3)"/>
                    </g>
                </svg>     
            )
        case Player.White:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="45" height="45">
                    <g fill="#fff" fillRule="evenodd" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path strokeLinecap="butt" d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" transform="translate(0 .3)"/>
                        <path d="M34 14l-3 3H14l-3-3" transform="translate(0 .3)"/>
                        <path strokeLinecap="butt" strokeLinejoin="miter" d="M31 17v12.5H14V17" transform="translate(0 .3)"/>
                        <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" transform="translate(0 .3)"/>
                        <path fill="none" strokeLinejoin="miter" d="M11 14h23" transform="translate(0 .3)"/>
                    </g>
                </svg>
            )
    }
}

export { Rook };
