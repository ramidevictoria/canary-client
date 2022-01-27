import React from 'react'
import {Row, Col, Card} from 'antd';
import Person1 from '../../../assets/img/jpg/person1.jpg';
import Person2 from '../../../assets/img/jpg/person2.jpg';
import Person3 from '../../../assets/img/jpg/person3.jpg';
import Person4 from '../../../assets/img/jpg/person4.jpg';
import Person5 from '../../../assets/img/jpg/person5.jpg';
import Person6 from '../../../assets/img/jpg/person6.jpg';
import Avatar from 'antd/lib/avatar/avatar';

import './UserReviews.scss';


export default function UserReviews() {
    return (
        <Row className="user-reviews">
            
            <Col lg={4} />
            <Col lg={16} className="user-reviews__title">
                <h2>Forma parte de los miles de estudiantes en Udemy</h2>
            </Col>
            <Col lg={4} />

            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-cards">
                    <Col lg={8}><UserReview name="Harry" review="Un curso excelente, el profesor explica detalladamente como funciona react native y también como hacer componente por componente, he buscado muchos cursos de react native pero ninguno me ha enseñado tanto como este, ahora estoy desarrollando mi propia aplicación sin ningún tipo de problema gracias al curso." avatar={Person1} /></Col>
                    <Col lg={8}><UserReview name="Gwen" review="Si te gustan los cursos que profundizan en la materia, te lo recomiendo. El profesor explica de forma completa todos los conceptos necesarios para trabajar con grid. Un gran curso." avatar={Person2} /></Col>
                    <Col lg={8}><UserReview name="Ramiro" review="El contenido del curso es muy completo y de necesitar cualquier dato adicional el profesor está super pendiente para responderlo. Ya tengo creado mi E-commerce con WordPress y gran parte de la información necesaria la obtuve del curso." avatar={Person3} /></Col>
                </Row>
                <Row className="row-cards">
                    <Col lg={8}><UserReview name="Stephany" review="Empecé el curso sin saber nada de React Native y creo que lo finalizo teniendo un nivel de conocimiento como para embarcarme en realizar mi primera aplicación." avatar={Person4} /></Col>
                    <Col lg={8}><UserReview name="Glen" review="Me ha parecido un buen curso, las explicaciones muy claras y lo que enseña me ha sido muy útil para la aplicación que me habían encargado." avatar={Person5} /></Col>
                    <Col lg={8}><UserReview name="Sophia" review="Aprendes todo lo que promete el video de inicio y te da la capacidad para después crear tus propias apps. Gracias Agus por crear este curso, tenes mucho talento para explicar y se nota que te encanta hacerlo." avatar={Person6} /></Col>
                </Row>
            </Col>
            <Col lg={4} />
        </Row>
    )
}

function UserReview(props) {
    const { name, review, avatar } = props;
    const {Meta} = Card;

    return (
        <Card className="user-reviews__card">
            <p>{review}</p>
            <Meta title={name} description="Alumno de Udemy" avatar={<Avatar src={avatar} />} />
        </Card>
    );
}
