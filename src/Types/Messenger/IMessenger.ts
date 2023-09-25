import {TUuid} from "../Types";
import {IUser} from "../User/IUser";
import {ICard} from "../Card/ICard";

export interface IChannel {
    id: number
    createdUnix: string
    users: IUser[]
    card: ICard
    author: IUser
    uuid: TUuid
    lastMessage: IMessage | null
}

export interface IMessage {
    id: number
    createdUnix: string
    uuid: TUuid
    toUuid: TUuid
    fromUuid: TUuid
    channelUuid: TUuid
    message: string
}