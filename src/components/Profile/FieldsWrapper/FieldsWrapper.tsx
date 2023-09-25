import React, {FC, useEffect, useState} from 'react';
import {IFieldsAddItemList, IParamsToFields} from "../../../Types/Profile/IAddItem";
import {fieldsAddItem} from "../../../category/addItem/fieldsAddItem";
import {paramsToFields} from "../../../category/addItem/paramsToFields";
import {newObject} from "../../../functions/object/newObject";
import Text from "../../UI/Typography/Text";
import RadioRow from "../../UI/Form/RadioRow/RadioRow";
import Input from "../../UI/Form/Input/Input";
import Select from "../../UI/Form/Select/Select";
import Images from "../../UI/Form/Images/Images";
import Button from "../../UI/Button/Button";
import CheckboxList from "../../UI/Form/CheckboxList/CheckboxList";
import {YMaps, Map, YMapsApi, Placemark} from "react-yandex-maps";
import {IKeyAny, IYMapsSuggest} from "../../../Types/Types";
import {useCreateCardAPIMutation, useUpdateCardAPIMutation} from "../../../services/CardServices";
import {useSelector} from "react-redux";
import {useAppSelector} from "../../../customHook/redux";
import {useNavigate} from "react-router-dom";
import {getBase64} from "../../../functions/files/getBase64";
import {
    ICardServicesCreateBody,
    ICardServicesUpdateBody
} from "../../../Types/Services/ICardServices";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {IDefaultResponse} from "../../../Types/Services";
import {ICardDefault} from "../../../Types/Card/ICard";
import {authInfoGET, categoryTreeListGET} from "../../../store/selectors";


interface IFieldList {
    activeCrumb: string;
    crumbs: string[];
    cardParamsToEdit: ICardDefault | (null | undefined);
}

interface IValueToForm {
    [key: string]: any
}

interface IErrorsType {
    [key: string]: boolean
}

type IChangeValueFieldToValue = string | string[] | number | number[] | File[]

const cyrillicToTranslit = new (CyrillicToTranslit as any)();

