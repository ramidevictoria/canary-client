import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import './LayoutBasic.scss';

export default function LayoutBasic({routes}) {

    const {Header, Content, Footer} = Layout;

    return (
        <Layout>
            <h2>Slider Basic</h2>
            <Layout>
                <Content>
                <LoadRoutes routes={routes} />
                </Content>
                <Footer>
                </Footer>
            </Layout>
        </Layout>
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
