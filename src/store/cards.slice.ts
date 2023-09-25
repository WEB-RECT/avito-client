import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TFavoriteList, TFavoriteListResponse} from "../Types/Services/ICardServices";
import {ICard} from "../Types/Card/ICard";

interface ICardsSlice {
    recommended: ICard[];
    myCards: ICard[];
    myCardsFavorites: ICard[];
}

const initialState: ICardsSlice = {
    recommended: [],
    myCards: [],
    myCardsFavorites: [],
}

export const cardsSlice = createSlice({
    name: 'cardsSlice',
    initialState,
    reducers: {
        addMyCardsListACTION: (state, action: PayloadAction<ICard[]>) => {
            state.myCards = action.payload
        },
        addRecommendedACTION: (state, action: PayloadAction<ICard[]>) => {
            state.recommended = action.payload
        },
        addMyCardsFavoritesACTION: (state, action: PayloadAction<ICard[]>) => {
            state.myCardsFavorites = action.payload
        },
        changeMyCardACTION: (state, action: PayloadAction<ICard>) => {

            const currentStateMyCards = state.myCards

            state.myCards.find((item, indexItem) => {
                if (item.uuid === action.payload.uuid) {
                    currentStateMyCards[indexItem] = action.payload
                }
            })

            state.myCards = currentStateMyCards

        },
        deleteMyCardACTION: (state, action: PayloadAction<string>) => {

            const currentStateMyCards = state.myCards
            const newCurrentStateMyCards: ICard[] = []

            currentStateMyCards.find((item, indexItem) => {
                if (item.uuid === action.payload) {
                    delete currentStateMyCards[indexItem]
                }
            })

            currentStateMyCards.forEach((item, indexItem) => {
                if (item) {
                    newCurrentStateMyCards.push(item)
                }
            })

            state.myCards = newCurrentStateMyCards

        }
    }
})

export const cardsSliceActions = cardsSlice.actions
export const cardsSliceReducer = cardsSlice.reducer