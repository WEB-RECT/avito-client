import React, {FC} from 'react';
import './ChannelUser.scss'
import Text from "../../Typography/Text";
import {IChannel} from "../../../../Types/Messenger/IMessenger";
import {Link} from "react-router-dom";
import IMG_NoPhoto from "../../../../assets/images/no_photo.png";

interface IProps {
    channel: IChannel
}

const ChannelUser: FC<IProps> = ({channel}) => {
    return (
        <Link to={`/profile/messenger/${channel.uuid}`}>
            <div className="channel-user">
                <div className="channel-user-img">
                    <img src={channel.card.images_url[0] || IMG_NoPhoto} alt=""/>
                </div>
                <div className="channel-user-content">
                    <Text
                        ellipsis="row"
                        size={18}
                        weight={600}
                        style={{
                            marginBottom: 5
                        }}
                    >
                        {
                            channel.author.name
                        }
                    </Text>

                    <Text
                        ellipsis="row"
                        style={{
                            marginBottom: 5
                        }}
                    >
                        {
                            `${channel.card.name} ${channel.card.price}`
                        }
                    </Text>

                    <Text
                        size={14}
                        color="gray"
                        ellipsis="row"
                    >
                        {
                            channel.lastMessage?.message || 'Нету сообщений'
                        }
                    </Text>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(ChannelUser);