import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Text from "../components/UI/Typography/Text";
import Form from "../components/UI/Form/Form";
import Input from "../components/UI/Form/Input/Input";
import Button from "../components/UI/Button/Button";
import {useAuthUserAPIMutation} from "../services/UserServices";
import {IFormValueLogin} from "../Types/Types";
import {AuthContext} from "../components/Auth/Auth";
import useValidate from "../customHook/useValidate";

interface IListFormItem {
    name: TValidateType;
    type: TValidateType;
}

type TValidateType = 'password' | 'email'

const listFormItem: IListFormItem[] = [
    {
        name: 'email',
        type: 'email',
    },
    {
        name: 'password',
        type: 'password',
    }
]


const Login = () => {

    const { logIn } = useContext(AuthContext)
    const [validateResult, setValidateResult] = useValidate(['email', 'password'])
    const navigate = useNavigate()

    const [authUserAPI] = useAuthUserAPIMutation()

    const [formValue, setFormValue] = useState<IFormValueLogin>({
        email: '',
        password: '',
    })

    const changeValueForm = (value: string, type: TValidateType) => {
        const res = setValidateResult({
            validateType: type,
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

    const loginUser = async () => {

        const result = await authUserAPI(formValue).unwrap()

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
                        Вход
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
                    onClick={() => loginUser()}
                >
                    Войти
                </Button>
            </div>
            <div className="auth-info">
                Нет аккаунта ?&nbsp;
                <Link to="/register">
                    Зарегестрироваться
                </Link>
            </div>
        </div>
    );
};

export default React.memo(Login);
