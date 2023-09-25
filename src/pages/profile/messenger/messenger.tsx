import React, {useEffect, useState} from 'react';
import Header from "../../../components/Navigation/Header";
import ContainerElement from "../../../components/UI/ContainerElement/ContainerElement";
import Menu from "../../../components/UI/Profile/Menu/Menu";
import Text from "../../../components/UI/Typography/Text";
import ChannelList from "../../../components/UI/Messenger/ChannelList/ChannelList";
import socket from "../../../socket/socket";
import {useAppSelector} from "../../../customHook/redux";
import {IChannel} from "../../../Types/Messenger/IMessenger";
import {authInfoGET} from "../../../store/selectors";

const Messenger = () => {

    const authInfo = useAppSelector(authInfoGET)

    const [channels, setChannels] = useState<IChannel[]>([])

    useEffect(() => {
        socket.emit('CHANNEL:GET_ALL', {
            userUuid: authInfo.uuid
        })

        socket.on('CHANNEL:GETTING_ALL', (socket) => {
            if (socket.status) {
                setChannels(socket.data)
            }
        })
    }, [])

    return (
        <>
            <Header/>

            <ContainerElement>
                <div className="section-profile">
                    <div className="left">

                        <Menu/>

                    </div>
                    <div className="right">

                        <Text
                            size={18}
                        >
                            Сообщения
                        </Text>

                        <ChannelList
                            channels={channels}
                        />

                    </div>
                </div>
            </ContainerElement>
        </>
    );
};

export default React.memo(Messenger);