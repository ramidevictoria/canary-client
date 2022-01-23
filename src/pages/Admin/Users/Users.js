import React, {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../api/auth';
import { getUsersActiveApi } from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers';

import './Users.scss';

export default function Users() {
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();

    useEffect(() => {
        getUsersActiveApi(token, true)
        .then(response => {
            setUsersActive(response.users);
        })
        .catch(err => {
            console.log(err);
        });

        getUsersActiveApi(token, false)
        .then(response => {
            setUsersInactive(response.users);
        })
        .catch(err => {
            console.log(err);
        });
        setReloadUsers(false);
    }, [token, reloadUsers]);

    return (
        <ListUsers usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
    );
}