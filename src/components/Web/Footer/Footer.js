import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import './Footer.scss';

const {Footer} = Layout;

export default function Footer() {
    return (
        <Footer className="footer">
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row>
                        <Col lg={8}></Col>
                        <Col lg={8}></Col>
                        <Col lg={8}></Col>
                    </Row>
                </Col>
                <Col lg={4} />
            </Row>

            <Row>
                <Col lg={12}>
                © 2022 All Rights reserved
                </Col>
                <Col lg={12}>
                <Link to="https://linkedin.com/in/rami-de-victoria" >rami.dev</Link>
                </Col>
            </Row>


        </Footer>
    )
}
