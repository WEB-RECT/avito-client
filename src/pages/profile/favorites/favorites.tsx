import React, {useEffect, useState} from 'react';
import Header from "../../../components/Navigation/Header";
import Menu from "../../../components/UI/Profile/Menu/Menu";
import Cards from "../../../components/Cards/Cards";
import Text from "../../../components/UI/Typography/Text";
import {
    useGetCardsToFavoritesAPIQuery,
    useGetFavoritesAPIQuery,
} from "../../../services/CardServices";
import {useActions, useAppSelector} from "../../../customHook/redux";
import ContainerElement from "../../../components/UI/ContainerElement/ContainerElement";
import {myCardsFavoritesGET} from "../../../store/selectors";

const Favorites = () => {

    const getCardsToFavoritesAPI = useGetCardsToFavoritesAPIQuery('')

    const { addFavoriteAllACTION, addMyCardsFavoritesACTION } = useActions()

    const myCardsFavorites = useAppSelector(myCardsFavoritesGET)

    useEffect(() => {
        if (getCardsToFavoritesAPI.isSuccess && getCardsToFavoritesAPI.data.data) {
            addMyCardsFavoritesACTION(getCardsToFavoritesAPI.data.data)
        }
        if (getCardsToFavoritesAPI.isSuccess && getCardsToFavoritesAPI.data.dataFavorites) {
            addFavoriteAllACTION(getCardsToFavoritesAPI.data.dataFavorites)
        }
    }, [getCardsToFavoritesAPI, getCardsToFavoritesAPI.isSuccess])

    return (
        <>

            <Header/>

            <ContainerElement>
                <div className="section-profile">
                    <div className="left">

                        <Menu/>

                    </div>
                    <div className="right">

                        <Text
                            size={18}
                        >
                            Избранные
                        </Text>

                        <Cards
                            type="favorites"
                            cardsData={myCardsFavorites}
                            statusList={getCardsToFavoritesAPI}
                            cardColumns={3}
                        />

                    </div>
                </div>
            </ContainerElement>
        </>
    );
};

export default Favorites;
