import {IDefaultResponse} from "./index";
import {ICityDefault} from "../User/IUser";

export interface ICreateUserResponse extends IDefaultResponse{
    token?: string | null
}

export interface IGetAllCityResponse extends IDefaultResponse {
    data?: ICityDefault[]
}