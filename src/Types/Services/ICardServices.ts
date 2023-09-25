import {IKeyAny} from "../Types";
import {IDefaultResponse} from "./index";
import {ICard, ICardDefault} from "../Card/ICard";

export interface IGetFavoritesResponse extends IDefaultResponse {
    data?: TFavoriteListResponse[];
}
export interface ICardServicesGetAllResponse extends IDefaultResponse {
    data?: ICard[];
    dataFavorites?: TFavoriteListResponse[];
}

export interface ICardDefaultDataResponse extends IDefaultResponse {
    data?: ICard[]
}

export interface ICardGetResponse extends IDefaultResponse {
    data?: ICardDefault
}

export interface ICardAddFavoriteResponse extends IDefaultResponse {
    data?: TFavoriteListResponse[]
}
export interface ICardUploadImageResponse extends IDefaultResponse {
    data?: string
}

export interface ICardServicesCreateBody {
    path: string;
    params: IKeyAny;
    dateUnix: number;
    userUuid: string;
    images: string[];
    city: {
        ru: string;
        en: string;
    };
}

export interface ICardServicesUpdateBody extends ICardServicesCreateBody {
    cardUuid: string;
}

export interface ICardServicesDeleteBody {
    cardUuid: string;
}

export interface ICardChangePublishedBody {
    cardUuid: string;
    status: boolean;
}

export interface ICardServicesGetAllBody {
    limit: number;
}
export interface ICardServicesGetCardBody {
    cardUuid: string;
    cardVisible?: boolean;
}
export interface ICardServicesGetCardToIdBody {
    cardId: string;
}

export interface ICardAddFavoriteBody {
    cardUuid: string;
}

export type TFavoriteList = {
    id: number,
    userUuid: string,
    cardUuid: string,
}
export type TFavoriteListResponse = {
    id: number,
    user_uuid: string,
    card_uuid: string,
}