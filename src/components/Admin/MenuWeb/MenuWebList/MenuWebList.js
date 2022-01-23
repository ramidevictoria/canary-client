import React, { useState, useEffect } from 'react';
import { Switch, List, Icon, Button, Modal as ModalAntd, notification } from 'antd';
import {EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable';
import { updateMenuApi, activateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi} from "../../../../api/auth";
import AddMenuWebForm from '../AddMenuWebForm';

import './MenuWebList.scss';

const {confirm} = ModalAntd;

export default function MenuWebList(props) {
    const { menu, setReloadMenuWeb } = props;
    const [ listItems, setListItems ] = useState([]);
    const [ isVisibleModal, setIsVisibleModal ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null);

    const activateMenu = (menu, status) => {
        const accesToken = getAccessTokenApi();

        activateMenuApi(accesToken, menu._id, status)
            .then(response => {
                notification['success']({message: response});
                //setReloadMenuWeb(true);
            })
            .catch(err => {
                notification['error']({message: err});
                   
            });
    };

    useEffect(() => {
        let listItemsArray = [];
        
        menu.forEach(item => {
            listItemsArray.push({content: (<MenuItem item={item} activateMenu={activateMenu} />)});
        });
        setListItems(listItemsArray); 
    }, [menu]);

    const onSort = (sortedList, dropEvent) => {
        const accesToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;

            updateMenuApi(accesToken, _id, {order});
        });
    }

    

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle('Creando nuevo menu');
        setModalContent(<AddMenuWebForm setIsVisibleModal={setIsVisibleModal} setReloadMenuWeb={setReloadMenuWeb} />);
    }

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal}>Crear nuevo menu</Button>
            </div>
            
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical" activateMenu={activateMenu} />
            </div>

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

function MenuItem(props) {
    const { item, activateMenu } = props; 

    return (
        <List.Item
            actions={[
                <Switch defaultChecked={item.active} onChange={e => {activateMenu(item, e)}} />,
                <Button type="primary"><EditOutlined /></Button>,
                <Button type="danger" ><DeleteOutlined /></Button>
            ]}
        >
            <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
    );
}   
