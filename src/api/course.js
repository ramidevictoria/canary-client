import {basePath, apiVersion} from './config';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../utils/constants';

export function getCoursesApi() {
    const url = `${basePath}/${apiVersion}/get-courses`;

    return fetch(url)
        .then(result => {
            return result.json();
        })
        .then(response => {
            return response.courses;
        })
        .catch(err => {
            return err.message;
        });
}

export function getCourseDataUdemyApi(id) {
    const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;
    const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`;
    const url = baseUrl + coursesParams;
  
    return fetch(url)
      .then(async response => {
        return { code: response.status, data: await response.json() };
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
}

export function addCourseApi(accessToken, course) {
    const url = `${basePath}/${apiVersion}/add-course`;
    const params = {
        method: 'POST',
        headers: {
            type: 'Application/json',
            Authentication: accessToken
        },
        body: JSON.stringify(course)
    }

    return fetch(url, params)
        .then(result => {
            return result.json();   
        })
        .then(response => {
            return response.message;   
        })
        .catch(err => {
            return err.message;   
        });

}

export function editCourseApi() {
    console.log('edit');
}

export function deleteCourseApi() {
    console.log('delete');
}
