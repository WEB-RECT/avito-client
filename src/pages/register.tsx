import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {validateFormItem} from "../functions/validateFormItem/validateFormItem";
import {Link} from "react-router-dom";
import Text from "../components/UI/Typography/Text";
import Form from "../components/UI/Form/Form";
import Input from "../components/UI/Form/Input/Input";
import Button from "../components/UI/Button/Button";
import {useCreateUserAPIMutation} from "../services/UserServices";
import {IFormValueRegister} from "../Types/Types";
import {AuthContext} from "../components/Auth/Auth"

import Cookies from 'universal-cookie';
import {TErrors} from "../Types/Profile/IAddItem";
import useValidate from "../customHook/useValidate";
const cookies = new Cookies();

interface IListFormItem {
    name: TChangeValueForm;
    type: TChangeValueForm;
}

type TChangeValueForm = 'name'
    | 'password'
    | 'email'
type TValidateType = 'length'
    | 'password'
    | 'email'

const listFormItem: IListFormItem[] = [
    {
        name: 'name',
        type: 'name',
    },
    {
        name: 'email',
        type: 'email',
    },
    {
        name: 'password',
        type: 'password',
    }
]


const Register = () => {

    const { logIn } = useContext(AuthContext)
    const [validateResult, setValidateResult] = useValidate(['name', 'email', 'password'])

    const [createUserAPI, {isError, isSuccess, isLoading}] = useCreateUserAPIMutation()

    const [formValue, setFormValue] = useState<IFormValueRegister>({
        name: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate()

    const changeValueForm = (value: string, type: TChangeValueForm) => {
        let validateType: TValidateType

        if (type === 'name') {
            validateType = 'length'
        } else {
            validateType = type
        }
        const res = setValidateResult({
            validateType,
            type,
            value,
        })

        setFormValue(prev => {
            return {
                ...prev,
                [type]: value
            }
        })
    }

    const registerUser = async () => {

        const result = await createUserAPI(formValue).unwrap()

        if (result && result.token) {
            logIn(result.token)
            navigate('/')
        }
    }

    return (
        <div className="auth">
            <Link to="/" >
                <div className="logo">
                    logo
                </div>
            </Link>
            <div className="auth-block">
                <div className="auth-block-title">
                    <Text
                        size={18}
                    >
                        Регистрация
                    </Text>
                </div>
                <Form>
                    {
                        listFormItem.map((item, indexItem) => (
                            <Input
                                key={item.type + indexItem}
                                defaultValue={formValue[item.type]}
                                getValueChanged={(value) => changeValueForm(value, item.type)}
                                type={item.type}
                                placeholder={item.type}
                                errors={validateResult.list[item.type] && {
                                    status: !validateResult.list[item.type].status,
                                    errorText: validateResult.list[item.type].text
                                }}
                            />
                        ))
                    }
                </Form>
                <Button
                    disabled={!validateResult.allValidated}
                    onClick={() => registerUser()}
                >
                    Зарегестрироваться
                </Button>
            </div>
            <div className="auth-info">
                Уже есть аккаунт ?&nbsp;
                <Link to="/login">
                    Войти
                </Link>
            </div>
        </div>
    );
};

export default React.memo(Register);
