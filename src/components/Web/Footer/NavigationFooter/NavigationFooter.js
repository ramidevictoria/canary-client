import React from 'react';
import { Row, Col } from 'antd';

import './NavigationFooter.scss';

export default function NavigationFooter() {
    return (
        
            <Row className="navigation-footer">
                <Row >
                    <Col md={12}>
                        <RenderListLeft />
                    </Col>
                    <Col md={12}>
                        <RenderListRight />
                    </Col>
                </Row>
            </Row>
       
    )
}


function RenderListLeft() {
    return (
      <ul>
        <li>
          <a href="#">
             Cursos Online
          </a>
        </li>
        <li>
          <a href="#">
             Desarrollo Web
          </a>
        </li>
        <li>
          <a href="#">
            Base de Datos
          </a>
        </li>
        <li>
          <a href="#">
             Politica de Privacidad
          </a>
        </li>
      </ul>
    );
  }
  
  function RenderListRight() {
    return (
      <ul>
        <li>
          <a href="#">
             Sistemas / Servidores
          </a>
        </li>
        <li>
          <a href="#">
            CMS
          </a>
        </li>
        <li>
          <a href="#">
            Porfolio
          </a>
        </li>
        <li>
          <a href="#">
            Política de Cookies
          </a>
        </li>
      </ul>
    );
  }