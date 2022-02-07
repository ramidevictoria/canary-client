import React, {useState, useEffect } from 'react';
import { notification } from 'antd';
import {getCoursesApi} from '../../../api/course';
import CoursesList from '../../../components/Admin/CoursesList';

import './Courses.scss';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [reloadCourses, setReloadCourses] = useState(false);

    useEffect(function(){

        getCoursesApi()
            .then(courses => {setCourses(courses);})
            .catch(err => {
                notification['error']({message: err});   
            });
        
        setReloadCourses(false);

    }, [reloadCourses]);

    return (
        <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
    )
}
