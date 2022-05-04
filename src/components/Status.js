import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import packageJSON from '../../package.json';

export default class Status extends Component {
    static propTypes = {
        alert: PropTypes.string,
        ping: PropTypes.bool,
        connected: PropTypes.bool,
    };

    render() {
        const {connected, alert, ping} = this.props;
        return (
            <div className={classNames("status", {disconnected: !connected})}>
                <div className="version">{packageJSON.name}, v. {packageJSON.version}</div>
                <div className={classNames({ping, heartbeat: true})}>
                    &#9829;
                </div>
            </div>
        )
    }
}
