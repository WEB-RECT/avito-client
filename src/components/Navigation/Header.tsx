import React, {FC, useContext, useEffect, useState} from 'react';
import Button from "../UI/Button/Button";
import Text from "../UI/Typography/Text";
import {
    Link, NavLink, useNavigate,
} from 'react-router-dom';
import {useActions, useAppSelector} from "../../customHook/redux";
import {AuthContext} from "../Auth/Auth";
import DropdownDrop from "../UI/Dropdown/DropdownDrop/DropdownDrop";
import Dropdown from "../UI/Dropdown/Dropdown";
import DropdownTop from "../UI/Dropdown/DropdownTop/DropdownTop";
import {menuList} from "../UI/Profile/Menu/Menu";
import {IMenuList} from "../../Types/Types";
import {authInfoGET, cityGET} from "../../store/selectors";
import Icons from "../UI/Icons/Icons";
import Modal from "../UI/Modal/Modal";
import City from "../City/City";
import CategoryMain from "../Category/CategoryMain";
import {useLazyGetAllCityAPIQuery} from "../../services/UserServices";

const menuListHeader: IMenuList[] = [
    ...menuList,
    {
        name: 'Выйти',
    },
]

const Header = () => {

    const {
        changeCityDataACTION,
    } = useActions()

    const navigate = useNavigate();

    const { sessionAuth, logOut } = useContext(AuthContext)

    const [getAllCityAPI, getAllCityAPIStatus] = useLazyGetAllCityAPIQuery()

    const authInfo= useAppSelector(authInfoGET)
    const city = useAppSelector(cityGET)

    const [isActiveCityModal, setIsActiveCityModal] = useState<boolean>(false)
    const [isActiveCategoryModal, setIsActiveCategoryModal] = useState<boolean>(false)

    // получение городов
    useEffect(() => {
        const getData = async () => {
            const res = await getAllCityAPI('').unwrap()

            if (res.status && res.data) {
                changeCityDataACTION(res.data)
            }
        }
        getData()
    }, [])

    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="header-left">
                        <Text
                            tag="span"
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            logo
                        </Text>

                        <Text
                            weight={600}
                            style={{
                                marginLeft: 30,
                                marginRight: 30,
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                setIsActiveCityModal(!isActiveCityModal)
                            }}
                        >
                            {
                                city.ru
                            }
                        </Text>

                        <Button
                            size="small"
                            onClick={() => {
                                setIsActiveCategoryModal(!isActiveCategoryModal)
                            }}
                        >
                            Категории
                        </Button>
                    </div>
                    <div className="header-row">
                        {
                            sessionAuth
                                ?
                                <>
                                    <div className="header-row-user">
                                        <Dropdown
                                            position="bottom-right"
                                        >
                                            <DropdownTop
                                                style={{ minWidth: 'auto' }}
                                            >
                                                <div className="header-row-user-top">
                                                <span>
                                                    {
                                                        authInfo.email
                                                    }
                                                </span>
                                                    <Icons
                                                        iconType="arrowDown"
                                                    />
                                                </div>
                                            </DropdownTop>
                                            <DropdownDrop>
                                                <div className="header-row-user-drop">
                                                    {
                                                        menuListHeader.map((menu, indexMenu) => (
                                                            <React.Fragment
                                                                key={menu.name + indexMenu.toString()}
                                                            >
                                                                {
                                                                    menu.name === 'Выйти'
                                                                        ?
                                                                        <>
                                                                            <hr />
                                                                            <div
                                                                                className="item"
                                                                                onClick={() => {
                                                                                    if (menu.name === 'Выйти') {
                                                                                        logOut()
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {
                                                                                    menu.name
                                                                                }
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <NavLink
                                                                            to={menu.path || ''}
                                                                            className="item"
                                                                            end
                                                                        >
                                                                            {
                                                                                menu.name
                                                                            }
                                                                        </NavLink>
                                                                }
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </div>
                                            </DropdownDrop>
                                        </Dropdown>
                                        <Link to="/profile/addItem">
                                            <Button
                                                size="small"
                                            >
                                                Разместить объявление
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                                :
                                <>
                                    <Link to="/login">
                                        <Button
                                            size="small"
                                        >
                                            Войти
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button
                                            size="small"
                                        >
                                            Зарегестрироваться
                                        </Button>
                                    </Link>
                                </>
                        }
                    </div>
                </div>
            </div>

            <Modal
                label="Список городов"
                isOpen={isActiveCityModal}
                onClickOverlay={() => setIsActiveCityModal(!isActiveCityModal)}
            >
                <City
                    onCloseModal={() => setIsActiveCityModal(!isActiveCityModal)}
                />
            </Modal>
            <Modal
                isOpen={isActiveCategoryModal}
                label="Категории"
                onClickOverlay={() => setIsActiveCategoryModal(!isActiveCategoryModal)}
                modalStyles={{
                    content: {
                        maxWidth: 1300,
                        minHeight: '80%'
                    }
                }}
            >
                <CategoryMain
                    onCloseModal={() => setIsActiveCategoryModal(!isActiveCategoryModal)}
                />
            </Modal>
        </>
    );
};

export default Header;
