import React, {FC, useEffect, useState} from 'react';
import './Card.scss'
import Text from "../Typography/Text";
import IMG_NoPhoto from "../../../assets/images/no_photo.png"
import {timeConvert} from "../../../functions/date/timeConvert";
import Icons from "../Icons/Icons";
import {useAddFavoritesAPIMutation, useRemoveFavoriteAPIMutation, useDeleteCardAPIMutation, useChangePublishedAPIMutation} from "../../../services/CardServices";
import {useActions, useAppSelector} from "../../../customHook/redux";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import DropdownTop from "../Dropdown/DropdownTop/DropdownTop";
import DropdownDrop from "../Dropdown/DropdownDrop/DropdownDrop";
import {useNavigate} from "react-router-dom";
import {Link} from 'react-router-dom'
import IsFavorite from "../../Favorites/IsFavorite";
import {ICard} from "../../../Types/Card/ICard";
import {categoryTreeListGET} from "../../../store/selectors";

interface IProps {
    card: ICard;
    type?: string | null | undefined;
}


type TListItemsMore = {
    name: string;
    type: string;
}

const listItemsMore: TListItemsMore[] = [
    {
        name: "Редактировать",
        type: "edit",
    },
    {
        name: "Удалить",
        type: "delete",
    },
]

const Card: FC<IProps> = ({card, type}) => {

    const [deleteCardAPI] = useDeleteCardAPIMutation()
    const [changePublishedAPI, changePublishedAPIStatusList] = useChangePublishedAPIMutation()

    const navigate = useNavigate()
    const { changeMyCardACTION, deleteMyCardACTION } = useActions()

    const categoryTreeList = useAppSelector(categoryTreeListGET)

    const [activeImgList, setActiveImgList] = useState<number>(0)

    const changeImgActive = (index: number):void => {
        setActiveImgList(index)
    }

    const changeCard = async (type: string) => {
        if (type === 'edit') {
            navigate(`/profile/addItem/${card.uuid}`)
        }
        if (type === 'delete') {

            const result = await deleteCardAPI({ cardUuid: card.uuid }).unwrap()

            if (result.status) {
                deleteMyCardACTION(card.uuid)
            }
        }
    }

    const changePublished = async () => {

        const currentBody = {
            cardUuid: card.uuid,
            status: !card.published,
        }

        const result = await changePublishedAPI(currentBody).unwrap()

        if (result.status && result.data) {
            changeMyCardACTION(result.data[0])
        }

    }

    const getPath = (categoryPath: string): string => {

        const categoryPathArr: string[] = categoryPath.split(', ')

        const currentPath: string[] = []

        categoryPathArr.forEach(item => {
            currentPath.push(categoryTreeList[item].type.toLowerCase())
        })

        return currentPath.join('/')
    }

    return (
        <div className="card">
            <Link
                to={`/${card.city.en.toLowerCase()}/${getPath(card.category_path)}/${card.id}`}
                className="card-img"
                onMouseLeave={() => changeImgActive(0)}
            >
                {
                    card.images_url.length > 0
                        ?
                        <>
                            <div className="card-img-list">
                                {
                                    card.images_url.map((item, indexItem) => (
                                        (activeImgList === indexItem) &&
                                        <img
                                            key={item + indexItem + 'img-card'}
                                            src={item}
                                        />
                                    ))
                                }
                            </div>
                            {
                                card.images_url.length > 1 &&
                                <div className="card-img-bullets">
                                    {
                                        card.images_url.map((item, indexItem) => (
                                            <div
                                                key={item + indexItem + 'img-card'}
                                                className={`card-img-bullets-item ${activeImgList === indexItem ? 'card-img-bullets-item--active' : ''}`}
                                                onMouseEnter={() => changeImgActive(indexItem)}
                                            >
                                                <div className="card-img-bullets-item-border">

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </>
                        :
                        <img
                            src={IMG_NoPhoto}
                        />
                }
            </Link>
            <div className="card-info-text">
                <div className="card-title">
                    <Text
                        ellipsis="row"
                    >
                        {card.name}
                    </Text>
                    {
                        type !== 'my-cards'
                            ?
                            <IsFavorite
                                cardUuid={card.uuid}
                            />
                            :
                            ''
                    }
                </div>
                <div className="card-price">
                    <Text
                        ellipsis="row"
                    >
                        {card.price} ₽
                    </Text>
                </div>
                <div className="card-map">
                    <Text
                        ellipsis="column-2"
                    >
                        {card.address.replace('Россия, ', '')}
                    </Text>
                </div>
                <div className="card-time">
                    <Text
                        ellipsis="row"
                    >
                        {
                            timeConvert(card.dateUnix)
                        }
                    </Text>
                </div>
            </div>
            {
                type === 'my-cards'
                    ?
                    <div className="card-event">
                        <div className="card-event-info">
                            <div className="item">
                                <Icons
                                    iconType="visible"
                                />
                                <Text>
                                    {
                                        card.cardVisible
                                    }
                                </Text>
                            </div>
                            <div className="item">
                                <Icons
                                    iconType="favorite"
                                />
                                <Text>
                                    {
                                        card.favoritesCount
                                    }
                                </Text>
                            </div>
                        </div>
                        <div className="card-event-row">
                            <Button
                                size="small"
                                onClick={() => changePublished()}
                                disabled={changePublishedAPIStatusList.isLoading}
                            >
                                {
                                    card.published
                                        ?
                                        'Снять с публикации'
                                        :
                                        'Опубликовать'
                                }
                            </Button>
                            <Dropdown
                                position="bottom-right"
                            >
                                <DropdownTop
                                    style={{ minWidth: 'auto' }}
                                >
                                    <div className="card-event-row-settings">
                                        <Icons
                                            iconType="more"
                                        />
                                    </div>
                                </DropdownTop>
                                <DropdownDrop>
                                    {
                                        listItemsMore.map((item, indexItem) => (
                                            <div
                                                key={item.type + indexItem.toString()}
                                                className="item-drop"
                                                onClick={() => changeCard(item.type)}
                                                data-close-dropdown-to-click="true"
                                            >
                                                {
                                                    item.name
                                                }
                                            </div>
                                        ))
                                    }
                                </DropdownDrop>
                            </Dropdown>
                        </div>
                    </div>
                    :
                    ''
            }
        </div>
    );
};

export default React.memo(Card);
