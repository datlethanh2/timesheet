import axios from 'axios';
const apiAxios = axios.create({
    baseURL: 'http://training-api-timesheet.nccsoft.vn/',
    headers: {
            'Content-Type': 'application/json', 
            //"accept": "text/plain",
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`,
    }         
});

export default apiAxios;