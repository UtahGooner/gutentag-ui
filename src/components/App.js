import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {init} from "../actions";
import Status from "./Status";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";


class App extends Component {
    static propTypes = {
        ping: PropTypes.bool,
        connected: PropTypes.bool,
        alert: PropTypes.string,
        list: PropTypes.array.isRequired,

        init: PropTypes.func.isRequired,
    };

    static defaultProps = {
        list: [],
        alert: '',
        ping: false,
        connected: false,
    };

    componentDidMount() {
        this.props.init();
    }

    render() {
        const {ping, alert, connected} = this.props;
        return (
            <div>
                <div className="chat-container">
                    <Status alert={alert} connected={connected} ping={ping}/>
                    <ChatList />
                </div>
                <div>
                    <ChatForm />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { alert, list, tagname, url, chattext, ping, connected } = state;
    return {alert, list, tagname, url, chattext, ping, connected};
};

const mapDispatchToProps = {
    init,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
