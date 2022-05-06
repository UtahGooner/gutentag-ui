import React from 'react';
import nodeEmoji from 'node-emoji';
import {emojiList} from '../emoji';
import EmojiImage from "./EmojiImage";

// copied from 'node-emoji', emojify with modifications for react rendering
const emojiNameRegex = /:([a-zA-Z0-9_\-+]+):/g;

interface EmojifiedText {
    chatText: string,
}

const EmojifiedText: React.FC<EmojifiedText> = ({chatText}) => {
    if (!chatText) {
        return null;
    }

    return (
        <>
           {chatText.split(emojiNameRegex) // parse emoji via regex
               .map((word, i) => {
                       // every second element is an emoji, e.g. "test :fast_forward:" -> [ "test ", "fast_forward" ]
                       if (i % 2 === 0) {
                           return word;
                       }
                       if (emojiList[word]) {
                           return (
                               <EmojiImage key={i} name={word}/>
                           );
                       }
                       const emoji = nodeEmoji.get(word);
                       const isMissing = emoji.indexOf(':') > -1;
                       const wrappedWord = `:${word}:`;
                       if (isMissing) {
                           return <span key={i} data-emoji={emoji}>{wrappedWord}</span>;

                       }
                       return (<span key={i} title={wrappedWord} className="emoji">{emoji}</span>);
                   }
               )}
        </>
    )
};

export default EmojifiedText;
