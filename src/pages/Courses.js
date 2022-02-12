import React, { useState, useEffect } from "react";
import { Row, Col, Spin, notification } from "antd";
import { getCoursesApi } from "../api/course";
import PresentationCourses from "../components/Web/Courses/PresentationCourses";
import CoursesList from "../components/Web/Courses/CoursesList";
import {Helmet} from 'react-helmet';

export default function Courses() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    getCoursesApi()
      .then(courses => {
        
        setCourses(courses);
        
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor intentlo más tarde."
        });
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Cursos | Canary</title>
        <meta name="description" content="Cursos de programacion" data-react-helmet="true" />
      </Helmet>
      <Row>
        <Col md={4} />
        <Col md={16}>
          <PresentationCourses />
          {!courses ? (
            <Spin
              tip="Cargando cursos"
              style={{ textAlign: "center", width: "100%", padding: "20px" }}
            />
          ) : (
            <CoursesList courses={courses} />
          )}
        </Col>
        <Col md={4} />
      </Row>
    </>
  );
}