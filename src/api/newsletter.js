import { basePath, apiVersion} from './config';

export function addNewsletterApi(email) {

    const url = `${basePath}/${apiVersion}/add-newsletter`;

    const params = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({email: email.toLowerCase()})
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result.message;   
    })
    .catch(err => {
        return err.message;    
    });
}