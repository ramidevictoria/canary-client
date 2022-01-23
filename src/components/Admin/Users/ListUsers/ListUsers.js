import React, {useEffect, useState} from 'react';
import {Switch, List, Avatar, Button, Modal as ModalAntd, notification} from 'antd';
import {EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined} from '@ant-design/icons';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal/';
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
import { getAvatarApi, activateUserApi, deleteUserApi } from "../../../../api/user";
import { getAccessTokenApi} from "../../../../api/auth";

import './ListUsers.scss';

const { confirm } = ModalAntd;

export default function ListUsers(props) {
    const {usersActive, usersInactive, setReloadUsers } = props;
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal ] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const showDeleteConfirm = (user) => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: 'Eliminar usuario',
            content: `Esta seguro que desea eliminar al usuario ${user.email}?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            maskClosable: true,
            onOk() {
                deleteUserApi(accessToken, user._id)
            .then(response => {
                notification['success']({message: response});
                setReloadUsers(true);  
            })
            .catch(err => {
                notification['error']({message: err});   
            });
            }
        });
    }

    const addUserModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Crear un nuevo usuario");
        setModalContent(<AddUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
    }

    return (
        <div className='list-users'>
            <div className="list-users__header">
                <div className='list-users__header-switch'>
                    <Switch
                        defaultChecked
                        onChange={()=>setViewUsersActives(!viewUsersActives)}
                    />
                    <span>
                    {viewUsersActives ? 'Usuarios Activos' : 'Usuarios Inactivos'}
                    </span>
                </div>

                <Button type="primary" onClick={addUserModal}>Agregar Usuario</Button>
            </div>


            {viewUsersActives ?
                (<UsersActive usersActive={usersActive} showDeleteConfirm={showDeleteConfirm} setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} setModalContent={setModalContent} setReloadUsers={setReloadUsers} />) :
                (<UsersInactive usersInactive={usersInactive} showDeleteConfirm={showDeleteConfirm} setReloadUsers={setReloadUsers} />)}
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        
        </div>
    );
}

function UsersActive(props) {
    const {
        usersActive,
        setIsVisibleModal,
        setModalTitle,
        setModalContent,
        setReloadUsers,
        showDeleteConfirm
    } = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ?? '...'} ${user.last_name ?? '...'}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
    };

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive} //user active
            renderItem={user => (<UserActive user={user} showDeleteConfirm={showDeleteConfirm} editUser={editUser} setReloadUsers={setReloadUsers} />)}
        />
    );
}

function UsersInactive(props) {
    const {usersInactive, setReloadUsers, showDeleteConfirm} = props;

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive} //user inactive
            renderItem={user => (<UserInactive user={user} showDeleteConfirm={showDeleteConfirm} setReloadUsers={setReloadUsers}/>)}
        />
    );
}

function UserActive(props)
{
    const {user, editUser, setReloadUsers, showDeleteConfirm} = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response);
                });
        } else {
            setAvatar(null);
        }

    }, [user]);

    const desactivateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, false)
            .then(response => {
                notification['success']({message: response});
            })
            .catch(err => {
                notification['error']({message: err})
            });
        setReloadUsers(true);
    }

    return (<List.Item
        actions={[
            <Button type="primary" onClick={() => {editUser(user)}}>
                <EditOutlined />
            </Button>,
            <Button type="danger" onClick={desactivateUser}>
                <StopOutlined />
            </Button>,
            <Button type="danger" onClick={() => {showDeleteConfirm(user)}}>
                <DeleteOutlined />
            </Button>
        ]}
    >

        <List.Item.Meta
            avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
            title={`
                        ${user.name ? user.name : '...'}
                        ${user.last_name ? user.last_name : '...'}
                    `}
            description={user.email}
        />
    </List.Item>);
}

function UserInactive(props) {
    const {user, setReloadUsers, showDeleteConfirm} = props;
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response);
                });
        } else {
            setAvatar(null);
        }

    }, [user]);

    const activateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, true)
            .then(response => {
                notification['success']({message: response});

            })
            .catch(err => {
                notification['error']({message: err})
            });
        setReloadUsers(true);
    }

    return (<List.Item
        actions={[
            <Button type="primary" onClick={activateUser}>
                <CheckOutlined />
            </Button>,
            <Button type="danger" onClick={() => {showDeleteConfirm(user)}}>
                <DeleteOutlined />
            </Button>
        ]}
    >

        <List.Item.Meta
            avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
            title={`
                        ${user.name ? user.name : '...'}
                        ${user.last_name ? user.last_name : '...'}
                    `}
            description={user.email}
        />
    </List.Item>);

}

