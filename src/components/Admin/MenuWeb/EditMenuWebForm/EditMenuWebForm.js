import React, {useState, useEffect } from 'react';
import { Form, Input, Item, Button, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import { updateMenuApi } from '../../../../api/menu';

import './EditMenuWebForm.scss'; 

export default function EditMenuWebForm(props) {
    const { menu, setReloadMenuWeb, setIsVisibleModal } = props;
    const [ menuWebData, setMenuWebData] = useState(menu);

    useEffect(() => {
        setMenuWebData(menu);
    }, [menu]);

    const editMenu = () => {

        if (!menuWebData.title || !menuWebData.url) {
            notification['error']({message: 'Todos los campos son obligatorios.'});
        } else {
            const accesToken = getAccessTokenApi();

            updateMenuApi(accesToken, menuWebData._id, menuWebData)
                .then(response => {
                    notification['success']({message: response});
                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                    
                })
                .catch(err => {
                    notification['error']({message: err});   
                });
        }
    }

    return (
        <div className="edit-menu-web-form">
            <EditMenu menuWebData={menuWebData} setMenuWebData={setMenuWebData} editMenu={editMenu} />
        </div>
    );
}

function EditMenu(props) {
    const { menuWebData, setMenuWebData, editMenu } = props;

    return (
        <Form className="form-edit" onFinish={editMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined />}
                    placeholder="Titulo"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({...menuWebData, title: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({...menuWebData, url: e.target.value})}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit" >Actualizar Menu</Button>
            </Form.Item>
        </Form>
    );
}