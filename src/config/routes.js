// Admin pages
import LayoutAdmin from '../layouts/LayoutAdmin';
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn';
import AdminUsers from '../pages/Admin/Users';
import MenuWeb from '../pages/Admin/MenuWeb';
import AdminCourses from '../pages/Admin/Courses';
import AdminBlog from '../pages/Admin/Blog';
import Blog from '../pages/Blog';
import Courses from '../pages/Courses';

// Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import LayoutBasic from '../layouts/LayoutBasic';

//Other
import Error404 from '../pages/Error404';

const routes = [
    {
        path: '/admin',
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: '/admin',
                component: AdminHome,
                exact: true
            },
            {
                path: '/admin/login',
                component: AdminSignIn,
                exact: true
            },
            {
                path: '/admin/users',
                component: AdminUsers,
                exact: true
            },
            {
                path: '/admin/menu',
                component: MenuWeb,
                exact: true
            },
            {
                path: '/admin/courses',
                component: AdminCourses,
                exact: true
            },
            {
                path: '/admin/blog',
                component: AdminBlog,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: '/',
        component: LayoutBasic,
        exact: false,
        routes : [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                path: '/contact',
                component: Contact,
                exact: true
            },
            {
                path: '/courses',
                component: Courses,
                exact: true
            },
            {
                path: '/blog',
                component: Blog,
                exact: true
            },
            {
                path: "/blog/:url",
                component: Blog,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
]

export default routes;