const FieldsWrapper: FC<IFieldList> = ({ activeCrumb , crumbs, cardParamsToEdit}) => {

    const [createCardAPI, createCardAPIStatusList] = useCreateCardAPIMutation()
    const [updateCardAPI, updateCardAPIStatusList] = useUpdateCardAPIMutation()

    const {uuid: userUuid} = useAppSelector(authInfoGET)
    const categoryTreeList = useAppSelector(categoryTreeListGET)

    const [fieldListData, setFieldListData] = useState<IFieldsAddItemList[]>([] as IFieldsAddItemList[])
    const [valueToForm, setValueToForm] = useState<IValueToForm>({})

    const [errorsType, setErrorsType] = useState<IErrorsType>({})

    const [mapData, setMapData] = useState<YMapsApi>({})
    const [suggestItems, setSuggestItems] = useState<string[]>([]);
    const [mapGeo, setMapGeo] = useState([]);
    const [disabledPublished, setDisabledPublished] = useState<boolean>(false);

    const [resultStatus, setResultStatus] = useState<IDefaultResponse | null>(null);

    const navigate = useNavigate()

    useEffect(() => {
        if (createCardAPIStatusList.isLoading || updateCardAPIStatusList.isLoading) {
            setDisabledPublished(createCardAPIStatusList.isLoading || updateCardAPIStatusList.isLoading)
        }
    }, [createCardAPIStatusList.isLoading, updateCardAPIStatusList.isLoading]);

    // получение field и параметров для field
    useEffect(() => {
        if (activeCrumb) {

            const getField = newObject(fieldsAddItem[categoryTreeList[activeCrumb].type])

            if (getField) {
                getField.forEach((field: IFieldsAddItemList) => {

                    const getFieldParams: IParamsToFields[] = []
                    const currentFieldChildrenParams = newObject(field.childrenParams)

                    if (currentFieldChildrenParams) {
                        paramsToFields.forEach(params => {
                            if (currentFieldChildrenParams.find((child: string) => child === params.type)) {
                                getFieldParams.push(params)
                            }
                        })
                    }

                    field.childrenParamsFields = getFieldParams

                })

                setFieldListData(getField)

            }

        }
    }, [activeCrumb])

    // получение список required
    useEffect(() => {
        if (fieldListData) {
            checkRequired(false)
        }
    }, [fieldListData])

    // получение с карты список подсказок и информацию по положению
    useEffect(() => {

        const valueToFormAddress = valueToForm?.location?.address

        if (valueToFormAddress && Object.keys(mapData).length > 0) {

            mapData.suggest(valueToFormAddress)
                .then((items: IYMapsSuggest[]) => {

                    const newItems: string[] = []

                    if (items && items.length > 0) {
                        items.forEach((item) => {
                            newItems.push(item.value)
                        })
                    }

                    setSuggestItems(newItems)

                })
                .catch((e: any) => console.log(e))

            mapData.geocode(valueToFormAddress, {kind: 'house'})
                .then((result: any) => {
                    let firstGeoObject = result.geoObjects.get(0),
                        coords = firstGeoObject.geometry.getCoordinates();

                    const addressInfoParams = {
                        country: firstGeoObject.getCountry() || '',
                        localities: firstGeoObject.getLocalities().join(', ') || '',
                        address: firstGeoObject.getAddressLine() || '',
                        street: firstGeoObject.getThoroughfare() || '',
                        building_name: firstGeoObject.getPremise() || '',
                        building_number: firstGeoObject.getPremiseNumber() || '',
                        city: firstGeoObject.getLocalities()[0] || '',
                        coords: coords,
                    }

                    setValueToForm(prev => {
                        return {
                            ...prev,
                            location: {
                                ...prev?.location,
                                ['address_info']: addressInfoParams
                            }
                        }
                    })

                    setMapGeo(coords);

                });
        }
    }, [valueToForm?.location?.address, mapData])

    useEffect(() => {
        if (cardParamsToEdit?.uuid) {

            const currentParams = {
                ...cardParamsToEdit.params,
                photos: cardParamsToEdit.images_url.data
            }

            setValueToForm(currentParams)

        }
    }, [cardParamsToEdit])

    const changeValueField = (value: IChangeValueFieldToValue, paramsType: string, fieldType: string) => {

        if (value) {
            setErrorsType(prev => {

                const currentPrev = prev
                currentPrev[paramsType] = false

                return {
                    ...currentPrev
                }
            })
        } else {
            setErrorsType(prev => {

                const currentPrev = prev
                currentPrev[paramsType] = true

                return {
                    ...currentPrev
                }
            })
        }

        setValueToForm(prev => {
            return {
                ...prev,
                [fieldType]: {
                    ...prev[fieldType],
                    [paramsType]: value
                }
            }
        })

    }

    const checkRequired = (statusDefault: boolean): IErrorsType => {

        const fieldsParams: IErrorsType = {}

        fieldListData.forEach(field => {

            const fieldChildrenParamsFields = field.childrenParamsFields as IParamsToFields[]

            fieldChildrenParamsFields.forEach(params => {
                if (params.widget.required) {
                    if (!valueToForm[field.type]?.hasOwnProperty(params.type) || (valueToForm[field.type][params.type]?.toString().length === 0)) {
                        fieldsParams[params.type] = statusDefault
                    }
                }
            })
        })

        setErrorsType(fieldsParams)

        return fieldsParams
    }


    const checkForm = async () => {

        setDisabledPublished(true)

        if (Object.keys(checkRequired(true)).length === 0) {

            if (cardParamsToEdit?.uuid) {

                const currentBody: ICardServicesUpdateBody = {} as ICardServicesUpdateBody
                const newValueToForm: IKeyAny = JSON.parse(JSON.stringify(valueToForm)) as IKeyAny

                delete newValueToForm['photos']

                currentBody['path'] = crumbs.join(', ')
                currentBody['params'] = newValueToForm
                currentBody['images'] = valueToForm['photo']['photos']
                currentBody['dateUnix'] = Math.floor(Date.now() / 1000)
                currentBody['userUuid'] = userUuid
                currentBody['cardUuid'] = cardParamsToEdit?.uuid
                currentBody['city'] = {
                    ru: newValueToForm.location.address_info.city,
                    en: cyrillicToTranslit.transform(newValueToForm.location.address_info.city),
                }

                const result = await updateCardAPI(currentBody).unwrap()

                setResultStatus(result)

                if (result.status) {
                    navigate('/profile')
                } else {
                    setDisabledPublished(false)
                }

            } else {

                const currentBody: ICardServicesCreateBody = {} as ICardServicesCreateBody
                const newValueToForm: IKeyAny = JSON.parse(JSON.stringify(valueToForm)) as IKeyAny

                delete newValueToForm['photos']

                currentBody['path'] = crumbs.join(', ')
                currentBody['params'] = newValueToForm
                currentBody['images'] = valueToForm['photo']['photos']
                currentBody['dateUnix'] = Math.floor(Date.now() / 1000)
                currentBody['userUuid'] = userUuid
                currentBody['city'] = {
                    ru: newValueToForm.location.address_info.city,
                    en: cyrillicToTranslit.transform(newValueToForm.location.address_info.city),
                }

                const resultCreateCard = await createCardAPI(currentBody).unwrap()

                setResultStatus(resultCreateCard)

                if (resultCreateCard.status) {
                    navigate('/profile')
                } else {
                    setDisabledPublished(false)
                }

            }

        }

    }

    return (
        <>
            {
                fieldListData &&
                    <>
                        <div>
                            {
                                fieldListData.map((item, indexItem) => (
                                    <div
                                        className="field-block"
                                        key={item.title + indexItem.toString()}
                                    >

                                        <div className="field-block-title">
                                            <Text
                                                size={18}
                                            >
                                                {
                                                    item.title
                                                }
                                            </Text>
                                        </div>

                                        {
                                            item.childrenParamsFields  &&
                                            item.childrenParamsFields.map((params, indexParams) => (
                                                <div
                                                    key={params.type + indexParams.toString()}
                                                    className="params"
                                                >
                                                    <div className="params-label">
                                                        {
                                                            params.label
                                                        }
                                                    </div>
                                                    <div className="params-content">
                                                        {
                                                            params.widget.type === 'input' &&
                                                            <Input
                                                                defaultValue={(valueToForm[item.type]?.hasOwnProperty(params.type) && valueToForm[item.type][params.type]) || params.widget.input?.defaultValue}
                                                                placeholder={params.widget.input?.placeholder}
                                                                getValueChanged={(value) => changeValueField(value, params.type, item.type)}
                                                                errors={ errorsType[params.type] ? params.widget?.errors : null}
                                                                suggest={
                                                                    params.type === 'address'
                                                                        ?
                                                                        {
                                                                            items: suggestItems,
                                                                        }
                                                                        :
                                                                        null
                                                                }
                                                            />
                                                        }
                                                        {
                                                            params.widget.type === 'radio' &&
                                                            <RadioRow
                                                                items={params.widget.radio?.valueList}
                                                                defaultValue={(valueToForm[item.type]?.hasOwnProperty(params.type) && valueToForm[item.type][params.type]) || params.widget.radio?.defaultValueType}
                                                                getValueChanged={(value) => changeValueField(value, params.type, item.type)}
                                                                errors={errorsType[params.type] ? params.widget?.errors : null}
                                                            />
                                                        }
                                                        {
                                                            params.widget.type === 'checkboxList' &&
                                                            <CheckboxList
                                                                defaultValue={(valueToForm[item.type]?.hasOwnProperty(params.type) && valueToForm[item.type][params.type]) || params.widget.checkboxList?.defaultValueType}
                                                                items={params.widget.checkboxList?.valueList}
                                                                getValueChanged={(value) => changeValueField(value, params.type, item.type)}
                                                            />
                                                        }
                                                        {
                                                            params.widget.type === 'select' &&
                                                            <Select
                                                                defaultValue={(valueToForm[item.type]?.hasOwnProperty(params.type) && valueToForm[item.type][params.type]) || params.widget.select?.defaultValueType}
                                                                items={params.widget.select?.valueList}
                                                                getValueChanged={(value) => changeValueField(value, params.type, item.type)}
                                                            />
                                                        }
                                                        {
                                                            params.widget.type === 'textarea' &&
                                                            <Input
                                                                defaultValue={(valueToForm[item.type]?.hasOwnProperty(params.type) && valueToForm[item.type][params.type]) || params.widget.radio?.defaultValueType}
                                                                placeholder={params.widget.input?.placeholder}
                                                                getValueChanged={(value) => changeValueField(value, params.type, item.type)}
                                                                errors={errorsType[params.type] ? params.widget?.errors : null}
                                                                tag="textarea"
                                                            />
                                                        }
                                                        {
                                                            params.widget.type === 'radioColor' &&
                                                            <RadioRow
                                                                widgetType="radioColor"
                                                                items={params.widget.radio?.valueList}
                                                                defaultValue={(valueToForm[item.type]?.hasOwnProperty(params.type) && valueToForm[item.type][params.type]) || params.widget.radio?.defaultValueType}
                                                                getValueChanged={(value) => changeValueField(value, params.type, item.type)}
                                                                errors={errorsType[params.type] ? params.widget?.errors : null}
                                                            />
                                                        }
                                                        {
                                                            params.widget.type === 'images' &&
                                                            <Images
                                                                getValueChanged={(value) => changeValueField(value, params.type, item.type)}
                                                                defaultValue={(valueToForm[item.type]?.hasOwnProperty(params.type) && valueToForm[item.type][params.type])}
                                                                changePublishedButton={(value) => setDisabledPublished(value)}
                                                            />
                                                        }
                                                        {
                                                            (params.type === 'address') &&
                                                            <YMaps
                                                                query={{
                                                                    apikey: process.env.REACT_APP_YANDEX_API
                                                                }}
                                                            >
                                                                <Map
                                                                    modules={['geocode', 'suggest']}
                                                                    onLoad={(ymap) => setMapData(ymap)}
                                                                    defaultState={{ center: [55.75, 37.57], zoom: 10 }}
                                                                    state={{
                                                                        center: +mapGeo[0] ? [+mapGeo[0], +mapGeo[1]] : [55.7522, 37.6156],
                                                                        zoom: mapGeo.length === 2 ? 15 : 10
                                                                    }}
                                                                    style={{
                                                                        marginTop: '20px',
                                                                        width: '100%',
                                                                        height: '300px',
                                                                    }}
                                                                >
                                                                    {
                                                                        mapGeo.length === 2 &&
                                                                        <Placemark
                                                                            geometry={mapGeo}
                                                                        />
                                                                    }
                                                                </Map>
                                                            </YMaps>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                ))
                            }
                        </div>
                        <div className="block-send-form">
                            <div className="row">
                                <Button
                                    onClick={() => checkForm()}
                                    disabled={disabledPublished}
                                >
                                    {
                                        cardParamsToEdit?.uuid
                                            ?
                                            'Редактировать'
                                            :
                                            'Опубликовать'
                                    }
                                </Button>
                                <Button
                                    onClick={() => navigate('/profile')}
                                    disabled={disabledPublished}
                                >
                                    {
                                        cardParamsToEdit?.uuid
                                            ?
                                            'Отменить редактирование'
                                            :
                                            'Отменить публикацию'
                                    }
                                </Button>
                            </div>
                                {
                                    resultStatus &&
                                    resultStatus.status &&
                                    <span>
                                        {
                                            resultStatus.result
                                        }
                                    </span>
                                }
                        </div>
                    </>
            }
        </>
    );
};

export default React.memo(FieldsWrapper);
