import Emoji from "./Emoji";
import React from "react";

const SmileyHint = ({text, img, onClick}) => {
    return (
        <div className="smiley-hint" onClick={() => onClick(text)}>
            <Emoji word={text}/>
        </div>
    )
}

const SmileyHintList = ({matching, onClick}) => {
    return (
        <div className="smiley-hint-list">
            {matching.map(smiley => (
                (<SmileyHint key={smiley.key} text={smiley.key} img={smiley.img} onClick={onClick}/>)
            ))}
        </div>
    )
}
export default SmileyHintList;