import React, { useState } from 'react';
import { Button, Form, Input, Select, notification } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { addMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';


import './AddMenuWebForm.scss';

export default function AddMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb } = props;
    const [ menuWebData, setMenuWebData ] = useState({});
    
    const addMenu = (e) => {
        
        let finalMenu = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : 'http://') + menuWebData.url
        }

        if  (!finalMenu.title || !finalMenu.url || !menuWebData.url) {
            notification['error']({message: 'Todos los campos son obligatorios.'});
        } else {
            const accesToken = getAccessTokenApi();

            finalMenu.active = false;
            finalMenu.order = 1000;
            addMenuApi(accesToken, finalMenu)
                .then(response => {
                    notification['success']({message: response});
                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                    setMenuWebData({});
                    finalMenu = {};
                })
                .catch(error => {
                    notification['error']({message: error});
                });
        }
    }

    return (
        <div className="add-menu-web-form">
            <AddForm menuWebData={menuWebData} setMenuWebData={setMenuWebData} addMenu={addMenu} />
        </div>
    );
}

function AddForm(props) {
    const { addMenu, menuWebData, setMenuWebData } = props;
    const { Option } = Select;

    const selectBefore = (
            <Select 
                defaultValue="http://" 
                style={{width: 90}}
                onChange={e => {setMenuWebData({...menuWebData, http:e})}}
            >
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
            </Select>
        );

    return (
        <Form className="form-add" onFinish={addMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined />}
                    placeholder='Titulo'
                    value={menuWebData.title}
                    onChange={e => {setMenuWebData({...menuWebData, title: e.target.value})}}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    addonBefore={selectBefore}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => {setMenuWebData({...menuWebData, url: e.target.value})}}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType='submit' className='btn-submit'>Crear</Button>
            </Form.Item>
        </Form>
    );
}