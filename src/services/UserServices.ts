import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {ICreateUserResponse, IGetAllCityResponse} from "../Types/Services/IUserServices";
import {IFormValueLogin, IFormValueRegister} from "../Types/Types";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVER_URL
    }),
    endpoints: (build) => ({
        createUserAPI: build.mutation<ICreateUserResponse, object>({
            query: (body: IFormValueRegister) => ({
                url: 'user/register',
                method: 'POST',
                body,
            }),
        }),
        authUserAPI: build.mutation<ICreateUserResponse, object>({
            query: (body: IFormValueLogin) => ({
                url: 'user/login',
                method: 'POST',
                body,
            })
        }),
        getAllCityAPI: build.query<IGetAllCityResponse, string>({
            query: (name) => 'user/getCity',
        }),
    })
})

export const {
    useCreateUserAPIMutation,
    useAuthUserAPIMutation ,
    useLazyGetAllCityAPIQuery,
} = userAPI