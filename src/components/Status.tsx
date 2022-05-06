import React from 'react';
import classNames from "classnames";
import packageJSON from '../../package.json';

interface Status {
    connected: boolean,
    ping: boolean,
}

const Status: React.FC<Status> = ({connected, ping}) => {
    return (
        <div className={classNames("status", {disconnected: !connected})}>
            <div className="version">{packageJSON.name}, v. {packageJSON.version}</div>
            <div className={classNames({ping, heartbeat: true})}>
                &#9829;
            </div>
        </div>
    )
}
export default React.memo(Status);
