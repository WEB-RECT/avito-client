import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {bindActionCreators} from "@reduxjs/toolkit";
import {userSliceActions} from "../store/user.slice";
import {favoritesSliceActions} from "../store/favorites.slice";
import {cardsSliceActions} from "../store/cards.slice";
import {categorySliceActions} from "../store/category.slice";

const actions = {
    ...userSliceActions,
    ...favoritesSliceActions,
    ...cardsSliceActions,
    ...categorySliceActions,
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
