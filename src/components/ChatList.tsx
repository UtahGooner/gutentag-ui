import React, {Fragment} from 'react';
import ChatLine from "./ChatLine";
import {Chat} from "../types";

interface ChatList {
    list: Chat[],
    tagName?: string,
    url?: string,
    chatText?: string,
}

const ChatList: React.FC<ChatList> = ({list, tagName, url, chatText}) => {
    return (
        <Fragment>
            {!!chatText && !!tagName && (
                <div className="new-chat">
                    <ChatLine tagname={tagName} url={url || ''} chattext={chatText}/>
                </div>
            )}
            {list.map(chat => <ChatLine key={chat.id} {...chat}/>)}
        </Fragment>
    );


}
export default ChatList;
