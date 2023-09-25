import React, {FC, useEffect, useState} from 'react';
import Header from "../components/Navigation/Header";
import Cards from "../components/Cards/Cards";
import Text from "../components/UI/Typography/Text";
import {useLazyGetCardsAPIQuery, useLazyGetCardToIdAPIQuery, useLazyGetFavoritesAPIQuery} from "../services/CardServices";
import {useActions, useAppSelector} from "../customHook/redux";
import ContainerElement from "../components/UI/ContainerElement/ContainerElement";
import {useParams, useNavigate} from "react-router-dom";
import {ICategoryItemList, ICategoryItemTree, ICurrentCategoryPathMain, TUuid} from "../Types/Types";
import CardView from "../components/UI/Card/CardView/CardView";
import Filters from "../components/Category/Category";
import {ICardDefault} from "../Types/Card/ICard";
import {categoryTreeGET, categoryTreeListGET, recommendedGET} from "../store/selectors";
import {dataValueList} from "../category/filters/fieldsParams";
import Category from "../components/Category/Category";

type ITypeToPath = 'category' | 'card-view' | 'main'

const Main: FC<any> = () => {

    const pathParams = useParams()
    const navigate = useNavigate();
    const { addFavoriteAllACTION, addRecommendedACTION } = useActions()

    const categoryTree = useAppSelector(categoryTreeGET)
    const categoryTreeList = useAppSelector(categoryTreeListGET)
    const recommended = useAppSelector(recommendedGET)

    const [limitCards, setLimitCards] = useState<number>(20)
    const [typeToPath, setTypeToPath] = useState<ITypeToPath>()
    const [cardViewData, setCardViewData] = useState<ICardDefault>({} as ICardDefault)
    const [currentCategoryPath, setCurrentCategoryPath] = useState<ICurrentCategoryPathMain>({} as ICurrentCategoryPathMain)

    const [getCardsAPI, getCardsAPIStatusList] = useLazyGetCardsAPIQuery()
    const [getCardToIdAPI] = useLazyGetCardToIdAPIQuery()
    const [getFavoritesAPI] = useLazyGetFavoritesAPIQuery()


    useEffect(() => {
        checkQueryParamsPath()
    }, [pathParams, categoryTree])


    const getCards = async () => {

        const result = await getCardsAPI({ limit: limitCards }).unwrap()
        const resultFavorites = await getFavoritesAPI('').unwrap()

        if (result.status && result.data) {
            addRecommendedACTION(result.data)
        }
        if (resultFavorites.status && resultFavorites.data) {
            addFavoriteAllACTION(resultFavorites.data)
        }
    }

    const checkQueryParamsPath = async () => {

        const getCurrentPathParams: string[] | undefined = (pathParams['*'] && pathParams['*']?.length > 0)
            ? pathParams['*']?.split('/')
            : []
        const currentPath: string[] = []
        const currentPathUuid: TUuid[] = []

        if (getCurrentPathParams && getCurrentPathParams.length > 0) {

            const clearParamsPath: string[] = []

            getCurrentPathParams.forEach(item => {
                if (item) {
                    clearParamsPath.push(item)
                }
            })

            const lastGetCurrentPathParams = clearParamsPath[clearParamsPath.length - 1].toString().toLowerCase()

            // если последний queryPath есть в категориях
            if (Object.values(categoryTreeList).find(it => it.type.toLowerCase() === lastGetCurrentPathParams )) {

                let currentCategoryTreeItem = categoryTree

                const findPath = (children: string[]) => {
                    if (children) {
                        children.forEach((child, index) => {
                            if (child) {
                                const treeItem = currentCategoryTreeItem.find((it) => it.type === child)

                                if (treeItem) {
                                    if (clearParamsPath.hasOwnProperty(index) && clearParamsPath[index].toLowerCase() === treeItem.type.toLowerCase()) {
                                        currentPath.push(clearParamsPath[index])
                                        currentPathUuid.push(treeItem.uuid)

                                        if (treeItem.children.length > 0) {

                                            const findToUuidCategoryTree = (children: ICategoryItemTree[]) => {
                                                if (children) {
                                                    children.forEach(child => {
                                                        if (child.uuid === treeItem.uuid) {
                                                            currentCategoryTreeItem = child.children
                                                        }

                                                        if (child.children.length > 0) {
                                                            findToUuidCategoryTree(child.children)
                                                        }
                                                    })
                                                }
                                            }
                                            findToUuidCategoryTree(currentCategoryTreeItem)
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
                findPath(clearParamsPath)

                setCurrentCategoryPath({
                    path: currentPath,
                    pathUuid: currentPathUuid
                })
                // проверека путь категории из queryPath
                // если нету то редирект на правильную категорию
                if (clearParamsPath.length === currentPath.length) {
                    setTypeToPath('category')
                    console.log('redirect в фильтры категорий')
                } else {
                    setTypeToPath('category')
                    console.log('redirect на парвильный путь в категорию')
                    // navigate(`/${pathParams.city}/${currentPath.join('/')}`)
                }
            } else {
                // редирект на карточку с полной информацией
                // 74
                const result = await getCardToIdAPI({ cardId: lastGetCurrentPathParams }).unwrap()

                if (result.status && result.data) {
                    setTypeToPath('card-view')
                    setCardViewData(result.data)
                }

            }

        } else {
            setTypeToPath('main')
            getCards()
        }

    }

    return (
        <>

            <Header />

            {
                typeToPath === 'main' &&
                <div className="cards">
                    <ContainerElement>
                        <Text
                            size={18}
                        >
                            Рекомендации
                        </Text>

                        <Cards
                            cardsData={recommended}
                            statusList={getCardsAPIStatusList}
                        />
                    </ContainerElement>
                </div>
            }
            {
                typeToPath === 'category' &&
                <Category
                    currentCategoryPath={currentCategoryPath}
                />
            }
            {
                typeToPath === 'card-view' &&
                <CardView
                    cardViewData={cardViewData}
                />
            }
        </>
    );
};

export default React.memo(Main);
