import React, {useEffect, useState} from 'react';
import Header from "../../../components/Navigation/Header";
import Text from "../../../components/UI/Typography/Text";
import Button from "../../../components/UI/Button/Button";
import Icons from "../../../components/UI/Icons/Icons";
import FieldsWrapper from "../../../components/Profile/FieldsWrapper/FieldsWrapper";
import {useAppSelector} from "../../../customHook/redux";
import {ICategoryItemTree, TUuid} from "../../../Types/Types";
import {newObject} from "../../../functions/object/newObject";
import {useParams} from "react-router-dom"
import {useLazyGetCardAPIQuery} from "../../../services/CardServices";
import ContainerElement from "../../../components/UI/ContainerElement/ContainerElement";
import {ICardDefault} from "../../../Types/Card/ICard";
import {categoryTreeGET, categoryTreeListGET} from "../../../store/selectors";

const AddItem = () => {

    const {uuid: cardUuid} = useParams()

    const [getCardAPI, {isLoading}] = useLazyGetCardAPIQuery()

    const categoryTree = useAppSelector(categoryTreeGET)
    const categoryTreeList = useAppSelector(categoryTreeListGET)

    const [crumbs, setCrumbs] = useState<string[]>([])
    const [currentListCategoryToPath, setCurrentListCategoryToPath] = useState<ICategoryItemTree[]>([])
    const [activeCrumb, setActiveCrumb] = useState<number>(0)
    const [finishGettingCategory, setFinishGettingCategory] = useState<boolean>(false)
    const [cardParamsToEdit, setCardParamsToEdit] = useState<ICardDefault>({} as ICardDefault)

    // записываем дефолтное значение или от текущего пути
    useEffect(() => {
        const lastCrumb = crumbs[crumbs.length - 1]

        if (crumbs.length > 0) {
            findAndGetItemChildren(lastCrumb)
        } else {
            setCurrentListCategoryToPath(categoryTree)
        }
    }, [crumbs])

    // получаем карточку для редактирования
    useEffect(() => {
        if (cardUuid) {
            const getCardFunc = async () => {

                const result = await getCardAPI({cardUuid}).unwrap()

                if (result.status && result.data) {
                    setCrumbs(result.data.category_path.split(', '))
                    setFinishGettingCategory(true)
                    setCardParamsToEdit(result.data)
                }
            }
            getCardFunc()
        }
    }, [cardUuid])

    const findAndGetItemChildren = (itemUuid: TUuid) => {
        const findToUuidCategoryTree = (children: ICategoryItemTree[]) => {
            if (children) {
                children.forEach(child => {

                    if (child.uuid === itemUuid) {
                        setCurrentListCategoryToPath(child.children)
                    }

                    if (child.children.length > 0) {
                        findToUuidCategoryTree(child.children)
                    }
                })
            }
        }
        findToUuidCategoryTree(categoryTree)
    }

    const changeCurrentCategory = (item: ICategoryItemTree) => {

        if (item.children.length > 0) {
            setActiveCrumb(crumbs.length)
            setFinishGettingCategory(false)
        } else {
            setFinishGettingCategory(true)
        }

        findAndGetItemChildren(item.uuid)

        setCrumbs(prev => {

            const currentPrev = newObject(prev)
            currentPrev.push(item.uuid)

            return [
                ...currentPrev
            ]
        })

    }

    const changeCrumb = (index: number) => {
        setCrumbs(prev => {

            const currentPrev = newObject(prev)
            const newPrev: string[] = []

            if (((currentPrev.length - 1) >= 0) && ((currentPrev.length - 1) === index)) {

                setActiveCrumb(index - 1)

                currentPrev.forEach((item: string, indexItem: number) => {
                    if (indexItem < index) {
                        newPrev.push(item)
                    }
                })

            } else {

                setActiveCrumb(index)

                currentPrev.forEach((item: string, indexItem: number) => {
                    if (indexItem <= index) {
                        newPrev.push(item)
                    }
                })

            }

            return [
                ...newPrev
            ]
        })

        setFinishGettingCategory(false)

    }

    const backStepCrumb = () => {

        const crumbLength = crumbs.length - 1

        if (crumbLength === 0) {
            setCurrentListCategoryToPath(categoryTree)
        }

        setActiveCrumb((crumbLength) - 1)

        setCrumbs(prev => {
            const currentPrev = prev
            currentPrev.splice(currentPrev.length - 1, 1)

            return [
                ...currentPrev
            ]
        })
    }

    return (
        <>

            <Header/>

            <div className="section-add-item">
                <ContainerElement>
                    <div className="crumbs">
                        <Text
                            size={18}
                            disabled={true}
                        >
                            Категории:&nbsp;
                        </Text>
                        {
                            crumbs.map((item, indexItem) => (
                                <Text
                                    key={item + indexItem}
                                    onClick={() => changeCrumb(indexItem)}
                                >
                                    {
                                        indexItem !== 0 &&
                                        <span>
                                            -
                                        </span>
                                    }
                                    {
                                        categoryTreeList[item].name
                                    }
                                </Text>
                            ))
                        }
                    </div>
                    {
                        !finishGettingCategory
                            ?
                            <div className="category-steps">
                                <div className="category-steps-items">
                                    {
                                        <Button
                                            size="small"
                                            buttonType="gray"
                                            onClick={() => backStepCrumb()}
                                            disabled={crumbs.length === 0}
                                        >
                                            <Icons
                                                iconType="arrowLeft"
                                            />
                                            <span>
                                                Назад
                                            </span>
                                        </Button>
                                    }
                                    {
                                        currentListCategoryToPath.map((item, indexItem: number) => (
                                            <div
                                                key={item.uuid + indexItem}
                                                className="item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();

                                                    changeCurrentCategory(item)
                                                }}
                                            >
                                                <span>
                                                    {
                                                        item.name
                                                    }
                                                </span>
                                                {
                                                    item.children.length > 0 &&
                                                    <Icons iconType="arrowRight"/>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            :
                            <FieldsWrapper
                                activeCrumb={crumbs[crumbs.length - 1]}
                                crumbs={crumbs}
                                cardParamsToEdit={cardParamsToEdit}
                            />
                    }

                </ContainerElement>
            </div>
        </>
    );
};

export default React.memo(AddItem);
