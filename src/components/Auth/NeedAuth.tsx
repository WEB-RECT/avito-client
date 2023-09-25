import React from 'react';
import {Link} from "react-router-dom";

const NeedAuth = () => {
    return (
        <Link to="/login">
            Авторизоваться
        </Link>
    );
};

export default NeedAuth;