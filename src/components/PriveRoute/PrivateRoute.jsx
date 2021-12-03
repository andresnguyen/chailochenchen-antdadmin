import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authStorageKeys } from '../../constants';

function PrivateRoute(props) {
    const isLoggedIn = Boolean(localStorage.getItem(authStorageKeys.TOKEN))

    if (!isLoggedIn) return <Redirect to="/auth/login" />;
    return <Route {...props} />;
}

PrivateRoute.propTypes = {

}

export default PrivateRoute

