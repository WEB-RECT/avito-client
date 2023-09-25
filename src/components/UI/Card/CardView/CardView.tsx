import React, {FC, useContext, useEffect, useState} from 'react';
import Header from "../../../Navigation/Header";
import ContainerElement from "../../ContainerElement/ContainerElement";
import Text from "../../Typography/Text";
import './CardView.scss'
import Button from "../../Button/Button";
import ImagesSlider from "../../Images/ImagesSlider";
import Icons from "../../Icons/Icons";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {useGetCardsAPIQuery, useLazyGetCardAPIQuery} from "../../../../services/CardServices";
import {useActions, useAppSelector} from "../../../../customHook/redux";
import Cards from "../../../Cards/Cards";
import Crumbs from "../../Crumbs/Crumbs";
import IsFavorite from "../../../Favorites/IsFavorite";
import {dataDynamicTypesToFields, fieldsAddItem} from "../../../../category/addItem/fieldsAddItem";
import {dataValueList, paramsToFields} from "../../../../category/addItem/paramsToFields";
import IMG_NoPhoto from "../../../../assets/images/no_photo.png"
import {useCreateChanelAPIMutation} from "../../../../services/MessengerServices";
import {ICreateChanelAPIBody} from "../../../../Types/Services/IMessengerServices";
import {useNavigate} from 'react-router-dom'
import {ICardDefault} from "../../../../Types/Card/ICard";
import {authInfoGET, categoryTreeListGET, recommendedGET} from "../../../../store/selectors";
import {AuthContext} from "../../../Auth/Auth";

interface IDefaultParams {
    pathContent: {
        label: string,
        crumbs: string[],
    },
    startContent: {
        label: string;
        name: string;
        photos: string[];
        cardUuid: string;
    },
    descriptionContent: {
        label: string;
        description: string;
    },
    locationContent: {
        label: string;
        address: string;
        addressCoords: number[];
    },
}
interface IDefaultParamsContact {
    price: string;
    phone: string;
    userUuid: string;
}

type TDynamicParamsChildren = {
    bold: string;
    text: string;
}

interface IDynamicParams {
    [key: string]: {
        label: string;
        children: TDynamicParamsChildren[]
    }
}

interface IProps {
    cardViewData: ICardDefault;
}

