import React from 'react';
import {smilies} from "../utils";

const Emoji = ({word}) => {
    const wrappedWord = `:${word}:`;
    const image = `https://progulus.com/rprweb/images/smilies/${smilies[word]}`;
    return (
        <img src={image} alt={wrappedWord} className="smiley" title={wrappedWord} />
    );
};

export default Emoji;