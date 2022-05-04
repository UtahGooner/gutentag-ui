import {
    PING,
    PONG,
    RECEIVE_CHATS,
    SEND_CHAT,
    SET_ALERT,
    SET_CHAT,
    SET_CONNECTED,
    SET_TAGNAME,
    SET_URL
} from "../constants";
import validator from "validator";

const SOCKET = {
    DEFAULT_RETRY: 250,
    PING_INTERVAL: 30000,
};

const gt6 = {
    socket: null,
    interval: null,
    connectTimer: null,
    retry: SOCKET.DEFAULT_RETRY,
};

const send = (data = {}) => (dispatch, getState) => {
    const {connected} = getState();
    dispatch({type: PING});
    switch (gt6.socket.readyState) {
    case WebSocket.CONNECTING:
        clearTimeout(gt6.connectTimer);
        gt6.connectTimer = setTimeout(() => {
            dispatch(send(data));
        }, 500);
        return;
    case WebSocket.CLOSING:
    case WebSocket.CLOSED:
        clearInterval(gt6.interval);
        if (connected) {
            dispatch({type: SET_CONNECTED, connected: false});
        }
        return;
    case WebSocket.OPEN:
        gt6.socket.send(JSON.stringify(data));
        if (!connected) {
            dispatch({type: SET_CONNECTED, connected: true});
        }
        return;
    }
};

export const sendChat = () => (dispatch, getState) => {
    const {tagname, url, chattext} = getState();
    dispatch({type: SEND_CHAT});
    dispatch(send({message: {tagname, url, chattext}}))
};

const onMessage = (ev) => (dispatch, getState) => {
    dispatch({type: PONG});
    const data = JSON.parse(ev.data);
    if (data.pong) {
        return;
    }
    if (data.list) {
        dispatch({type: RECEIVE_CHATS, list: data.list});
    }
};

export const setName = (tagname) => ({type: SET_TAGNAME, tagname});
export const setURL = (url) => ({type: SET_URL, url});
export const setChat = (chattext) => ({type: SET_CHAT, chattext});

const connect = () => (dispatch, getState) => {
    gt6.socket = new WebSocket('wss://gutenprog.com/gt6/chat/');

    gt6.socket.addEventListener('open', () => {
        const {connected} = getState();
        if (!connected) {
            dispatch({type: SET_CONNECTED, connected: true});
        }
        dispatch(send({state: 'connected'}));
        dispatch(send({sync: 1}));
    });

    gt6.socket.addEventListener('message', (ev) => {
        dispatch(onMessage(ev));
    });

    gt6.socket.addEventListener('error', (err) => {
        console.log(err);
        clearInterval(gt6.interval);
        clearTimeout(gt6.connectTimer);
        dispatch({type: SET_ALERT, alert: 'unknown error'});
        gt6.connectTimer = setTimeout(() => {
            dispatch(connect());
            // gt6.retry *= 2;
        }, gt6.retry);
    });

    gt6.socket.addEventListener('close', (ev) => {
        console.log(ev);
        dispatch({type: SET_CONNECTED, connected: false});
        clearInterval(gt6.interval);
        clearTimeout(gt6.connectTimer);
        gt6.connectTimer = setTimeout(() => {
            dispatch(connect());
            // gt6.retry *= 2;
        }, gt6.retry);
    });

    gt6.interval = setInterval(() => {
        dispatch(send({ping: 1}));
    }, SOCKET.PING_INTERVAL);
};

export const init = () => (dispatch, getState) => {
    dispatch(connect());
};

export const isValidURL = (url = '') => {
    return url === '' || validator.isEmail(url) || validator.isURL(url);
};


