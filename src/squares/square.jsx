import React from "react";
import  './square.css'

export default function Square({colorTone,width,height}){
    const color = colorTone==="dark"?'#B58863':'#F0D9B6';
    const styles = {
        backgroundColor: color,
        width: width,
        height: height,
    };
    return (
     <div className="square"
       style ={styles} >
     </div>    
    );
};
