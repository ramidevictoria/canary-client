
import React, {useState} from 'react';
import { Form, Input, Button, notification } from 'antd';
import { addNewsletterApi } from '../../../api/newsletter';
import { MailOutlined } from '@ant-design/icons';

import './Newsletter.scss';

export default function Newsletter() {

    const [ email, setEmail] = useState('');

    const addNewsletter = function() {
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const resultValidation = emailValid.test(email);
        
        if (resultValidation) {
            addNewsletterApi(email)
                .then(res => {
                    notification['success']({message: res});
                    setEmail('');
                })
                .catch(err => {
                    notification['error']({message: err});
                });
        } else {
            notification['error']({message: 'Ingrese un email valido.'});
        }
    }

    return (
        <Form className="newsletter" onFinish={addNewsletter}>

            <Form.Item>
                <Input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item>
                <Button type="submit" >Suscribirme</Button>
            </Form.Item>

        </Form>
    )
}



