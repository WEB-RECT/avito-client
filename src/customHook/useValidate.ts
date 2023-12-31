import {useAppSelector} from "./redux";
import {useCallback, useState} from "react";

type TValidateType = 'length'
    | 'password'
    | 'email'

interface IValue {
    validateType: TValidateType
    type: string
    value: string
}

type TResultInfoList = {
    [key: string]: {
        status: boolean
        type: string
        validateType: string
        value: string
        text: string
    }
}

interface IResultInfo {
    allValidated: boolean
    list: TResultInfoList
}

function useValidate(requiredTypes?: string[]): [IResultInfo, (params: IValue) => TResultInfoList, () => void] {

    const [result, setResult] = useState<IResultInfo>({
        allValidated: false,
        list: {}
    })

    const setValue = useCallback((params: IValue) => {
        const currentResult: TResultInfoList = {}

        const handleValue = (status: boolean, text: string) => {
            currentResult[params.type] = {
                status: status,
                type: params.type,
                validateType: params.validateType,
                value: params.value,
                text: text,
            }

            setResult(prev => {

                const checkAllActive: string[] = []
                const currentPrev = prev
                currentPrev.list[params.type] = {
                    status: status,
                    type: params.type,
                    validateType: params.validateType,
                    value: params.value,
                    text: text,
                }

                if (Object.keys(currentPrev.list).length > 0) {
                    Object.values(currentPrev.list).forEach(item => {
                        if (item.status) {
                            checkAllActive.push(item.type)
                        }
                    })
                }

                if (requiredTypes) {
                    const checkList: boolean[] = []

                    requiredTypes.forEach(type => {
                        if (checkAllActive.find(it => it === type)) {
                            checkList.push(true)
                        }
                    })

                    currentPrev.allValidated = checkList.length === requiredTypes.length
                } else {
                    currentPrev.allValidated = false
                }

                return {
                    ...currentPrev,
                }
            })
        }

        if (params?.validateType === 'length') {
            if (params.value.length > 0) {
                handleValue(true, '')
            } else {
                handleValue(false, 'Заполните поле')
            }
        }
        if (params?.validateType === 'email') {
            const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (reg.test(String(params.value).toLowerCase())) {
                handleValue(true, '')
            } else {
                handleValue(false, 'Введите корректный емаил')
            }
        }
        if (params?.validateType === 'password') {
            const reg = /^[a-zA-Z0-9!@#$%^&*_-]{6,16}$/

            if (reg.test(String(params.value).toLowerCase())) {
                handleValue(true, '')
            } else {
                handleValue(false, `Введите корректный пароль: <br>
                    Буквы: a-Z <br>
                    Цифры: 0-9 <br>
                    Символы: !@#$%^&*_- <br>
                    Длина: 6-16
                `)
            }
        }

        return currentResult
    }, [requiredTypes])

    const clearValidateValue = () => {
        setResult({
            allValidated: false,
            list: {}
        })
    }

    return [result, setValue, clearValidateValue]
}

export default useValidate;