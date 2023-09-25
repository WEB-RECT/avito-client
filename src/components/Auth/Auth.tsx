import React, {createContext, FC, useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie';
import {useActions} from "../../customHook/redux";

const cookies = new Cookies();

interface IAuth {
    children: React.ReactNode
}

interface iAuthContext {
    sessionAuth: boolean;
    logIn: (token: string) => void;
    logOut: () => void;
}

interface IJwtDecode {
    [key: string]: string | number;
}

export const AuthContext = createContext<iAuthContext>({} as iAuthContext)

const Auth: FC<IAuth> = ({ children }) => {

    const navigate = useNavigate()

    const { addUserInfoAuthACTION, removeUserInfoAuthACTION } = useActions()

    const [sessionAuth, setSessionAuth] = useState<boolean>(false)

    cookies.addChangeListener(() => {
        checkCookie()
    })

    useEffect(() => {
        checkCookie()
    }, [cookies])

    const checkCookie = () => {
        if (cookies.get('token')) {

            setSessionAuth(true)

            const { email, name, uuid } = jwtDecode<IJwtDecode>(cookies.get('token'))

            addUserInfoAuthACTION({
                email,
                name,
                uuid,
                token: cookies.get('token'),
            })
        } else {

            setSessionAuth(false)

            removeUserInfoAuthACTION()
        }
    }

    const logIn = (token: string) => {
        cookies.set('token', token, {
            path: '/',
            maxAge: 1 * 60 * 60 * 24 * 30 * 12 * 10
        })
    }

    const logOut = () => {
        cookies.remove("token", {path: '/'})
        navigate('/needAuth')
    }


    return (
        <AuthContext.Provider
            value={{ sessionAuth, logIn, logOut }}
        >
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default React.memo(Auth);
