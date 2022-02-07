import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import MyInfo from './MyInfo';
import NavigationFooter from './NavigationFooter';
import Newsletter from '../Newsletter/Newsletter';

import './Footer.scss';



export default function Footer() {
    const {Footer} = Layout;

    return (
        <Footer className="footer">
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row>
                        <Col lg={8}><MyInfo /></Col>
                        <Col lg={8}><NavigationFooter /></Col>
                        <Col lg={8}><Newsletter /></Col>
                    </Row>
                </Col>
                <Col lg={4} />
            </Row>

            <Row>
                <Col lg={24} className="footer__footer">
                    © 2022 All Rights reserved
                
                    <div className="footer__credit">Developed by <Link to={"https://linkedin.com/in/rami-de-victoria"} >rami.dev</Link></div>
                
                </Col>
            </Row>


        </Footer>
    )
}
