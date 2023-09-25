import React, {FC, useEffect, useState} from 'react';
import ContainerElement from "../UI/ContainerElement/ContainerElement";
import "../../styles/category/category.scss"
import "../../styles/filters/filters.scss"
import {filterFieldParams} from "../../category/filters/fieldsParams";
import {ICurrentCategoryPathMain, IFilterFieldParams, TUuid} from "../../Types/Types";
import Input from "../UI/Form/Input/Input";
import RadioRow from "../UI/Form/RadioRow/RadioRow";
import CheckboxList from "../UI/Form/CheckboxList/CheckboxList";
import Cards from "../Cards/Cards";
import {useLazyGetCardsAPIQuery, useLazyGetFavoritesAPIQuery} from "../../services/CardServices";
import {useActions, useAppSelector} from "../../customHook/redux";
import Button from "../UI/Button/Button";
import CategorySteps from "./CategorySteps";
import Crumbs from "../UI/Crumbs/Crumbs";
import {recommendedGET} from "../../store/selectors";

interface IProps {
    currentCategoryPath: ICurrentCategoryPathMain;
}

const Category: FC<IProps> = ({ currentCategoryPath }) => {

    const { addFavoriteAllACTION, addRecommendedACTION } = useActions()

    const recommended = useAppSelector(recommendedGET)

    const [getCardsAPI, getCardsAPIStatusList] = useLazyGetCardsAPIQuery()
    const [getFavoritesAPI] = useLazyGetFavoritesAPIQuery()

    const [fieldsParams, setFieldsParams] = useState<IFilterFieldParams[]>([] as IFilterFieldParams[])
    const [limitCards, setLimitCards] = useState<number>(20)
    const [crumbs, setCrumbs] = useState<TUuid[]>([])

    useEffect(() => {
        if (currentCategoryPath) {
            const lastPath = currentCategoryPath.pathUuid[currentCategoryPath.pathUuid.length - 1]
            const params = filterFieldParams[lastPath]

            setFieldsParams(params)
            setCrumbs(currentCategoryPath.pathUuid)
        }
    }, [currentCategoryPath])

    useEffect(() => {
        const lastPath = crumbs[crumbs.length - 1]
        const params = filterFieldParams[lastPath] || lastPath && filterFieldParams['DEFAULT'] || []

        setFieldsParams(params)
    }, [crumbs])

    useEffect(() => {
        getCards()
    }, [])

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

    return (
        <div className="cards">
            <ContainerElement>

                <Crumbs
                    propsCategoryPath={crumbs}
                    getCategoryPath={(value) => setCrumbs(value)}
                />

                <div className="category-wrapper">
                    <div className="filters">

                        <CategorySteps
                            propsCategoryPath={crumbs}
                            getCategoryPath={(value) => setCrumbs(value)}
                        />

                        {
                            fieldsParams?.length > 0 &&
                            fieldsParams.map((params, indexParams) => (
                                <div
                                    key={params.type + indexParams}
                                    className="filters-field"
                                >
                                    <div className="filters-field-label">
                                        {
                                            params.label
                                        }
                                    </div>
                                    <div className="filters-field-content">
                                        <div className="filters-field-content-row">
                                            {
                                                params.widget.map((widget, indexWidget) => (
                                                    <React.Fragment key={widget.type + indexWidget}>
                                                        {
                                                            (widget.type === 'input') &&
                                                            <Input
                                                                defaultValue={widget.input?.defaultValue}
                                                                placeholder={widget.input?.placeholder}
                                                                sizeInput="small"
                                                            />
                                                        }
                                                    </React.Fragment>
                                                ))
                                            }
                                        </div>
                                        {
                                            params.widget.map((widget, indexWidget) => (
                                                <React.Fragment key={widget.type + indexWidget}>
                                                    {
                                                        (widget.type === 'radio') &&
                                                        <RadioRow
                                                            items={widget.radio?.valueList}
                                                            defaultValue={widget.radio?.defaultValueType}
                                                        />
                                                    }
                                                    {
                                                        (widget.type === 'checkboxList') &&
                                                        <CheckboxList
                                                            defaultValue={widget.checkboxList?.defaultValueType}
                                                            items={widget.checkboxList?.valueList}
                                                            sizeCheckbox="small"
                                                        />
                                                    }
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        <div className="button-wrapper">
                            <Button>
                                Показать объявления
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Cards
                            cardsData={recommended}
                            statusList={getCardsAPIStatusList}
                            cardColumns={3}
                        />
                    </div>
                </div>
            </ContainerElement>
        </div>
    );
};

export default React.memo(Category);
