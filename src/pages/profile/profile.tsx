import React, {useEffect, useState} from 'react';
import Header from "../../components/Navigation/Header";
import Menu from "../../components/UI/Profile/Menu/Menu";
import Text from "../../components/UI/Typography/Text";
import Cards from "../../components/Cards/Cards";
import {useGetMyCardsAPIMutation} from "../../services/CardServices";
import {useActions, useAppSelector} from "../../customHook/redux";
import ContainerElement from "../../components/UI/ContainerElement/ContainerElement";
import {myCardsGET} from "../../store/selectors";

const Profile = () => {

    const [getMyCardsAPI, getMyCardsAPIStatusList] = useGetMyCardsAPIMutation()

    const { addMyCardsListACTION } = useActions()

    const myCards = useAppSelector(myCardsGET)

    useEffect(() => {
        const getMyCardsFunc = async () => {

            const result = await getMyCardsAPI('').unwrap()

            if (result.status && result.data) {
                addMyCardsListACTION(result.data)
            }

        }
        getMyCardsFunc()
    }, [])

    return (
        <>
            <Header />

            <ContainerElement>

                <div className="section-profile">
                    <div className="left">

                        <Menu/>

                    </div>
                    <div className="right">

                        <Text
                            size={18}
                        >
                            Мои объявления
                        </Text>

                        <Cards
                            type="my-cards"
                            cardsData={myCards}
                            statusList={getMyCardsAPIStatusList}
                            cardColumns={3}
                        />

                    </div>
                </div>

            </ContainerElement>
        </>
    );
};

export default Profile;
