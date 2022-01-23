import React, {useState} from 'react';
import {Avatar, Form, Input, Select, Button, Row, Col, notification} from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import {useDropzone} from 'react-dropzone';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import { signUpAdminApi, uploadAvatarApi} from '../../../../api/user';
import { getAccessTokenApi } from "../../../../api/auth";

import './AddUserForm.scss';


export default function AddUserForm(props) {
    const { setIsVisibleModal, setReloadUsers } = props;
    const [ userData, setUserData ] = useState({});

    const addUser = () => {

        if (!userData.email || !userData.password || !userData.repeatPassword) {
            notification['error']({message: 'email y password son obligatorios.'});
        } else if (userData.password !== userData.repeatPassword) {
            notification['error']({message: 'Las contrasenias no coinciden.'});
        } else {
            const accessToken = getAccessTokenApi();

            signUpAdminApi(accessToken, userData)
                .then(response => {
                    notification['success']({message: response});
                    setReloadUsers(true);
                })
                .catch(err => {
                    notification['error']({message: err});   
                });

                setIsVisibleModal(false);
                setUserData({});

        }
    }

    return (
        <div className="add-user-form">

            <AddForm 
                userData={userData}
                setUserData={setUserData}
                addUser={addUser}
            />
        </div>
    );
}

function AddForm(props) {
    const { userData, setUserData, addUser } = props
    const { Option } = Select;

    return (
        <Form className="form-add" onFinish={addUser}>
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
                    <Button type="primary" htmlType="submit" className="btn-submit">Crear Usuario</Button>
            </Form.Item>

        </Form>
    );
}