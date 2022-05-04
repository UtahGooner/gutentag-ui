import React, {Component, Fragment} from 'react';
import nodeEmoji from 'node-emoji';
import {smilies} from '../utils';
import Emoji from "./Emoji";

// copied from 'node-emoji', emojify with modifications for react rendering
const emojiNameRegex = /:([a-zA-Z0-9_\-\+]+):/g;
const EmojifiedText = ({chatText}) => {
    if (!chatText) return '';

    return chatText.split(emojiNameRegex) // parse emoji via regex
        .map((word, i) => {
            // every second element is an emoji, e.g. "test :fast_forward:" -> [ "test ", "fast_forward" ]
            if (i % 2 === 0) {
                return word;
            }
            if (smilies[word] !== undefined) {
                return (
                    <Emoji key={i} word={word} />
                );
            }
            const emoji = nodeEmoji.get(word);
            const isMissing = emoji.indexOf(':') > -1;
            const wrappedWord = `:${word}:`;
            if (isMissing) {
                return wrappedWord;

            }
            return (<span key={i} title={wrappedWord}>{emoji}</span>);
        });
};

export default EmojifiedText;