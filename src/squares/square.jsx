import React from "react";
import  './square.css'
import whitePawn from '../ressources/media/media/white_pawn.svg';
import blackPawn from '../ressources/media/media/black_pawn.svg';
import whiteRook from '../ressources/media/media/white_rook.svg';
import blackRook from '../ressources/media/media/black_rook.svg';
import whiteBishop from '../ressources/media/media/white_bishop.svg';
import blackBishop from '../ressources/media/media/black_bishop.svg';
import blackKnight from '../ressources/media/media/black_knight.svg';
import whiteKnight from '../ressources/media/media/white_knight.svg';
import whiteKing from '../ressources/media/media/white_king.svg';
import blackKing from '../ressources/media/media/black_king.svg';
import blackQueen from '../ressources/media/media/black_queen.svg';
import whiteQueen from '../ressources/media/media/white_queen.svg';

export default function Square({colorTone,width,height,isPiece,pieceType,pieceColor}){
    const color = colorTone==="dark"?'#B58863':'#F0D9B6';
    const styles = {
        backgroundColor: color,
        width: width,
        height: height,
    };

    const getPiece = (pieceType) => {
           
        switch (pieceType) {

            case 'whitePawn':
                return <img src={whitePawn}/>

            case 'blackPawn':
                return <img src={blackPawn}/>

            case 'whiteRook':
                return <img src={whiteRook}/>

            case 'blackRook':
                return <img src={blackRook}/>

            case 'whiteBishop':
                return <img src={whiteBishop}/>

            case 'blackBishop':
                return <img src={blackBishop}/>

            case 'whiteKnight':
                return <img src={whiteKnight}/>

            case 'blackKnight':
                return <img src={blackKnight}/>

            case 'blackQueen':
                return <img src={blackQueen}/>

            case 'whiteQueen':
                return <img src={whiteQueen}/>

            case 'blackKing':
                return <img src={blackKing}/>

            case 'whiteKing':
                return <img src={whiteKing}/>
        }
    };

    return (
     <div className="square"
       style ={styles} >
       {getPiece(pieceType)}
     </div>    
    );
};
