import React, {FC} from 'react';
import './ChannelList.scss'
import ChannelUser from "../ChannelUser/ChannelUser";
import {IChannel} from "../../../../Types/Messenger/IMessenger";

interface IProps {
    channels: IChannel[]
}

const ChannelList: FC<IProps> = ({ channels }) => {

    return (
        <div className="channel-list">

            {
                channels.sort((a, b) => b.id - a.id).map((channel) => (
                    <ChannelUser 
                        key={channel.id.toString() + channel.uuid + 'channel'}
                        channel={channel}
                    />
                ))
            }

        </div>
    );
};

export default React.memo(ChannelList);