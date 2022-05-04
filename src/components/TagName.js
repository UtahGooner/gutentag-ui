import validator from "validator";
import React from "react";

const TagName = ({url = '', tagname = ''}) => {
    url = url.trim();
    if (validator.isEmail(url)) {
        return (<a href={`mailto:${url}`} target="_blank">{tagname}</a>);
    }
    if (validator.isURL(url)) {
        return (<a href={url} target="_blank">{tagname}</a>);
    }
    return tagname;
};
export default TagName;