import http from 'k6/http';
import {check, sleep} from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages : [
        {target: 100, duration: '10s'}
    ],

    thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(95) < 250']
    } 
}

const BASE_URL = 'https://test-api.k6.io';

export function setup () {
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: '0.7932932431978175@mail.com',
        password: 'User123',
    });

    const token = loginRes.json('access');
    return token;

}

export default function (token) {
    
    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const res = http.get(`${BASE_URL}/my/crocodiles`,params);

    check(res, {
        'status code 200': (r) => r.status === 200
    })


}

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }

