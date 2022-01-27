import React from 'react'
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import cssGrid from '../../../assets/img/jpg/css-grid.jpg';
import javascript from '../../../assets/img/jpg/javascript-es6.jpg';
import prestahop from '../../../assets/img/jpg/prestashop-1-7.jpg';
import reactjs from '../../../assets/img/jpg/react-js-hooks.jpg';
import reactnative from '../../../assets/img/jpg/react-native.jpg';
import wordpress from '../../../assets/img/jpg/wordpress.jpg';

import './HomeCourses.scss';

export default function HomeCourses() {
    return (
        <Row className="home-courses">
            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-courses">
                
                    <Col lg={6}><CardCourse image={cssGrid} title="Css Grid" subtitle="som css grid" link="som grid" /></Col>
                    <Col lg={6}><CardCourse image={javascript} title="Css Grid" subtitle="som css grid" link="som grid" /></Col>
                    <Col lg={6}><CardCourse image={prestahop} title="Css Grid" subtitle="som css grid" link="som grid" /></Col>
                    <Col lg={6}><CardCourse image={reactjs} title="Css Grid" subtitle="som css grid" link="som grid" /></Col>
                
                </Row>

                <Row className="row-courses">
                    <Col lg={6}><CardCourse image={reactnative} title="Css Grid" subtitle="som css grid" link="som grid" /></Col>
                    <Col lg={6}></Col>
                    <Col lg={6}></Col>
                    <Col lg={6}><CardCourse image={wordpress} title="Css Grid" subtitle="som css grid" link="som grid" /></Col>
                </Row>
            </Col>
            <Col lg={4}/>

            
            <Col lg={24} className="home-courses__more">
                <Link to={'/courses'} ><Button>ver mas</Button></Link>
            </Col>
            
        </Row>

        
    )
}

function CardCourse(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card
                className='home-courses__card'
                cover={<img src={image} alt={title} />}
                actions={[<Button>INGRESAR</Button>]}
            >

                <Meta title={title} description={subtitle} />
            </Card>
            
        </a>
    );
}
