import React, { useRef } from "react";
import { incrementalMove ,incrementalEval } from "../stockfish/api";

export default  function PgnInput() {
    const moveValue = useRef(null);
    const submitMove = async (event) => {
        event.preventDefault();
        console.log(moveValue.current.value);
        const fen = incrementalMove(moveValue.current.value);
        const evaluation =  await incrementalEval(fen)
        console.log("Fen is : " + fen)
        console.log(evaluation)
    };
    return (
        <form onSubmit={submitMove}>
            <input type="text" placeholder="Enter PGN key" ref={moveValue} />
            <button type="submit">Submit</button>
        </form>
    );
}
