import React from 'react';
import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses';
import CoursesInfo from '../components/Web/CoursesInfo';
import UserReviews from '../components/Web/UserReviews';
import { Helmet } from 'react-helmet';

export default function Home() {
    
    return (
    <>
        <Helmet>
            <title>Canary</title>
            <meta name="description" content="Canary, cursos de programacion" data-react-helmet="true" />
        </Helmet>
        <MainBanner />
        <HomeCourses />
        <CoursesInfo />
        <UserReviews />
    </>
    );
}