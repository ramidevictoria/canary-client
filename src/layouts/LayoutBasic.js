import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Row, Col, Layout } from 'antd';
import './LayoutBasic.scss';
import MenuTop from '../components/Web/MenuTop';
import Menu from 'rc-menu';

export default function LayoutBasic(props) {
    const { routes } = props;
    const { Content, Footer} = Layout;

    return (
        <>
        <Row>
            <Col lg={4} />
            <Col lg={16}>
                <MenuTop />
                
            </Col>
            <Col lg={4} />
        </Row>
        <LoadRoutes routes={routes} />
        <Footer >Canary</Footer>
        </>
    );
}


function LoadRoutes({routes}) {

    return (
        <Switch>
            { routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                />
            ))}
        </Switch>
    );
}
