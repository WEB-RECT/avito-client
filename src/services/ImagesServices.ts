import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    ICardAddFavoriteBody, ICardAddFavoriteResponse,
    ICardChangePublishedBody,
    ICardDefaultDataResponse,
    ICardServicesCreateBody,
    ICardServicesDeleteBody,
    ICardServicesGetAllBody,
    ICardServicesGetAllResponse, ICardUploadImageResponse
} from "../Types/Services/ICardServices";
import {RootState} from "../store";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const imagesAPI = createApi({
    reducerPath: 'imagesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVER_URL,
        prepareHeaders: (headers, { getState, endpoint }) => {

            headers.set('Authorization',  `Bearer ${cookies.get('token')}`)

            return headers
        }
    }),
    endpoints: (build) => ({
        uploadImageAPI: build.mutation<ICardUploadImageResponse, string>({
            query: (image) => ({
                url: 'image/upload',
                method: 'POST',
                body: {
                    image,
                },
            }),
        }),
    })
})

export const {
    useUploadImageAPIMutation,
} = imagesAPI