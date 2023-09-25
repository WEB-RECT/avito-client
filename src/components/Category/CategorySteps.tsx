import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../customHook/redux";
import {ICategoryItemTree, TUuid} from "../../Types/Types";
import {newObject} from "../../functions/object/newObject";
import Button from "../UI/Button/Button";
import Icons from "../UI/Icons/Icons";
import {categoryTreeGET, categoryTreeListGET} from "../../store/selectors";
import lodash from "lodash";

interface IProps {
    propsCategoryPath: TUuid[];
    getCategoryPath?: (value: TUuid[]) => void;
    getActiveCategoryPath?: (value: TUuid) => void;
}

const CategorySteps: FC<IProps> = ({ propsCategoryPath, getCategoryPath, getActiveCategoryPath }) => {

    const categoryTree = useAppSelector(categoryTreeGET)
    const categoryTreeList = useAppSelector(categoryTreeListGET)

    const [categoryPath, setCategoryPath] = useState<TUuid[]>(propsCategoryPath || [])
    const [activeCategoryPath, setActiveCategoryPath] = useState<TUuid>('')
    const [finishGettingCategory, setFinishGettingCategory] = useState<boolean>(false)
    const [currentListCategoryToPath, setCurrentListCategoryToPath] = useState<ICategoryItemTree[]>(categoryTree)

    useEffect(() => {
        if (Array.isArray(propsCategoryPath) && propsCategoryPath?.length > 0) {
            setCategoryPath(propsCategoryPath)
            findAndGetItemChildren(propsCategoryPath[propsCategoryPath.length - 1])
        }
    }, [propsCategoryPath])

    useEffect(() => {
        if (getCategoryPath && !lodash.isEqual(propsCategoryPath, categoryPath)) {
            getCategoryPath(categoryPath)
        }
    }, [categoryPath])

    useEffect(() => {
        if (getActiveCategoryPath) {
            getActiveCategoryPath(activeCategoryPath)
        }
    }, [activeCategoryPath])

    const findAndGetItemChildren = (itemUuid: TUuid, typeEnd?: boolean) => {
        const findToUuidCategoryTree = (children: ICategoryItemTree[]) => {
            if (children) {
                children.forEach(child => {
                    if (child.uuid === itemUuid) {
                        if (child.children.length === 0) {
                            setCurrentListCategoryToPath(children)
                            setActiveCategoryPath(itemUuid)
                        } else {
                            setCurrentListCategoryToPath(child.children)
                        }
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

        setCategoryPath(prev => {

            if (item.children.length > 0) {
                setActiveCategoryPath('')
                setCurrentListCategoryToPath(item.children)
                setFinishGettingCategory(false)
            } else {
                setActiveCategoryPath(item.uuid)
                setFinishGettingCategory(true)
            }

            const currentPrev: TUuid[] = newObject(prev)

            if (currentPrev[currentPrev.length - 2] === categoryTreeList[item.uuid].parentUuid) {
                currentPrev[currentPrev.length - 1] = item.uuid
            } else {
                currentPrev.push(item.uuid)
            }

            return [
                ...currentPrev
            ]
        })

    }

    const backStepCrumb = () => {
        if (categoryPath.length > 0) {

            setActiveCategoryPath('')
            setFinishGettingCategory(false)

            setCategoryPath(prev => {

                const currentPrev: TUuid[] = prev
                let newPrev: TUuid[] =  []

                if (finishGettingCategory) {
                    currentPrev.forEach((item, indexItem) => {
                        if (indexItem < currentPrev.length - 2) {
                            newPrev.push(item)
                        }
                    })
                } else {
                    currentPrev.forEach((item, indexItem) => {
                        if (indexItem < currentPrev.length - 1) {
                            newPrev.push(item)
                        }
                    })
                }

                const lastCurrentPrev = newPrev[newPrev.length - 1]

                if (lastCurrentPrev) {
                    findAndGetItemChildren(lastCurrentPrev)
                } else {
                    setCurrentListCategoryToPath(categoryTree)
                }

                return [
                    ...newPrev
                ]
            })

        }
    }

    return (
        <>
            <div className="category-steps max small">
                <div className="category-steps-items">
                    <Button
                        size="small"
                        buttonType="gray"
                        disabled={categoryPath.length === 0}
                        onClick={() => backStepCrumb()}
                    >
                        <Icons
                            iconType="arrowLeft"
                        />
                        <span>
                            Назад
                        </span>
                    </Button>

                    {
                        currentListCategoryToPath.map((item, indexItem: number) => (
                            <div
                                key={item.uuid + indexItem}
                                className={`item ${item.uuid === activeCategoryPath ? 'active' : ''}`}
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
                                    <Icons iconType="arrowRight" />
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default React.memo(CategorySteps);
