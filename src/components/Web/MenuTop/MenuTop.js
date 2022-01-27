import React, {useState, useEffect} from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getMenusApi } from '../../../api/menu'; 
import logo from '../../../assets/img/jpg/logo.svg';

import './MenuTop.scss';
import SocialLinks from '../SocialLinks/SocialLinks';

export default function MenuTop() {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        getMenusApi()
            .then(response => {
                setMenuData(response.menus.filter(item => (item.active)));
            });   
    }, [menuData]);

    return (
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={"/"}>
                    <img src={logo} alt="canary" />
                </Link>
            </Menu.Item>
            {menuData.map(item => {
                const external = item.url.indexOf("http") > -1 ? true: false;

                if (external) {
                    return (
                        <Menu.Item key={item._id} className="menu-top-web__item" >
                            <Link target="_blank"  href={item.url}>{item.title}</Link>
                        </Menu.Item>
                    );
                } else {
                    return (
                        <Menu.Item key={item._id} className="menu-top-web__item" >
                            <Link to={item.url} >{item.title}</Link>
                        </Menu.Item>
                    );
                }
                
            })}
            
            <SocialLinks />
        </Menu>
    );
}