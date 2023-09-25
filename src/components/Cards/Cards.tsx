import React, {CSSProperties, FC, useEffect, useState} from 'react';
import Card from "../UI/Card/Card";
import PlaceholderLoader from "../Placeholder/PlaceholderLoader";
import {ICard} from "../../Types/Card/ICard";

interface IProps {
    type?: 'favorites' | 'my-cards' | null;
    styleCardsList?: CSSProperties;
    cardsData: ICard[] | undefined;
    statusList: any;
    cardColumns?: 3;
}

const Cards: FC<IProps> = ({ type, styleCardsList, cardsData, statusList, cardColumns }) => {

    return (
        <div
            className={`cards-list ${cardColumns ? 'card-w33' : ''}`}
            style={styleCardsList}
        >
            {
                (statusList.isLoading && !statusList.isError)
                    ?
                    Array(5).fill('0').map((item, index) => (
                        <PlaceholderLoader
                            key={`cardPlaceholder ${item + index}`}
                            type="card"
                        />
                    ))
                    :
                    statusList.isSuccess
                        ?
                        cardsData &&
                        cardsData.map((card, indexCard) => (
                            <Card
                                key={card.uuid + indexCard}
                                card={card}
                                type={type}
                            />
                        ))
                        :
                        <>
                            {
                                statusList.isError && 'Ошибка загрузки'
                            }
                        </>

            }
        </div>
    );
};

export default React.memo(Cards);
