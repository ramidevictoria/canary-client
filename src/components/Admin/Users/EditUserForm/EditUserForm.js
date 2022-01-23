import React, {useState, useCallback, useEffect} from 'react';
import {Avatar, Form, Input, Select, Button, Row, Col, notification} from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import {useDropzone} from 'react-dropzone';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import {getAvatarApi, updateUserApi, uploadAvatarApi} from '../../../../api/user';
import {getAccessTokenApi} from "../../../../api/auth";

import './EditUserForm.scss';

export default function EditUserForm(props) {
    const {user, setIsVisibleModal, setReloadUsers} = props;
    const [ avatar, setAvatar ] = useState(null);
    const [ userData, setUserData ] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        });
    }, [user]);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response);
                })
                .catch(err => {

                });
        } else {
            setAvatar(null);
        }
    }, [user]);

    useEffect(() => {
        if (avatar) {
            setUserData({...userData, avatar: avatar.file});
        }
    }, [avatar, userData]);

    const updateUser = e => {
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if (userUpdate.password || userUpdate.repeatPassword) {
            if (userUpdate.password !== userUpdate.repeatPassword) {
                notification['error']({message: "Las contrasenias no coinciden"});
                return;
            } else {
                delete userUpdate.repeatPassword;
            }
        }

        if (!userUpdate.email) {
            notification['error']({message: 'El mail es obligatorio'});
            return;
        }

        if ('object' === typeof userUpdate.avatar) {
            uploadAvatarApi(token, userUpdate.avatar, user._id)
                .then(response => {
                    console.log(response);
                    userUpdate.avatar = response.avatarName;
                    updateUserApi(token, userUpdate, user._id)
                        .then(result => {
                            notification['success']({message: result.message});
                        })
                        .catch(err => {
                            notification['error']({message: err.message});
                        });
                })
                .catch();
        } else {
            updateUserApi(token, userUpdate, user._id)
                .then(result => {
                    notification['success']({message: result.message});
                });
        }
        setIsVisibleModal(false);
        setReloadUsers(true);
    }

    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    );
}

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [ avatarUrl, setAvatarUrl ] = useState(null);


    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }

    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({file, preview: URL.createObjectURL(file)});
        },
        [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png',
        nokeyboard: true,
        onDrop
    });
    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    );
}

function EditForm(props) {
    const { userData, setUserData, updateUser} = props;
    const { Option } = Select;

    return (
        <Form className="form-edit" onFinish={updateUser} >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({...userData, name: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Apellido"
                            value={userData.last_name}
                            onChange={e => setUserData({...userData, last_name: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            value={userData.email}
                            onChange={e => setUserData({...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccione un rol"
                            onChange={e => setUserData({...userData, role: e})}
                            value={userData.role}
                        >
                            <Option value="admin">Administrador</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="reviewer">Revisor</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            value={userData.password}
                            onChange={e => setUserData({...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Repeat Password"
                            value={userData.repeatPassword}
                            onChange={e => setUserData({...userData, repeatPassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn-submit">Actualizar Usuario</Button>
                
            </Form.Item>
        </Form>
    );
}