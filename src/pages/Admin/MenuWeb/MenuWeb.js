import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { getMenusApi } from '../../../api/menu';
import  MenuWebList  from '../../../components/Admin/MenuWeb/MenuWebList';


import './MenuWeb.scss';

export default function MenuWeb() {
    const [menu, setMenu] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb ] = useState(false);

    //get the menus and reload page
    useEffect(() => {
        getMenusApi()
        .then(response => {
            setMenu(response.menus);
            setReloadMenuWeb(false);
        })
        .catch(err => {
            notification['error']({message: err});
        });
    }, [setReloadMenuWeb]);



    return (<div className="menu-web">
            <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
        </div>);
}