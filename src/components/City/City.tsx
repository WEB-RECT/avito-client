import React, {FC, useCallback, useEffect, useState} from 'react';
import '../../styles/city/city.scss'
import Text from "../UI/Typography/Text";
import Icons from "../UI/Icons/Icons";
import Input from "../UI/Form/Input/Input";
import {useLazyGetAllCityAPIQuery} from "../../services/UserServices";
import {ICityDefault} from "../../Types/User/IUser";
import {useActions, useAppSelector} from "../../customHook/redux";
import {cityDataGET, cityGET} from "../../store/selectors";
import {newObject} from "../../functions/object/newObject";

interface IProps {
    onCloseModal: () => void
}

type TCountryDataItem = {
    name: string
    data: {
        [key: string]: ICityDefault
    }
}

interface ICountryData {
    district: TCountryDataItem
    subject: TCountryDataItem
    cities: TCountryDataItem
}

interface IActiveCountryData {
    district: string
    subject: string
}

const City: FC<IProps> = ({onCloseModal}) => {

    const {
        changeCityACTION,
    } = useActions()

    const city = useAppSelector(cityGET)
    const cityData = useAppSelector(cityDataGET)

    const [valueCity, setValueCity] = useState<string>('')
    const [cityList, setCityList] = useState<ICityDefault[]>([])
    const [countryData, setCountryData] = useState<ICountryData>({
        district: {
            name: 'Округ',
            data: {}
        },
        subject: {
            name: 'Регион',
            data: {}
        },
        cities: {
            name: 'Город',
            data: {}
        }
    })
    const [activeCountryData, setActiveCountryData] = useState<IActiveCountryData>({
        district: '',
        subject: '',
    })

    // получение городов
    useEffect(() => {
        setCityList(cityData.slice(0, 16))
    }, [cityData])

    // поиск нахождение при активном городе
    useEffect(() => {
        const findCity: ICityDefault | undefined = cityData.find((item) => item.name.toLowerCase() === city.ru.toLowerCase())
        let currentDistrict = ''
        let currentSubject = ''

        if (findCity) {
            cityData.forEach((item) => {
                if (item.district === findCity.district) {
                    currentDistrict = findCity.district
                }
                if (item.subject === findCity.subject) {
                    currentSubject = findCity.subject
                }
            })
        }

        setActiveCountryData({
            district: currentDistrict,
            subject: currentSubject,
        })
    }, [city, cityData])

    // при изменение параметров ищем города, регионы
    useEffect(() => {
        const currentCountryData: ICountryData = {
            district: {
                name: countryData.district.name,
                data: {}
            },
            subject: {
                name: countryData.subject.name,
                data: {}
            },
            cities: {
                name: countryData.cities.name,
                data: {}
            }
        }

        cityData.forEach((item) => {
            if (!currentCountryData.district.data.hasOwnProperty(item.district)) {
                currentCountryData.district.data = {
                    ...currentCountryData.district.data,
                    [item.district]: item
                }
            }
            if (item.district === activeCountryData.district) {
                currentCountryData.subject.data = {
                    ...currentCountryData.subject.data,
                    [item.subject]: item
                }
            }
            if (item.subject === activeCountryData.subject) {
                currentCountryData.cities.data = {
                    ...currentCountryData.cities.data,
                    [item.name]: item
                }
            }
        })

        setCountryData(currentCountryData)
    }, [activeCountryData])


    const changeActiveCity = useCallback((name: string) => {
        changeCityACTION(name)
    }, [])

    const changeValueCity = useCallback((value: string) => {
        setValueCity(value)

        if (value.length !== 0) {
            setCityList(prev => {
                prev = cityData.filter((item) => item.name.includes(value))

                return prev
            })
        } else {
            setCityList(cityData.slice(0, 16))
        }
    }, [cityData])

    return (
        <>
            <div className="city">
                <div className="city-content">
                    <Input
                        placeholder="Найти город"
                        defaultValue={valueCity}
                        getValueChanged={(value) => changeValueCity(value)}
                    />
                    <div className="city-items">
                        {
                            cityList.map((item, index) => (
                                <div
                                    key={item.name + index + 'city'}
                                    className={`city-item ${item.name === city.ru ? 'active' : ''}`}
                                    onClick={() => changeActiveCity(item.name)}
                                >
                                    {
                                        item.name
                                    }
                                </div>
                            ))
                        }
                    </div>
                    {
                        valueCity.length === 0 &&
                        <div className="city-country">
                            {
                                Object.keys(countryData).map((key) => {
                                    const countryDataItem: TCountryDataItem = countryData[key]

                                    return (
                                        <div
                                            key={countryDataItem.name + 'country-top'}
                                            className="col"
                                        >
                                            <Text
                                                weight={600}
                                                size={20}
                                            >
                                                {
                                                    countryDataItem.name
                                                }
                                            </Text>
                                            {
                                                Object.keys(countryDataItem.data).map((it, itIndex) => {
                                                    const dataItem: ICityDefault = countryDataItem.data[it]
                                                    const checkActive = city.ru === it
                                                        || activeCountryData.district === it
                                                        || activeCountryData.subject === it

                                                    let currentName = dataItem.name

                                                    if (countryDataItem.name === 'Округ') {
                                                        currentName = dataItem.district
                                                    }
                                                    if (countryDataItem.name === 'Регион') {
                                                        currentName = dataItem.subject
                                                    }

                                                    return (
                                                        <div
                                                            key={dataItem.name + itIndex + 'city'}
                                                            className={`city-country-item ${checkActive ? 'active' : ''}`}
                                                            onClick={() => {
                                                                setActiveCountryData(prev => {
                                                                    const currentPrev = newObject(prev)

                                                                    if (countryDataItem.name === 'Округ') {
                                                                        currentPrev.district = it
                                                                    }
                                                                    if (countryDataItem.name === 'Регион') {
                                                                        currentPrev.subject = it
                                                                    }

                                                                    return currentPrev
                                                                })

                                                                if (countryDataItem.name === 'Город') {
                                                                    changeActiveCity(dataItem.name)
                                                                }
                                                            }}
                                                        >
                                                            {
                                                                currentName
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default React.memo(City);