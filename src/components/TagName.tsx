import validator from "validator";
import React from "react";

interface TagName {
    url: string,
    tagName: string,
}
const TagName:React.FC<TagName> = ({url = '', tagName = ''}) => {
    url = url.trim();
    if (validator.isEmail(url)) {
        return (<a href={`mailto:${url}`} target="_blank">{tagName}</a>);
    }
    if (validator.isURL(url)) {
        return (<a href={url} target="_blank">{tagName}</a>);
    }
    return (<span>{tagName}</span>);
};

export default TagName;
