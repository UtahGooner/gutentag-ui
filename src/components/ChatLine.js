import React from "react";
import EmojifiedText from './EmojifiedText';
import TagName from "./TagName";

const ChatLine = ({createdAt, url, tagname, chattext}) => {
    return (
        <div className="chat">
            <div className="chat-name" title={new Date(createdAt || Date.now()).toLocaleString()}>
                <TagName tagname={tagname} url={url} />
            </div>
            <div className="chat-text">
                <EmojifiedText chatText={chattext}/>
            </div>
        </div>
    )
};
export default ChatLine;