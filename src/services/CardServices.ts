import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    ICardAddFavoriteBody,
    ICardAddFavoriteResponse,
    ICardChangePublishedBody,
    ICardDefaultDataResponse,
    ICardGetResponse,
    ICardServicesCreateBody,
    ICardServicesDeleteBody,
    ICardServicesGetAllBody,
    ICardServicesGetAllResponse,
    ICardServicesGetCardBody,
    ICardServicesGetCardToIdBody,
    ICardServicesUpdateBody,
    IGetFavoritesResponse
} from "../Types/Services/ICardServices";
import {RootState} from "../store";
import Cookies from 'universal-cookie';
import {IDefaultResponse} from "../Types/Services";

const cookies = new Cookies();

export const cardAPI = createApi({
    reducerPath: 'cardAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVER_URL,
        prepareHeaders: (headers, { getState, endpoint }) => {

            headers.set('Authorization',  `Bearer ${cookies.get('token')}`)

            return headers
        }
    }),
    tagTypes: ['MyCardsDefault'],
    endpoints: (build) => ({
        createCardAPI: build.mutation<IDefaultResponse, ICardServicesCreateBody>({
            query: (body) => ({
                url: 'card/create',
                method: 'POST',
                body,
            }),
        }),
        updateCardAPI: build.mutation<IDefaultResponse, ICardServicesUpdateBody>({
            query: (body) => ({
                url: 'card/update',
                method: 'POST',
                body,
            }),
        }),
        addFavoritesAPI: build.mutation<ICardAddFavoriteResponse, ICardAddFavoriteBody>({
            query: (body) => ({
                url: 'card/addFavorite',
                method: 'POST',
                body,
            }),
        }),
        removeFavoriteAPI: build.mutation<ICardDefaultDataResponse, number>({
            query: (idFavorite) => ({
                url: 'card/removeFavorite',
                method: 'POST',
                body: {
                    idFavorite,
                },
            }),
        }),
        changePublishedAPI: build.mutation<ICardDefaultDataResponse, ICardChangePublishedBody>({
            query: (body) => ({
                url: 'card/changePublished',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['MyCardsDefault']
        }),
        deleteCardAPI: build.mutation<IDefaultResponse, ICardServicesDeleteBody>({
            query: (body) => ({
                url: 'card/delete',
                method: 'POST',
                body,
            }),
        }),
        getCardsAPI: build.query<ICardServicesGetAllResponse, ICardServicesGetAllBody>({
            query: (body) => ({
                url: 'card/getAll',
                params: body
            }),
            providesTags: ['MyCardsDefault']
        }),
        getCardAPI: build.query<ICardGetResponse, ICardServicesGetCardBody>({
            query: (body) => ({
                url: 'card/getCard',
                params: body
            }),
        }),
        getCardToIdAPI: build.query<ICardGetResponse, ICardServicesGetCardToIdBody>({
            query: (body) => ({
                url: 'card/getCardId',
                params: body
            }),
        }),
        checkCardAPI: build.query<IDefaultResponse, ICardServicesGetCardToIdBody>({
            query: (body) => ({
                url: 'card/checkCard',
                params: body
            }),
        }),
        getCardsToFavoritesAPI: build.query<ICardServicesGetAllResponse, string>({
            query: (name) => 'card/getAllFavorites',
        }),
        getFavoritesAPI: build.query<IGetFavoritesResponse, string>({
            query: (name) => 'card/getFavorites',
        }),
        getMyCardsAPI: build.mutation<ICardServicesGetAllResponse, string>({
            query: (body) => ({
                url: 'card/getAllMyCards',
                method: 'POST',
            }),
            invalidatesTags: ['MyCardsDefault']
        }),
    })
})

export const {
    useCreateCardAPIMutation,
    useDeleteCardAPIMutation,
    useGetCardsAPIQuery,
    useLazyGetCardsAPIQuery,
    useAddFavoritesAPIMutation,
    useGetFavoritesAPIQuery,
    useRemoveFavoriteAPIMutation,
    useGetCardsToFavoritesAPIQuery,
    useGetMyCardsAPIMutation,
    useChangePublishedAPIMutation,
    useLazyGetCardAPIQuery,
    useUpdateCardAPIMutation,
    useLazyGetCardToIdAPIQuery,
    useLazyCheckCardAPIQuery,
    useLazyGetFavoritesAPIQuery,
} = cardAPI