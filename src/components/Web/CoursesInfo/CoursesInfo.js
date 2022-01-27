import React from 'react';
import { Row, Col, Card } from 'antd';
import { KeyOutlined, ClockCircleOutlined, MessageOutlined, UserOutlined, DollarCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import './CoursesInfo.scss';

export default function CoursesInfo() {
    return (
        <Row className="courses-info">
        
            
            <Col lg={4} />
            <Col className="courses-info__title" lg={16}>
                <h2>Sobre los Cursos</h2>
                <h3>Cada curso cuenta con contenido bajo la web de Udemy, actica las 24 horas del dia los 365 dias del anio</h3>
            </Col>
            <Col lg={4} />

            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-cards">
                    <Col lg={8} ><CardInfo icon={<KeyOutlined />} title="Acceso 24/7" description="Accede a los cursos en cualquier momento, desde cualquier lugar sin importar día y hora."  /></Col>
                    <Col lg={8} ><CardInfo icon={<ClockCircleOutlined />} title="Cursos y Clases" description="Cursos de entre 10 y 30 horas y cada clase del curso con duración máxima de 15 minutos, faciles de llevar en tu día a día de aprendizaje." /></Col>
                    <Col lg={8} ><CardInfo icon={<MessageOutlined />} title="Aprendizaje colaborativo" description="Aprende de los demás dejando tus dudas para que profesores y compañeros te ayuden."/></Col>
                </Row>
                <Row className="row-cards">
                    <Col lg={8} ><CardInfo icon={<UserOutlined />} title="Mejora tu perfil" description="Aprende y mejora tu perfil manteniendote al dia con las nuevas tecnologias" /></Col>
                    <Col lg={8} ><CardInfo icon={<DollarCircleOutlined />} title="Precios bajos" description="Obtén el curso que necesitas por solo 9.99 y ten acceso a el por tiempo ilimitado y soporte ilimitado."  /></Col>
                    <Col lg={8} ><CardInfo icon={<CheckCircleOutlined />} title="Certificado de finalizacion" description="Al completar tu un curso recibirás una certificación que te expedirá Udemy en PDF." /></Col>
                </Row>
            </Col>
            <Col lg={4} />

        </Row>
    )
}


function CardInfo(props) {
    const { icon, title, description } = props;
    const {Meta} = Card;

    return (
        <Card className="courses-info__card">
            {icon}
            <Meta title={title} description={description} />
        </Card>
    );
}
