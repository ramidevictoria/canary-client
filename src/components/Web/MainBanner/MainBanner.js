import React from 'react';
import {Row, Col} from 'antd';

import './MainBanner.scss';

export default function MenuBanner(props) {


    return (
        <div className="menu-banner">
             <div className="menu-banner__dark">
                <Row>
                    <Col lg={4} />
                    <Col lg={16}>
                        <h2>Aprende nuevas tecnologias web y movil.</h2>
                        <h3>
                            A traves de cursos practicos, concisos y actualizados, creados por {" "}
                            <br />
                            profesionales con anios de experiencia.
                        </h3>
                    </Col>
                    <Col lg={4} />
                </Row>
             </div>
        </div>
    );
}