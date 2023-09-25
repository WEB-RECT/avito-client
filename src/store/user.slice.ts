import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';
import {ICity, ICityDefault} from "../Types/User/IUser";
import CyrillicToTranslit from 'cyrillic-to-translit-js';

const cookies = new Cookies();
const cyrillicToTranslit = new (CyrillicToTranslit as any)();

interface IUserSlice {
    authInfo: {
        email: string
        uuid: string
        name: string
        token: string
    }
    city: ICity
    cityData: ICityDefault[]
}

const initialState: IUserSlice = {
    authInfo: {
        email: '',
        uuid: '',
        name: '',
        token: '',
    },
    city: {
        ru: cookies.get('city')?.ru || 'Москва',
        en: cookies.get('city')?.en || 'Moscow',
    },
    cityData: [],
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUserInfoAuthACTION: (state, action) => {
            state.authInfo = {
                email: action.payload.email,
                uuid: action.payload.uuid,
                name: action.payload.name,
                token: action.payload.token,
            }
        },
        removeUserInfoAuthACTION: (state) => {
            state.authInfo = {
                ...initialState.authInfo
            }
        },
        changeCityACTION: (state, action: PayloadAction<string>) => {
            const currentPayload = {
                ru: action.payload,
                en: cyrillicToTranslit.transform(action.payload),
            }
            cookies.set('city', action.payload, {
                path: '/',
                maxAge: 1 * 60 * 60 * 24 * 30 * 12 * 10
            })
            state.city = currentPayload
        },
        changeCityDataACTION: (state, action: PayloadAction<ICityDefault[]>) => {
            state.cityData = action.payload
        },
    }
})

export const userSliceActions = userSlice.actions
export const userSliceReducer = userSlice.reducer