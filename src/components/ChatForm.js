import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setChat, setName, setURL, sendChat} from "../actions";
import {isValidURL} from '../utils';
import classNames from 'classnames';
import {unemojify} from 'node-emoji';
import {smileyList} from '../utils';
import SmileyHintList from "./SmileyHintList";


class ChatForm extends Component {

    static propTypes = {
        tagname: PropTypes.string,
        url: PropTypes.string,
        chattext: PropTypes.string,

        setChat: PropTypes.func.isRequired,
        setName: PropTypes.func.isRequired,
        setURL: PropTypes.func.isRequired,
        sendChat: PropTypes.func.isRequired,
    };

    static defaultProps = {
        tagname: '',
        url: '',
        chattext: '',
    };

    state = {
        autoComplete: false,
        matching: [],
        start: 0,
    }

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onChangeChat = this.onChangeChat.bind(this);
        this.onChatKeyup = this.onChatKeyup.bind(this);
        this.onClickSmileyHint = this.onClickSmileyHint.bind(this);

        this.formRef = createRef();
        this.chatRef = createRef();
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.setState({autoComplete: false, matching: []});
        this.props.sendChat();
    }

    onChangeName(ev) {
        this.props.setName(ev.target.value);
    }

    onChangeUrl(ev) {
        this.props.setURL(ev.target.value);
    }

    onChangeChat(ev) {
        if (ev.target.value.substr(-1) === '\n') {
            return;
        }
        this.props.setChat(unemojify(ev.target.value));
    }

    onChatKeyup(ev) {
        const {autoComplete, start} = this.state;
        const {chattext} = this.props;
        switch (ev.key) {
        case 'Enter':
            if (this.formRef.current) {
                this.formRef.current.querySelector('button').click();
            }
            // this.props.sendChat();
            break;
        case ':':
            if (autoComplete) {
                this.setState({autoComplete: false});
            } else {
                const selectionStart = this.chatRef.current.selectionStart;
                this.setState({autoComplete: true, matching: [], start: selectionStart});
            }
            break;
        default:
            if (autoComplete) {
                const selectionEnd = this.chatRef.current.selectionEnd;
                if (selectionEnd < start) {
                    this.setState({autoComplete: false, matching: []});
                } else {
                    const filter = chattext.substring(start, selectionEnd);
                    const matching = smileyList.filter(smiley => smiley.key.startsWith(filter));
                    this.setState({matching});
                }
            }
        }
    }

    onClickSmileyHint(key) {
        const {autoComplete, start, filter} = this.state;
        const {chattext} = this.props;
        const selectionEnd = this.chatRef.current.selectionEnd;
        if (selectionEnd < start) {
            return;
        }
        this.chatRef.current.focus();
        this.chatRef.current.setSelectionRange(start, selectionEnd);
        this.chatRef.current.setRangeText(key + ':', start, selectionEnd, 'end');
        this.props.setChat(this.chatRef.current.value);
        this.setState({autoComplete: false, matching: []});

    }
    render() {
        const {tagname, url, chattext,} = this.props;
        const {matching, autoComplete} = this.state;
        const isValidUrl = isValidURL(url);
        return (
            <form onSubmit={this.onSubmit} ref={this.formRef}>
                <div className="input-group mb-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <span className="oi oi-person"/>
                        </span>
                    </div>
                    <input type="text" className="form-control form-control-sm"
                           placeholder="Name" required
                           value={tagname} onChange={this.onChangeName}/>
                </div>
                <div className="input-group mb-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <span className="oi oi-external-link"/>
                        </span>
                    </div>
                    <input type="text"
                           className={classNames("form-control form-control-sm", {'bg-warning': !isValidUrl})}
                           placeholder="URL or Email (optional)"
                           value={url} onChange={this.onChangeUrl}/>
                </div>
                <textarea className="form-control form-control-sm mb-1"
                          value={chattext}
                          ref={this.chatRef}
                          placeholder="Got something to say?" required
                          onChange={this.onChangeChat}
                          onKeyUp={this.onChatKeyup}/>
                {!!autoComplete && (
                    <SmileyHintList matching={matching} onClick={this.onClickSmileyHint} />
                )}
                <button className="btn btn-outline-secondary btn-block" type="submit">Submit</button>
            </form>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const {tagname, url, chattext} = state;
    return {tagname, url, chattext};
};

const mapDispatchToProps = {
    setChat,
    setName,
    setURL,
    sendChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
