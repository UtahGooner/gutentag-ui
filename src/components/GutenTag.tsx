import React, {useEffect, useState} from 'react';
import useWebSocket from "react-use-websocket";
import ChatList from "./ChatList";
import Status from "./Status";
import ChatForm from "./ChatForm";
import {Chat, WSJsonMessage} from "../types";

const socketURL = 'wss://gutenprog.com/gt6/chat/';


const SOCKET = {
    DEFAULT_RETRY: 250,
    PING_INTERVAL: 30000,
    RECONNECT: 1000,
    MAX_RECONNECT: 10 * 60 * 1000,
};


const GutenTag: React.FC = () => {
    const [intervalHandler, setIntervalHandler] = useState(0);
    const [timerHandler, setTimerHandler] = useState(0);
    const [shouldReconnect, setShouldReconnect] = useState(true);

    const [connected, setConnected] = useState(false);
    const [chatList, setChatList] = useState<Chat[]>([]);
    const [heartbeat, setHeartbeat] = useState(false);

    const [userName, setUserName] = useState(window.gt6Params?.user || 'guest');
    const [tagName, setTagName] = useState(window.gt6Params?.user || '');
    const [url, setUrl] = useState('');
    const [chatText, setChatText] = useState('');

    const pingHandler = () => {
        setHeartbeat(true);
        setTimerHandler(() => window.setTimeout(() => sendJsonMessage({ping: 1}), 350));
    }

    const onOpen = (ev: WebSocketEventMap['open']) => {
        sendJsonMessage({state: 'connected'});
        sendJsonMessage({sync: 1});
        setConnected(true);
        setIntervalHandler(() => window.setInterval(pingHandler, SOCKET.PING_INTERVAL));
    }
    const onClose = (ev: WebSocketEventMap['close']) => {
        setConnected(false);
        window.clearInterval(intervalHandler);
    }

    const onMessage = (ev: WebSocketEventMap['message']) => {
        // console.log('message', ev);
    }
    const onError = (ev: WebSocketEventMap['error']) => console.log('error', ev);

    const {sendJsonMessage, sendMessage, lastJsonMessage, readyState, getWebSocket,} = useWebSocket(socketURL, {
        onOpen,
        onClose,
        onMessage,
        onError,
        shouldReconnect: () => shouldReconnect,
    });

    const jsonMessage = lastJsonMessage as WSJsonMessage;

    useEffect(() => {
        if (!lastJsonMessage) {
            return;
        }
        if (jsonMessage.pong) {
            return setHeartbeat(false);
        }
        if (jsonMessage.list) {
            return setChatList(jsonMessage.list);
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        return () => {
            window.clearInterval(intervalHandler);
            window.clearTimeout(timerHandler);
        }
    }, []);

    const onSubmitMessage = () => {
        sendJsonMessage({message: {tagname: tagName, url, chattext: chatText}})
        setChatText('');
    }

    return (
        <div>
            <div className="chat-container">
                <Status connected={connected} ping={heartbeat}/>
                <ChatList list={chatList} tagName={tagName} url={url} chatText={chatText}/>
            </div>
            <div><ChatForm chatName={tagName} onChangeChatName={value => setTagName(value)}
                           url={url} onChangeUrl={value => setUrl(value)}
                           chatText={chatText} onChangeChatText={value => setChatText(value)}
                           onSubmit={onSubmitMessage}/></div>
        </div>
    )
}
export default GutenTag;