const CardView: FC<IProps> = ({ cardViewData }) => {

    const {sessionAuth} = useContext(AuthContext)

    const { addFavoriteAllACTION, addRecommendedACTION } = useActions()
    const navigate = useNavigate()

    const categoryTreeList = useAppSelector(categoryTreeListGET)
    const recommended = useAppSelector(recommendedGET)
    const authInfo = useAppSelector(authInfoGET)

    const [visiblePhone, setVisiblePhone] = useState<boolean>(false)
    const [limitCards, setLimitCards] = useState<number>(20)
    const [defaultParams, setDefaultParams] = useState<IDefaultParams>({} as IDefaultParams)
    const [defaultParamsContact, setDefaultParamsContact] = useState<IDefaultParamsContact>({} as IDefaultParamsContact)
    const [dynamicParams, setDynamicParams] = useState<IDynamicParams>({} as IDynamicParams)

    const getCardsAPI = useGetCardsAPIQuery({ limit: limitCards })
    const [createChanelAPI, createChanelAPIStatus] = useCreateChanelAPIMutation()

    useEffect(() => {
        if (getCardsAPI.isSuccess && getCardsAPI.data.data) {
            addRecommendedACTION(getCardsAPI.data.data)
        }
        if (getCardsAPI.isSuccess && getCardsAPI.data.dataFavorites) {
            addFavoriteAllACTION(getCardsAPI.data.dataFavorites)
        }
    }, [getCardsAPI, getCardsAPI.isSuccess])

    useEffect(() => {
        if (cardViewData) {

            const dataParams = cardViewData.params

            const categoryPath = cardViewData.category_path.split(', ')
            categoryPath.splice(0, 1)
            categoryPath.push(dataParams.advertisement.name)

            let currentDynamicParams: IDynamicParams = {} as IDynamicParams

            setDefaultParams({
                pathContent: {
                    label: 'Категории',
                    crumbs: categoryPath,
                },
                startContent: {
                    label: 'Название',
                    name: dataParams.advertisement.name,
                    photos: cardViewData.images_url.data,
                    cardUuid: cardViewData.uuid,
                },
                descriptionContent: {
                    label: 'Описание',
                    description: dataParams.advertisement.description_of_the_transaction,
                },
                locationContent: {
                    label: 'Расположение',
                    address: dataParams.location.address,
                    addressCoords: dataParams.location.address_info.coords,
                },
            })
            setDefaultParamsContact({
                price: dataParams.advertisement.price,
                phone: dataParams.contacts.phone,
                userUuid: cardViewData.user_uuid,
            })

            // получение из категорий параметров и совмещение с текущими
            Object.keys(dataParams).forEach((key, indexKey) => {
                if (dataDynamicTypesToFields.find(dynamicType => dynamicType === key)) {

                    const dataParamsKey = dataParams[key]
                    const getCategoryToType = categoryTreeList[categoryPath[categoryPath.length - 2]]

                    // поиск title field от type
                    if (fieldsAddItem[getCategoryToType.type]) {
                        fieldsAddItem[getCategoryToType.type].forEach(categoryItem => {
                            if (key === categoryItem.type) {

                                currentDynamicParams[key] = {
                                    label: categoryItem.title,
                                    children: []
                                }

                            }
                        })
                    }

                    paramsToFields.forEach(fieldItem => {
                        Object.keys(dataParamsKey).forEach(paramsChildKey => {
                            if (paramsChildKey === fieldItem.type) {

                                const currentValue: string | string[] = dataParamsKey[paramsChildKey]

                                let newValue: string[] = []

                                // поиск value среди valueList из paramsToField
                                if (currentValue) {
                                    if (dataValueList.hasOwnProperty(fieldItem.type)) {
                                        if (Array.isArray(currentValue)) {
                                            currentValue.forEach(item => {
                                                dataValueList[fieldItem.type].forEach((valueList) => {
                                                    if (valueList.type === item) {
                                                        newValue.push(valueList.name)
                                                    }
                                                })
                                            })
                                        } else {
                                            dataValueList[fieldItem.type].forEach(it => {
                                                if (it.type === currentValue) {
                                                    newValue.push(it.name)
                                                }
                                            })
                                        }
                                    } else {
                                        newValue = Array.isArray(currentValue) ? currentValue : [currentValue]
                                    }

                                    currentDynamicParams[key].children.push({
                                        bold: fieldItem.label,
                                        text: newValue.join(', '),
                                    })
                                }

                            }
                        })
                    })
                }
            })

            setDynamicParams(currentDynamicParams)
        }
    }, [cardViewData])


    const createChannel = async () => {
        const params: ICreateChanelAPIBody = {
            dateUnix: Date.now(),
            usersUuid: [authInfo.uuid, defaultParamsContact.userUuid],
            cardUuid: cardViewData.uuid,
            authorUuid: authInfo.uuid,
        }

        const result = await createChanelAPI(params).unwrap()

        if (result.status) {
            navigate('/profile/messenger')
        }
    }

    return (
        <>
            <div className="card-view">
                <ContainerElement>

                    {
                        defaultParams.pathContent?.crumbs &&
                        <Crumbs
                            propsCategoryPath={defaultParams.pathContent.crumbs}
                        />
                    }

                    <div className="card-view-wrapper mt-0">
                        <div className="content-list">
                            <div className="content block-shadow">
                                <div className="content-top">
                                    <Text
                                        size={18}
                                    >
                                        {
                                            defaultParams.startContent?.name
                                        }
                                    </Text>
                                    <div className="add-favorite">

                                        <IsFavorite
                                            cardUuid={cardViewData.uuid}
                                        />

                                    </div>
                                </div>

                                {
                                    defaultParams.startContent?.photos.length > 0
                                        ?
                                        <ImagesSlider
                                            imagesList={defaultParams.startContent?.photos}
                                        />
                                        :
                                        <div className="content-img-not">
                                            <img src={IMG_NoPhoto} alt=""/>
                                        </div>

                                }

                            </div>
                            {
                                dynamicParams &&
                                Object.values(dynamicParams).map((item, indexItem) => (
                                    <div
                                        key={item.label + indexItem}
                                        className="content block-shadow"
                                    >
                                        <div className="content-top">
                                            <Text
                                                size={18}
                                            >
                                                {
                                                    item.label
                                                }
                                            </Text>
                                        </div>
                                        <div className="content-params">
                                            {
                                                item.children &&
                                                item.children.map((child, indexChild) => (
                                                    <div
                                                        key={child.bold + indexChild}
                                                        className="item"
                                                    >
                                                        <span>{child.bold}:</span> {child.text}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="content block-shadow">
                                <div className="content-top column">
                                    <Text
                                        size={18}
                                    >
                                        {
                                            defaultParams.descriptionContent?.label
                                        }
                                    </Text>
                                </div>
                                <Text>
                                    {
                                        defaultParams.descriptionContent?.description
                                    }
                                </Text>
                            </div>
                            <div className="content block-shadow">
                                <div className="content-top column">
                                    <Text
                                        size={18}
                                    >
                                        {
                                            defaultParams.locationContent?.label
                                        }
                                    </Text>
                                </div>
                                <Text>
                                    {
                                        defaultParams.locationContent?.address
                                    }
                                </Text>
                                <YMaps>
                                    <Map
                                        defaultState={{ center: [55.75, 37.57], zoom: 13 }}
                                        style={{
                                            marginTop: '20px',
                                            width: '100%',
                                            height: '300px',
                                            borderRadius: '5px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Placemark
                                            geometry={defaultParams.locationContent?.addressCoords}
                                        />
                                    </Map>
                                </YMaps>
                            </div>
                        </div>
                        <div className="info-list">
                            <div className="info block-shadow">
                                <Text
                                    size={18}
                                >
                                    {
                                        defaultParamsContact?.price + 'Р'
                                    }
                                </Text>
                                {
                                    visiblePhone
                                        ?
                                        <a
                                            href={`tel:${defaultParamsContact?.phone}`}
                                            style={{
                                                marginBottom: '10px',
                                                display: 'block'
                                            }}
                                        >
                                            <Button
                                                size="small"
                                            >
                                                {
                                                    defaultParamsContact?.phone
                                                }
                                            </Button>
                                        </a>
                                        :
                                        <Button
                                            size="small"
                                            onClick={() => setVisiblePhone(true)}
                                        >
                                            Показать номер
                                        </Button>
                                }
                                <Button
                                    size="small"
                                    buttonType="gray"
                                    onClick={() => createChannel()}
                                    disabled={!sessionAuth}
                                >
                                    Написать продавцу
                                </Button>
                            </div>
                        </div>
                    </div>
                </ContainerElement>
            </div>
            <div className="cards">
                <ContainerElement>

                    <Text
                        size={18}
                    >
                        Рекомендации
                    </Text>

                    <Cards
                        cardsData={recommended}
                        statusList={getCardsAPI}
                    />

                </ContainerElement>
            </div>
        </>
    );
};

export default React.memo(CardView);
