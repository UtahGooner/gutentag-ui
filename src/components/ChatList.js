import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import validator from "validator";
import nodeEmoji from 'node-emoji';
import {smilies} from '../utils';
import ChatLine from "./ChatLine";


const Smiley = (name) => {
    if (!smilies[name]) {
        return null;
    }
    const image = `https://progulus.com/rprweb/images/smilies/${smilies[name]}`;
    return (<img src={image} alt={name} className="smiley" />);
};



class ChatList extends Component {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            tagname: PropTypes.string,
            url: PropTypes.string,
            chattext: PropTypes.string,
        })),
        tagname: PropTypes.string,
        url: PropTypes.string,
        chattext: PropTypes.string,
    };

    static defaultProps = {
        list: [],
        tagname: '',
        url: '',
        chattext: '',
    };

    render() {
        const {list, chattext, url, tagname} = this.props;
        return (
            <Fragment>
                {!!chattext && (
                    <div className="new-chat">
                        <ChatLine tagname={tagname} url={url} chattext={chattext}/>
                    </div>
                )}
                {list.map(chat => <ChatLine key={chat.id} {...chat}/>)}
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { list, tagname, url, chattext} = state;
    return {list, tagname, url, chattext};
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
