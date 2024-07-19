import { Chess } from "chess.js";
const ENDPOINT = "https://stockfish.online/api/s/v2.php?";
const REGEX = /\s[0-9]+\.\s|[0-9]+\.\s/;
const REGEX_INT = /\s/;

var stockFishEval = [];
export async function getEval() {
    console.log("contactin stockfis");
    var _stockFishEval = []
    var moves = [];
    var pgn =
        "1. e4 Nf6 2. d3 e5 3. f3 d5 4. Nc3 Bc5 5. Nh3 Nh5 6. Be2 Qh4+ 7. Kf1 Bxh3 8. gxh3 Qf2# 0-1";
    const splitPgnTmp = pgn.split(REGEX).filter((n) => n != "");
    splitPgnTmp.forEach((dmv) => {
        const dmvTmp = dmv.split(REGEX_INT);
        moves.push(dmvTmp[0]);
        moves.push(dmvTmp[1]);
    });
    var fenList = [];
    var chess = new Chess();
    for (let i = 0; i < moves.length; i++) {
        chess.move(moves[i]);
        fenList.push(chess.fen());
    }

    for (let i = 0; i < fenList.length; i++) {
        const response = await fetch(ENDPOINT + `fen=${fenList[i]}&depth=15`);
        var jasonation;
        try {
            jasonation = await response.json();
        } catch (error) {
            console.log(error);
        }
        _stockFishEval.push(jasonation);
    }
    stockFishEval = _stockFishEval
    console.log(fenList);
    console.log(stockFishEval);
}

export function getStockFish() {
    return stockFishEval;
}
