import {TUuid} from "../Types";

export interface ICreateChanelAPIBody {
    dateUnix: number
    usersUuid: TUuid[]
    cardUuid: TUuid
    authorUuid: TUuid
}