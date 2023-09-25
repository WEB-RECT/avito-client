import React from 'react';
import './Menu.scss'
import {useAppSelector} from "../../../../customHook/redux";
import {IMenuList} from "../../../../Types/Types";
import {NavLink} from 'react-router-dom'
import {authInfoGET} from "../../../../store/selectors";

export const menuList: IMenuList[] = [
    {
        name: 'Мои объявления',
        path: '/profile'
    },
    {
        name: 'Избранное',
        path: '/profile/favorites'
    },
    {
        name: 'Сообщения',
        path: '/profile/messenger'
    },
]

const Menu = () => {

    const authInfo = useAppSelector(authInfoGET)

    return (
        <div className="profile-menu">
            <div className="profile-menu-user">
                {
                    authInfo.name
                }
            </div>
            <div className="profile-menu-list">
                {
                    menuList.map((menu, indexMenu) => (
                        <NavLink
                            key={menu.name + indexMenu.toString()}
                            to={menu.path || ''}
                            className="item"
                            end
                        >
                            {
                                menu.name
                            }
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
};

export default Menu;
