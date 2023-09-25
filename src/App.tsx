import * as React from 'react';
import {
    Routes,
    Route, useParams, Navigate,
} from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import Register from "./pages/register";
import {useAppSelector} from "./customHook/redux";
import {useContext} from "react";
import {AuthContext} from "./components/Auth/Auth";
import Profile from "./pages/profile/profile";
import AddItem from "./pages/profile/addItem/addItem";
import Favorites from "./pages/profile/favorites/favorites";
import Messenger from "./pages/profile/messenger/messenger";
import MessengerUuid from "./pages/profile/messenger/messengerUuid";
import NeedAuth from "./components/Auth/NeedAuth";

const App = () => {

    const { sessionAuth } = useContext(AuthContext)

    return (
        <>
            <Routes>
                {
                    sessionAuth
                        ?
                        <>
                            <Route
                                path="/"
                                element={<Main />}
                            />
                            <Route
                                path="/:city/*"
                                element={<Main />}
                            />
                            <Route
                                path="/profile"
                                element={<Profile/>}
                            />
                            <Route
                                path="/profile/addItem"
                                element={<AddItem/>}
                            />
                            <Route
                                path="/profile/addItem/:uuid"
                                element={<AddItem/>}
                            />
                            <Route
                                path="/profile/favorites"
                                element={<Favorites/>}
                            />
                            <Route
                                path="/profile/messenger"
                                element={<Messenger/>}
                            />
                            <Route
                                path="/profile/messenger/:uuid"
                                element={<MessengerUuid/>}
                            />
                        </>
                        :
                        <>
                            <Route
                                path="/"
                                element={<Main/>}
                            />
                            <Route
                                path="/:city/*"
                                element={<Main />}
                            />
                            <Route
                                path="/login"
                                element={<Login/>}
                            />
                            <Route
                                path="/register"
                                element={<Register/>}
                            />
                            <Route
                                path="/needAuth"
                                element={<NeedAuth/>}
                            />
                        </>
                }
            </Routes>

        </>
    );
}

export default App;
