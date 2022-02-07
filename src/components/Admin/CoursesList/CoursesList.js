import React, { useState, useEffect} from 'react';
import { Modal as ModalAntd, Button, List, notification } from 'antd';
import DragSortableList from 'react-drag-sortable';
import Modal from '../../Modal';
import { getAccessTokenApi } from '../../../api/auth';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import CourseForm from './CourseForm';

import {getCourseDataUdemyApi, deleteCourseApi, editCourseApi, getCoursesApi } from '../../../api/course';

import './CoursesList.scss';

const { confirm } = ModalAntd;

export default function CoursesList(props) {
    const { courses, setReloadCourses } = props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listCourseArray = [];
        courses.forEach(course => {
          listCourseArray.push({
            content: (
              <Course
                course={course}
                deleteCourse={deleteCourse}
                editCourseModal={editCourseModal}
              />
            )
          });
        });
        setListCourses(listCourseArray);
      }, [courses]);

    const onSort = (sertedList, dropEvent) => {

    }

    const editCourseModal = function(course) {
        setIsVisibleModal(true);
        setModalTitle('Editar Curso')
        setModalContent(<CourseForm course={course} setReloadCourses={setReloadCourses} setIsVisibleModal={setIsVisibleModal} />);
    }

    const deleteCourse = function(course) {
        const accesToken = getAccessTokenApi();

        confirm({
        title: "Eliminando curso",
        content: `¿Estas seguro de que quieres eliminar el curso ${course.idCourse}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
            deleteCourseApi(accesToken, course._id)
            .then(response => {
                notification['success']({
                message: response
                });
                setReloadCourses(true);
            })
            .catch((err) => {
                notification["error"]({
                message: err
                });
            });
        }
        });
    }

    const addCourseModal = function() {
        setIsVisibleModal(true);
        setModalTitle('Agregar nuevo curso');
        setModalContent(<CourseForm setReloadCourses={setReloadCourses} setIsVisibleModal={setIsVisibleModal} />);
    }

    return (
        <div className="courses-list">
            <div className="courses-list__header">
                <Button type="primary" onClick={addCourseModal}>Nuevo Curso</Button>
            </div>
            <div className="courses-list__items">
            {
                listCourses.length === 0 && (<h2 style={{ textAlign: "center", margin: 0 }}>No tienes cursos creados</h2>)
            }
            </div>
            <DragSortableList items={listCourses} onSort={onSort} type="vertical" />

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}


function Course(props) {
    const {course, editCourseModal, deleteCourse} = props;
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse)
            .then(response => {
                if (response.status !== 200) {
                    notification['warning']({message: 'Curso no encontrado en Udemy'});
                }
            })
            .catch(err => {
                notification['error']({message: 'Error en Udemy'});
            })

    }, [course]) 

    return (
    
        <List.Item
            actions={[
                <Button type="primary" onClick={() =>editCourseModal(course)}><EditOutlined /></Button>,
                <Button type="danger" onClick={() =>deleteCourse(course)}><DeleteOutlined /></Button>
            ]}
        >

            <img 
            src={courseData.image_480x270}
            alt={courseData.title}
            style={{width:'100px', marginRight: '20px'}}
            
            />

            <List.Item.Meta 
                title={courseData.title + ' | id: ' + courseData.idCourse }
                description={courseData.headline}
            />

        </List.Item>
    );
}
