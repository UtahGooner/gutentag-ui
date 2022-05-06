import React from "react";
import EmojiImage from "./EmojiImage";
import {Emoji} from "../emoji";

interface SmileyHint {
    emoji:Emoji,
    onClick: (key:string) => void,
}
const SmileyHint:React.FC<SmileyHint> = ({emoji, onClick}) => {
    return (
        <div className="smiley-hint" onClick={() => onClick(emoji.key)}>
            <EmojiImage name={emoji.key}/>
        </div>
    )
}

interface SmileyHintList {
    matching: Emoji[],
    onClick: (key:string) => void,
}
const SmileyHintList:React.FC<SmileyHintList> = ({matching, onClick}) => {
    return (
        <div className="smiley-hint-list">
            {matching.map(emoji => (
                (<SmileyHint key={emoji.key} emoji={emoji} onClick={onClick}/>)
            ))}
        </div>
    )
}
export default SmileyHintList;
