import React, {ChangeEvent, FormEvent, KeyboardEventHandler, useRef, useState} from 'react';
import classNames from 'classnames';
import SmileyHintList from "./SmileyHintList";
import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";
import {Emoji, emojiArray} from '../emoji'


export const isValidURL = (url = '') => {
    return url === '' || isEmail(url) || isURL(url);
};

interface ChatForm {
    chatName: string,
    url: string,
    chatText: string,
    onChangeChatName: (chatName: string) => void,
    onChangeUrl: (chatName: string) => void,
    onChangeChatText: (chatName: string) => void,
    onSubmit: () => void,
}

const ChatForm: React.FC<ChatForm> = ({
                                          chatName,
                                          onChangeChatName,
                                          url,
                                          onChangeUrl,
                                          chatText,
                                          onChangeChatText,
                                          onSubmit,
                                      }) => {

    const formRef = useRef<HTMLFormElement>(null);
    const chatRef = useRef<HTMLTextAreaElement>(null);
    const [validURL, setValidURL] = useState(true);
    const [autoComplete, setAutoComplete] = useState(false);
    const [matching, setMatching] = useState<Emoji[]>([]);
    const [start, setStart] = useState(0);

    const urlChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setValidURL(isValidURL(ev.target.value));
        onChangeUrl(ev.target.value);
    }

    const chatChangeHandler = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        onChangeChatText(ev.target.value);
    }

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        onSubmit();
    }

    const chatInputHandler: KeyboardEventHandler<HTMLTextAreaElement> = (ev) => {
        switch (ev.key) {
        case 'Enter':
            ev.preventDefault();
            onSubmit();
            return;
        case ':':
            if (autoComplete) {
                setAutoComplete(false);
                return;
            }
            setStart(() => chatRef.current?.selectionStart || start);
            setMatching(emojiArray);
            setAutoComplete(true);
            return;
        }
        if (autoComplete) {
            const selectionEnd = chatRef.current?.selectionEnd || 0;
            if (selectionEnd < start) {
                setAutoComplete(false);
                return;
            }
            const filter = chatText.substring(start, selectionEnd);
            console.log(filter);
            setMatching(emojiArray.filter(e => e.key.startsWith(filter)))
        }
    }

    const onClickSmileyHint = (key: string) => {
        if (!chatRef.current) {
            return;
        }
        const selectionEnd = chatRef.current?.selectionEnd;
        if (selectionEnd < start) {
            return;
        }
        chatRef.current.focus();
        chatRef.current.setSelectionRange(start, selectionEnd);
        chatRef.current.setRangeText(key + ':', start, selectionEnd, 'end');
        onChangeChatText(chatRef.current.value);
        setAutoComplete(false);
        setMatching([])
    }

    return (
        <form onSubmit={submitHandler} ref={formRef} className="chat-form">
            <div className="input-group mb-1">
                <span className="input-group-text">
                    <span className="bi bi-person"/>
                </span>
                <input type="text" className="form-control form-control-sm"
                       placeholder="Name" required
                       value={chatName} onChange={(ev) => onChangeChatName(ev.target.value)}/>
                <span className="input-group-text">
                            <span className="bi bi-link"/>
                        </span>
                <input type="text"
                       className={classNames("form-control form-control-sm", {'bg-warning': !validURL})}
                       placeholder="URL or Email (optional)"
                       value={url} onChange={urlChangeHandler}/>
            </div>
            <textarea className="form-control form-control-sm mb-1"
                      value={chatText}
                      ref={chatRef}
                      placeholder="Got something to say?" required
                      onChange={chatChangeHandler}
                      onKeyUp={chatInputHandler}/>
            {autoComplete && (
                <SmileyHintList matching={matching} onClick={onClickSmileyHint}/>
            )}

            <button className={classNames("btn btn-outline-secondary", {'visually-hidden': autoComplete})}
                    type="submit">Submit
            </button>
        </form>
    )
}

export default ChatForm;
