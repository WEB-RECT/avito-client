import {configureStore} from "@reduxjs/toolkit";
import {userAPI} from "../services/UserServices";
import {userSliceReducer} from "./user.slice";
import {cardAPI} from "../services/CardServices";
import {favoritesSliceReducer} from "./favorites.slice";
import {cardsSliceReducer} from "./cards.slice";
import {categorySliceReducer} from "./category.slice";
import {imagesAPI} from "../services/ImagesServices";
import {MessengerServicesAPI} from "../services/MessengerServices";

export const store = configureStore({
    reducer: {
        userSliceReducer,
        favoritesSliceReducer,
        cardsSliceReducer,
        categorySliceReducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [cardAPI.reducerPath]: cardAPI.reducer,
        [imagesAPI.reducerPath]: imagesAPI.reducer,
        [MessengerServicesAPI.reducerPath]: MessengerServicesAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(userAPI.middleware)
        .concat(cardAPI.middleware)
        .concat(imagesAPI.middleware)
        .concat(MessengerServicesAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>