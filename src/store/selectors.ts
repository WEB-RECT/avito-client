import {RootState} from "./index";
import {cardsSlice} from "./cards.slice";
import {userSlice} from "./user.slice";

// userSlice
export const userSliceReducer = (state: RootState) => state.userSliceReducer

export const authInfoGET = (state: RootState) => userSliceReducer(state).authInfo
export const cityGET = (state: RootState) => userSliceReducer(state).city
export const cityDataGET = (state: RootState) => userSliceReducer(state).cityData
// userSlice close

// cardsSlice
export const cardsSliceReducer = (state: RootState) => state.cardsSliceReducer

export const myCardsGET = (state: RootState) => cardsSliceReducer(state).myCards
export const myCardsFavoritesGET = (state: RootState) => cardsSliceReducer(state).myCardsFavorites
export const recommendedGET = (state: RootState) => cardsSliceReducer(state).recommended
// cardsSlice close

// categorySlice
export const categorySliceReducer = (state: RootState) => state.categorySliceReducer

export const categoryTreeGET = (state: RootState) => categorySliceReducer(state).categoryTree
export const categoryTreeListGET = (state: RootState) => categorySliceReducer(state).categoryTreeList
// categorySlice close

// favoritesSlice
export const favoritesSliceReducer = (state: RootState) => state.favoritesSliceReducer

export const favoriteListGET = (state: RootState) => favoritesSliceReducer(state).favoriteList
// favoritesSlice close
