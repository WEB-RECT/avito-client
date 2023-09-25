import React, {FC, useEffect, useMemo, useState} from 'react';
import "../../styles/category/categoryMain.scss"
import Text from "../UI/Typography/Text";
import {useAppSelector} from "../../customHook/redux";
import {categoryTreeGET, categoryTreeListGET, cityDataGET, cityGET} from "../../store/selectors";
import {ICategoryItemList, TUuid} from "../../Types/Types";
import {Link} from "react-router-dom";
import {ICityDefault} from "../../Types/User/IUser";

interface IMenuListContentKey extends ICategoryItemList {
    children: ICategoryItemList[]
    path: string
}

interface IMenuListContent {
    [key: TUuid]: IMenuListContentKey
}

interface IProps {
    onCloseModal: () => void
}

const CategoryMain: FC<IProps> = ({ onCloseModal }) => {

    const city = useAppSelector(cityGET)
    const categoryTreeList = useAppSelector(categoryTreeListGET)

    const [menuList, setMenuList] = useState<ICategoryItemList[]>([])
    const [menuListContent, setMenuListContent] = useState<IMenuListContent>({} as IMenuListContent)
    const [activeMenuList, setActiveMenuList] = useState<ICategoryItemList>({} as ICategoryItemList)

    // получаем родительские категории и ставим активный
    useEffect(() => {
        const currentMenu: ICategoryItemList[] = []

        Object.values(categoryTreeList).forEach((item) => {
            if (item.parentUuid === null) {
                currentMenu.push(item)
            }
        })

        setMenuList(currentMenu)
        setActiveMenuList(currentMenu[0])
    }, [categoryTreeList])

    // получаем нужные категории от активной категории
    useEffect(() => {
        if (activeMenuList.type) {
            const currentMenuListContent: IMenuListContent = {} as IMenuListContent

            const findChildren = (item: ICategoryItemList, currentPath: string): ICategoryItemList[]  => {
                const data: ICategoryItemList[] = []

                Object.keys(categoryTreeList).map((key) => {
                    if (categoryTreeList[key].parentUuid === item.uuid) {
                        const obj = {
                            ...categoryTreeList[key],
                            path: currentPath + `/${categoryTreeList[key].type}`
                        }
                        data.push(obj)
                    }
                })

                return data
            }

            Object.keys(categoryTreeList).forEach((key: TUuid) => {
                if (categoryTreeList[key].parentUuid === activeMenuList.uuid) {
                    const currentPath = `/${city.en.toLowerCase()}/${activeMenuList.type}/${categoryTreeList[key].type}`

                    currentMenuListContent[key] = {
                        ...categoryTreeList[key],
                        children: findChildren(categoryTreeList[key], currentPath),
                        path: currentPath
                    }
                }
            })


            setMenuListContent(currentMenuListContent)
        }
    }, [activeMenuList, city])

    return (
        <>
            <div className="category-main">
                <div className="category-main-menu">
                    {
                        menuList.map((menu) => (
                            <div
                                key={menu.type + menu.uuid + 'category'}
                                className={`category-main-menu-item ${activeMenuList.type === menu.type ? 'active' : ''}`}
                                onClick={() => setActiveMenuList(menu)}
                            >
                                {
                                    menu.name
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="category-main-content">
                    <Link
                        to={`/${city.en.toLowerCase()}/${activeMenuList.type}`}
                        onClick={onCloseModal}
                    >
                        <Text
                            size={20}
                            weight={600}
                            style={{
                                marginBottom: 30
                            }}
                        >
                            {
                                activeMenuList.name
                            }
                        </Text>
                    </Link>
                    <div className="category-main-content-wrapper">
                        {
                            Object.values(menuListContent).map((item) => (
                                <div
                                    key={item.uuid + item.type + 'col category'}
                                    className="col"
                                >
                                    <Link
                                        to={item.path}
                                        onClick={onCloseModal}
                                    >
                                        <Text
                                            size={18}
                                            weight={600}
                                            style={{
                                                marginBottom: 20
                                            }}
                                        >
                                            {
                                                item.name
                                            }
                                        </Text>
                                    </Link>
                                    {
                                        item.children.map((child) => (
                                            <Link
                                                key={child.type + child.uuid + 'child col category'}
                                                to={child.path}
                                                onClick={onCloseModal}
                                            >
                                                <Text
                                                    size={14}
                                                    style={{
                                                        marginBottom: 10
                                                    }}
                                                >
                                                    {
                                                        child.name
                                                    }
                                                </Text>
                                            </Link>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(CategoryMain);