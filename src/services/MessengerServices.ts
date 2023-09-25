import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from 'universal-cookie';
import {ICreateChanelAPIBody} from "../Types/Services/IMessengerServices";
import {IDefaultResponse} from "../Types/Services";

const cookies = new Cookies();

export const MessengerServicesAPI = createApi({
    reducerPath: 'MessengerServicesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVER_URL,
        prepareHeaders: (headers, { getState, endpoint }) => {

            headers.set('Authorization',  `Bearer ${cookies.get('token')}`)

            return headers
        }
    }),
    endpoints: (build) => ({
        createChanelAPI: build.mutation<IDefaultResponse, ICreateChanelAPIBody>({
            query: (body) => ({
                url: 'messenger/createChannel',
                method: 'POST',
                body,
            }),
        }),
    })
})

export const {
    useCreateChanelAPIMutation,
} = MessengerServicesAPI