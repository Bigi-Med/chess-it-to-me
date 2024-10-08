import React, { useState } from "react";
import "./App.css";
import Square from "./squares/square.jsx";
import { getEval } from "./stockfish/api.js";
import Cell from "./stockfish/Bar/cell";
import { getStockFish } from "./stockfish/api.js";
import PgnInput from "./input/PgnInput";
var index = 0;

export default function App() {
    const [heightW, setHeightW] = useState(250);
    const [heightB, setHeightB] = useState(250);
    const [valueW, setValueW] = useState("0.0");
    const [valueB, setValueB] = useState("");
    const [whiteRook, setWhiteRook] = useState([
        [0,7],
        [7,7]
    ]);
    const [whitePawns,setWhitePawn] = useState(Array.from({ length: 8 }, (_, i) => [i, 6]));
    const [blackPawns,setBlackPawn] = useState(Array.from({ length: 8 }, (_, i) => [i, 1]));
    const [blackRook, setblackRook ] = useState( [
        [0, 0],
        [7, 0],
    ]);
    const [blackBishop, setblackBishop ] = useState( [
        [1, 0],
        [6, 0],
    ]);
    const [whiteBishop, setwhiteBishop ] = useState( [
        [1, 7],
        [6, 7],
    ]);
    const [whiteKnight, setwhiteKnight ] = useState( [
        [5, 7],
        [2, 7],
    ]);
    const [blackKnight, setblackKnight ] = useState( [
        [2, 0],
        [5, 0],
    ]);
    const [blackKing , setblackKing] = useState([4, 0]);
    const [whiteKing, setwhiteKing] = useState([4, 7]);
    const [blackQueen , setblackQueen] = useState([3, 0]);
    const [whiteQueen , setwhiteQueen] = useState([3, 7]);

    const createBoard = () => {
        const rows = 8;
        const clmn = 8;
        let toggle = true; //if true, dark tone will be applied to even x, if not then to uneven x
        let tone = "";
        let boardRows = [];
        const boardClmn = [];

        for (let clm = 0; clm < clmn; clm++) {
            for (let rw = 0; rw < rows; rw++) {
                let pieceType = "";
                let isPiece = false;
                if (toggle) {
                    tone = rw % 2 === 0 ? "light" : "dark";
                } else {
                    tone = rw % 2 === 0 ? "dark" : "light";
                }
                if (
                    JSON.stringify(whitePawns).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "whitePawn";
                    isPiece = true;
                }

                if (
                    JSON.stringify(blackPawns).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "blackPawn";
                    isPiece = true;
                }

                if (
                    JSON.stringify(blackRook).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "blackRook";
                    isPiece = true;
                }

                if (
                    JSON.stringify(whiteRook).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "whiteRook";
                    isPiece = true;
                }
                if (
                    JSON.stringify(whiteBishop).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "whiteBishop";
                    isPiece = true;
                }
                if (
                    JSON.stringify(blackBishop).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "blackBishop";
                    isPiece = true;
                }

                if (
                    JSON.stringify(blackKnight).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "blackKnight";
                    isPiece = true;
                }
                if (
                    JSON.stringify(whiteKnight).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "whiteKnight";
                    isPiece = true;
                }

                if (
                    JSON.stringify(whiteKing).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "whiteKing";
                    isPiece = true;
                }
                if (
                    JSON.stringify(blackKing).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "blackKing";
                    isPiece = true;
                }
                if (
                    JSON.stringify(blackQueen).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "blackQueen";
                    isPiece = true;
                }
                if (
                    JSON.stringify(whiteQueen).includes(
                        JSON.stringify([clm, rw])
                    )
                ) {
                    pieceType = "whiteQueen";
                    isPiece = true;
                }
                boardRows.push(
                    <Square
                        colorTone={tone}
                        width={"50px"}
                        height={"50px"}
                        pieceType={pieceType}
                        isPiece={isPiece}
                    />
                );
            }
            toggle = !toggle;
            boardClmn.push(<div>{boardRows}</div>);
            boardRows = [];
        }

        return boardClmn;
    };

    const changeRook = () => {
        setWhiteRook([
            [0,5],
            [7,7]
        ])
    };
    const generateEvalBar = () => {
        var stockyBoi = getStockFish();
        const stockyLenght = stockyBoi.length;
        if (index === stockyLenght - 1) {
            return;
        }
        if (stockyBoi[index].evaluation > 0) {
            setHeightW(computeEvale(stockyBoi[index].evaluation));
            setHeightB(400 - computeEvale(stockyBoi[index].evaluation));
            setValueW(stockyBoi[index].evaluation);
            setValueB("");
        }
        if (stockyBoi[index].evaluation < 0) {
            setHeightB(computeEvale(stockyBoi[index].evaluation));
            setHeightW(400 - computeEvale(stockyBoi[index].evaluation));
            setValueB(stockyBoi[index].evaluation);
            setValueW("");
        }
        if (stockyBoi[index].evaluation === null) {
            if (stockyBoi[index].mate > 0) {
                setHeightB(5);
                setHeightW(395);
                setValueW(`M${stockyBoi[index].mate}`);
                setValueB("");
            }
            if (stockyBoi[index].mate < 0) {
                setHeightW(5);
                setHeightB(395);
                setValueB(`M${stockyBoi[index].mate}`);
                setValueW("");
            }
        }
        index++;
    };
    const computeEvale = (myEval) => {
        const absEval = Math.abs(myEval) * 20;
        if (absEval > 400) {
            return 390;
        }
        return 200 + Math.abs(myEval) * 20;
    };
    return (
        <div className="global">
            <div className="page">
                <div className="boardEvalBar">
                    <div className="board">{createBoard()}</div>
                    <div className="evalBar">
                        <Cell
                            color={"black"}
                            height={`${heightB}px`}
                            value={valueB}
                        />
                        <Cell
                            color={"white"}
                            height={`${heightW}px`}
                            value={valueW}
                        />
                    </div>
                </div>
                <div className="import">
                    <PgnInput></PgnInput>
                    <div>
                        <button onClick={getEval} />
                        get Eval Stock
                    </div>
                    <div>
                        <button onClick={generateEvalBar} />
                        Change Bar
                    </div>
                    <div>
                        <button onClick={changeRook} />
                        Change Rook
                    </div>
                </div>
            </div>
        </div>
    );
}
