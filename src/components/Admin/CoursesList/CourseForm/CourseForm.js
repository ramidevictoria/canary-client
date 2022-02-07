import React, {useState, useEffect} from 'react';
import { notification, Form, Input, Button } from 'antd';
import { DollarCircleOutlined, GiftOutlined, LinkOutlined, KeyOutlined} from '@ant-design/icons';
import { editCourseApi, addCourseApi } from '../../../../api/course';
import { getAccessTokenApi} from '../../../../api/auth';

import './CourseForm.scss';


export default function CourseForm(props) {
    const { setIsVisibleModal, setReloadCourses, course } = props;
    const [ courseData, setCourseData] = useState({});

    useEffect(() => {
        course ? setCourseData(course) : setCourseData({});
      }, [course]);

    const editCourse = function(e) {
        const accessToken = getAccessTokenApi();

        editCourseApi(accessToken, course._id, courseData)
          .then(response => {
            
            notification['success']({
              message: response
            });
            setIsVisibleModal(false);
            setReloadCourses(true);
            setCourseData({});
          })
          .catch((err) => {
            notification["error"]({
              message: err
            });
          });
    }

    const addCourse = function() {

        if (!courseData.idCourse) {
            notification["error"]({
              message: "El id del curso es obligatorio"
            });
          } else {
            const accessToken = getAccessTokenApi();
      
            addCourseApi(accessToken, courseData)
              .then(response => {
                const typeNotification =
                  response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                  message: response.message
                });
                setIsVisibleModal(false);
                setReloadCourses(true);
                setCourseData({});
              })
              .catch(() => {
                notification["error"]({
                  message: "Error del servidor, intentelo más tarde."
                });
              });
          }
    }

    return (
        <div className="course-form">
            <AddEditForm
                course={course}
                addCourse={addCourse}
                updateCourse={editCourse}
                courseData={courseData}
                setCourseData={setCourseData}
            />
        </div>
    )
}

function AddEditForm(props) {
    const { course, addCourse, updateCourse, courseData, setCourseData} = props;

    return (
        <Form className="add-edit-form" onFinish={course ? updateCourse : addCourse}>
            <Form.Item>
                <Input 
                    prefix={<KeyOutlined />}
                    placeholder="id del curso"
                    value={courseData.idCourse}
                    onChange={(e) => setCourseData({...courseData, idCourse: e.target.value})}
                    disabled={course ? true : false}
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="url del curso"
                    value={courseData.link}
                    onChange={(e) => setCourseData({...courseData, link: e.target.value})}
                    
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<GiftOutlined />}
                    placeholder="Cupon de descuento"
                    value={courseData.coupon}
                    onChange={(e) => setCourseData({...courseData, coupon: e.target.value})}
                    
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<DollarCircleOutlined />}
                    placeholder="Precio del curso"
                    value={courseData.price}
                    onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                   
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {course ? "Actualizar curso" : "Crear curso"}
                </Button>
            </Form.Item>
        </Form>
    );
}
