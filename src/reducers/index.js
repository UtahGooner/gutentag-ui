import { combineReducers } from 'redux';
import {
    CLEAR_ALERT, PING, PONG,
    RECEIVE_AUTH,
    RECEIVE_CHATS,
    RECEIVE_USER,
    SEND_CHAT,
    SEND_CHAT_FAILURE,
    SET_ALERT, SET_CHAT, SET_CONNECTED,
    SET_TAGNAME, SET_URL
} from "../constants";

const defaultUser = (window.gt6params || {}).user;


const alert = (state = null, action) => {
    const {type, alert}  = action;
    switch (type) {
    case SET_ALERT:
        return alert;
    case CLEAR_ALERT:
        return null;
    default:
        return state;
    }
};

const connected = (state = false, action) => {
    const {type, connected} = action;
    switch(type) {
    case SET_CONNECTED:
        return connected;
    default:
        return state;
    }
};

const auth = (state = null, action) => {
    const {type, auth} = action;
    switch (type) {
    case RECEIVE_AUTH:
        return auth;
    default:
        return state;
    }
};

const list = (state = [], action) => {
    const {type, list} = action;
    switch (type) {
    case RECEIVE_CHATS:
        return list;
    default:
        return state;
    }
};

const user = (state = defaultUser || '', action) => {
    const {type, user} = action;
    switch (type) {
    case RECEIVE_USER:
        return user;
    default:
        return state;
    }
};

const tagname = (state = defaultUser || '', action) => {
    const {type, user, tagname} = action;
    switch (type) {
    case RECEIVE_USER:
        return user;
    case SET_TAGNAME:
        return tagname;
    default:
        return state;
    }
};

const chattext = (state = '', action) => {
    const {type, chattext} = action;
    switch (type) {
    case SET_CHAT:
        return chattext;
    case SEND_CHAT:
        return '';
    case SEND_CHAT_FAILURE:
        return chattext;
    default:
        return state;
    }
};

const url = (state = '', action) => {
    const {type, url} = action;
    switch (type) {
    case SET_URL:
        return url;
    case SEND_CHAT:
        return '';
    case SEND_CHAT_FAILURE:
        return url;
    default:
        return state;
    }
};

const ping = (state = false, action) => {
    const {type} = action;
    switch (type) {
    case PING:
        return true;
    case PONG:
        return false;
    default:
        return state;
    }
};

const app = combineReducers({
    alert,
    auth,
    user,
    tagname,
    url,
    chattext,
    list,
    ping,
    connected,
});

export default app;


