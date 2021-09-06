
import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import { getCurrentUser } from './Utils'
import { isAuthGuardActive } from '../constants/defaultValues';

const ProtectedRoute = ({ component: Component, roles = undefined, ...rest }) => {
    const setComponent = (props) => {
        if (isAuthGuardActive) {
            const currentUser = getCurrentUser();
            if (currentUser) {
                if (roles) {
                    if (roles.includes(currentUser.user_detail.roles[0])) {
                        return <Component {...props} />;
                    } else {
                        return <Redirect
                            to={{
                                pathname: '/unauthorized',
                                state: { from: props.location },
                            }} />
                    }
                } else {
                    return <Component {...props} />;
                }
            } else {
                return <Redirect
                    to={{
                        pathname: '/user/login',
                        state: { from: props.location },
                    }} />
            }
        } else {
            return <Component {...props} />;
        }

    }

    return (
        <Route
            {...rest}
            render={setComponent}
        />
    );
}
const UserRole = {
    Admin: 3,
    Operator: 1,
    Manager: 4
}

export { ProtectedRoute, UserRole };
