import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TFavoriteList, TFavoriteListResponse} from "../Types/Services/ICardServices";


interface IFavoritesSlice {
    favoriteList: {
        [key: string]: TFavoriteList
    }
}

interface IFavoriteAllNewList {
    [key: string]: TFavoriteList
}

const initialState: IFavoritesSlice = {
    favoriteList: {}
}

export const favoritesSlice = createSlice({
    name: 'authInfoSlice',
    initialState,
    reducers: {
        addFavoriteACTION: (state, action: PayloadAction<TFavoriteListResponse>) => {

            state.favoriteList[action.payload.card_uuid] = {
                id: action.payload.id,
                userUuid: action.payload.user_uuid,
                cardUuid: action.payload.card_uuid,
            }

        },
        addFavoriteAllACTION: (state, action: PayloadAction<TFavoriteListResponse[]>) => {

            const newList: IFavoriteAllNewList = {
                ...state.favoriteList
            }

            if (action.payload) {
                action.payload.forEach(item => {
                    newList[item.card_uuid] = {
                        id: item.id,
                        userUuid: item.user_uuid,
                        cardUuid: item.card_uuid,
                    }
                })
            }

            state.favoriteList = {
                ...newList
            }

        },
        removeFavoriteACTION: (state, action: PayloadAction<string>) => {

            delete state.favoriteList[action.payload]

        },
    }
})

export const favoritesSliceActions = favoritesSlice.actions
export const favoritesSliceReducer = favoritesSlice.reducer