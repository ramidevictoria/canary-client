import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, notification} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation} from '../../../utils/formValidator';
import {signUpApi} from '../../../api/user';

import './RegisterForm.scss';

export default function RegisterForm() {

    const [inputs, setInputs] = useState({
        email: "",
        password:"",
        repeatPassword:"",
        privacyPolicy : false
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    });

    const changeForm = e => {
        if (e.target.name === "privacyPolicy") {
            setInputs({
                
                ...inputs,
                [e.target.name]: e.target.checked
            });
        } else {
            
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value 
            });
        }
    }

    const inputValidation = e => {
        const {type, name} = e.target;

        if (type === 'email') {setFormValid({...formValid, [name]: emailValidation(e.target)});
        } else if (type === 'password') {setFormValid({...formValid, [name]: minLengthValidation(e.target, 8)});

        } else if (type === 'checkbox') {setFormValid({...formValid, [name]: e.target.checked});}
    }

    const register = async e => {

        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        const privacyPolicyVal = inputs.privacyPolicy;

        if (!emailVal ||
            !passwordVal ||
            !repeatPasswordVal ||
            !privacyPolicyVal) {
                
            notification['error']({message: 'Todos los campos son obligatorios.'});
            
        } else {
            
            if (passwordVal !== repeatPasswordVal) {
                notification['error']({message: 'Las contrasenias deben coincidir.'});
            } else {
                const result = await signUpApi(inputs);
                if (result.success) {
                    notification['success']({message: result.message});
                    resetForm();
                } else {
                    notification['error']({message: result.message});
                }
                
            }
        }
    }

    const resetForm = () => {
        const inputs = document.getElementsByTagName('input');
        let i;

        for (i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
        }

        setInputs({
            email: "",
            password:"",
            repeatPassword:"",
            privacyPolicy : false
        });

        setFormValid({
            email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
        });

    }

    return (
        <Form className="register-form" onFinish={register} onChange={changeForm}>
            <Form.Item>
                <Input
                    prefix={<UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} /> }
                    type="email"
                    name="email"
                    placeholder="Correo electronico"
                    className="register-form_input"
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> }
                    type="password"
                    name="password"
                    placeholder="Contrasenia"
                    className="register-form__input"
                    min="8"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> }
                    type="password"
                    name="repeatPassword"
                    placeholder="Repita la contrasenia"
                    className="register-form__input"
                    min="8"
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox name="privacyPolicy" checked={inputs.privacyPolicy} onChange={inputValidation} >
                    He leido y acepto la politica de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear Cuenta
                </Button>
            </Form.Item>
        </Form>
    );
}