import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import './Chat.scss'
import Icons from "../../Icons/Icons";
import Button from "../../Button/Button";
import Text from "../../Typography/Text";
import Input from "../../Form/Input/Input";
import {Link} from "react-router-dom";
import {IChannel, IMessage} from "../../../../Types/Messenger/IMessenger";
import IMG_NoPhoto from "../../../../assets/images/no_photo.png";

interface IProps {
    channel: IChannel,
    messages: IMessage[],
    sendMessage: (value: string) => void
}

const VALUE_LENGTH = 255

const Chat: FC<IProps> = ({ channel, messages, sendMessage }) => {

    const refMessages = useRef<HTMLDivElement>(null)

    const [valueInput, setValueInput] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            if (refMessages.current) {
                const height = refMessages.current.scrollHeight

                refMessages.current.scrollTo({
                    top: height
                })
            }
        }, 0)
    }, [messages])

    const getTime = (time: number) => {
        const date = new Date(time)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
    }

    return (
        <>
            <div className="chat">
                <div className="chat-top">
                    <div className="chat-top-user">
                        <Link to="/profile/messenger/">
                            <Button
                                size="small"
                                buttonType="gray"
                            >
                                <Icons
                                    iconType="arrowLeft"
                                />
                            </Button>
                        </Link>
                        <div className="chat-top-user-content">
                            <div className="chat-top-user-content-img">
                                <img src={channel.card.images_url[0] || IMG_NoPhoto} alt=""/>
                            </div>
                            <div className="chat-top-user-content-info">
                                <Text
                                    size={18}
                                    weight={600}
                                    ellipsis="row"
                                >
                                    {
                                        channel.author.name
                                    }
                                </Text>

                                <Text
                                    color="gray"
                                    ellipsis="row"
                                >
                                    {
                                        `${channel.card.name} ${channel.card.price}`
                                    }
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
                <div

                    className="chat-messages"
                >
                    <div
                        ref={refMessages}
                        className="chat-messages-wrapper"
                    >
                        {
                            messages.length > 0
                                ?
                                messages.map((message) => (
                                    <div
                                        key={message.uuid + message.id + 'message'}
                                        className={`chat-messages-message ${message.fromUuid === channel.author.uuid ? 'you' : ''}`}
                                    >
                                        <div className="chat-messages-message-content">
                                            <Text
                                                style={{
                                                    marginBottom: 5
                                                }}
                                            >
                                                {
                                                    message.message
                                                }
                                            </Text>
                                            <Text
                                                size={12}
                                                style={{
                                                    opacity: 0.6
                                                }}
                                            >
                                                {
                                                    getTime(+message.createdUnix)
                                                }
                                            </Text>
                                        </div>
                                    </div>
                                ))
                                :
                                <Text>
                                    Нету сообщений
                                </Text>
                        }
                    </div>
                </div>
                <div className="chat-send">

                    <Input
                        defaultValue={valueInput}
                        getValueChanged={(value) => {
                            if (value.length <= VALUE_LENGTH) {
                                setValueInput(value)
                            }
                        }}
                        placeholder="Написать сообщение"
                        typeInput="standart"
                    />

                    <Button
                        size="small"
                        buttonType="gray"
                        style={{
                            marginLeft: 20
                        }}
                        disabled={valueInput.length === 0 || valueInput.length > VALUE_LENGTH}
                        onClick={() => {
                            sendMessage(valueInput.trim())
                            setValueInput('')
                        }}
                    >
                        <Icons
                            iconType="send"
                        />
                    </Button>

                </div>
            </div>
        </>
    );
};

export default React.memo(Chat);