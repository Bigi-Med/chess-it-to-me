import React from "react"
import './App.css'
import Square from './squares/square.jsx'

export default function App() {
    const createBoard = () => {
        const rows = 8
        const clmn = 8;
        let toggle = true; //if true, dark tone will be applied to even x, if not then to uneven x
        let tone = '';
        let  boardRows = [];
        const boardClmn = [];

        for(let clm  = 0; clm <clmn; clm++){

            for(let rw = 0 ; rw <rows; rw++){
                if(toggle){
                    tone = rw%2===0 ?'light':'dark'
                }
                else {
                    tone = rw%2===0?'dark':'light'
                }
                boardRows.push(
                    <Square colorTone={tone} width={'50px'} height={'50px'}/>
                )
            };
                toggle = !toggle
            boardClmn.push(<div>{boardRows}</div>);
            boardRows = [];
        }
        console.log(boardClmn.length)
        
        return boardClmn;
    };
    return (
        <div className='page'>
        {createBoard()}
        </div>
    );
}

