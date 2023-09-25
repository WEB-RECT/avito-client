import React, {useCallback, useEffect, useState} from 'react';
import Header from "../../../components/Navigation/Header";
import ContainerElement from "../../../components/UI/ContainerElement/ContainerElement";
import Menu from "../../../components/UI/Profile/Menu/Menu";
import Chat from "../../../components/UI/Messenger/Chat/Chat";
import {IChannel, IMessage} from "../../../Types/Messenger/IMessenger";
import socket from "../../../socket/socket";
import {useParams} from "react-router-dom"
import {newObject} from "../../../functions/object/newObject";

const MessengerUuid = () => {

    const { uuid } = useParams()

    const [channel, setChannel] = useState<IChannel>({} as IChannel)
    const [messages, setMessages] = useState<IMessage[]>([])

    useEffect(() => {
        socket.emit('CHANNEL:GET_SOLO', {
            uuid,
        })
        socket.on('CHANNEL:GETTING_SOLO', (content) => {
            if (content.status) {
                setChannel(content.data)
                setMessages(content.dataMessages)
            }
        })
        socket.on('MESSAGE:GETTING_SOLO', (content) => {
            if (content.status) {
                setMessages(prev => {
                    const newPrev = newObject(prev)
                    newPrev.push(content.data)

                    return newPrev
                })
            }
        })
    }, [uuid])

    const sendMessage = useCallback((value: string) => {
        if (channel.uuid) {
            const data = {
                createdUnix: Date.now(),
                toUuid: channel.users[1].uuid,
                fromUuid: channel.author.uuid,
                channelUuid: channel.uuid,
                message: value,
            }

            socket.emit('MESSAGE:SEND', data)
        }
    }, [channel])

    return (
        <>
            <Header/>

            <ContainerElement>
                <div className="section-profile">
                    <div className="left">

                        <Menu/>

                    </div>
                    <div className="right">
                        {
                            channel.uuid
                                ?
                                <Chat
                                    channel={channel}
                                    messages={messages}
                                    sendMessage={sendMessage}
                                />
                                :
                                "Ошибка получения"
                        }
                    </div>
                </div>
            </ContainerElement>
        </>
    );
};

export default React.memo(MessengerUuid);