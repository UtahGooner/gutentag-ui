import React from "react";
import EmojifiedText from './EmojifiedText';
import TagName from "./TagName";
import {Chat} from "../types";

interface ChatLine extends Partial<Chat> {
    tagname: string,
    url: string,
    chattext: string,
}
const ChatLine:React.FC<ChatLine> = ({createdAt, url, tagname, chattext}) => {
    const timestamp = new Date(createdAt || Date.now()).toLocaleString();
    return (
        <div className="chat">
            <div className="chat-header">
                <div className="chat-name" title={timestamp}>
                    <TagName tagName={tagname} url={url} />
                </div>
                <div className="chat-timestamp">{timestamp}</div>
            </div>
            <div className="chat-text">
                <EmojifiedText chatText={chattext}/>
            </div>
        </div>
    )
};

export default React.memo(ChatLine);
