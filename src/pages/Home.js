import React from 'react';
import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses';
import CoursesInfo from '../components/Web/CoursesInfo';
import UserReviews from '../components/Web/UserReviews';

export default function Home() {
    
    return (
    <div>
        <MainBanner />
        <HomeCourses />
        <CoursesInfo />
        <UserReviews />
    </div>
    );
}