import http from 'k6/http'
import {check, sleep} from 'k6'

export const options = {
    stages: [{target: 10, duration: '3s'}],

    thresholds: {
        http_req_failed: ['rate < 0.01'],
    }

}

const BASE_URL = 'https://test-api.k6.io';

export function setup ()  {
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: '0.7932932431978175@mail.com',
        password: 'User123',
    });

    const token = loginRes.json('access');
    console.log('Token:', token); // Adicione esta linha para debug
    return token;

    
  
}





export default function (token) {
    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const jsonData = {
        name: 'Adalberto',
        sex: 'Male',
        date_of_birth: '24-01-2024',
    }

    console.log('Request Body:', JSON.stringify(jsonData));

    const res = http.get(`${BASE_URL}/my/crocodiles`,params);

    const resT = http.post(`${BASE_URL}/my/crocodiles`, {
        name: 'Adalberto',
        sex: 'Male',
        date_of_birth: '24-01-2024'
    });


    console.log('Response:', res.body);


    
    check(resT, {
        'sucesso ao registrar': (r) => r.status === 201
    })

}