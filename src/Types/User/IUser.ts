import {TUuid} from "../Types";

export interface IUser {
    id: number
    email: string
    uuid: TUuid
    name: string
}

export interface ICityDefault {
    coords: {
        "lat": string
        "lon": string
    }
    district: string
    name: string
    population: number
    subject: string
}

export interface ICity {
    ru: string
    en: string
}