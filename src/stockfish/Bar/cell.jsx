import React from "react";
import './cell.css'

export default function Cell({ color, height, value }) {
    const styles = {
        backgroundColor: color,
        width: 40,
        height: height,
    };
    return (
        <div style={styles} className="cell">
        {value}
        </div>
    );
}
