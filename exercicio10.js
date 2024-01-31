import http from 'k6/http';
import {sleep, check} from 'k6';

// teste de carga de 10 vu por 10s
// requisições com sucesso 95%
// requisições com falaha < 1%
// duração da requisição

export const options = {
    stages : [{target: 10, duration: '10s'}],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'], 
        http_req_duration: ['p(95) < 3000'],
    }
 
}

export default function(){
    const BASE_URL ='https://test-api.k6.io';

    const USER = `${Math.random()}@mail.com`;
    const PASS = 'User123';

    console.log( USER + PASS);

    const res = http.post(`${BASE_URL}/user/register/`, {
        username: USER,
        first_name: 'crocodilo',
        last_name: 'dino',
        email: USER,
        password: PASS
    });


    check(res, {
        'sucesso ao registrar': (r) => r.status === 201
    })

    sleep('1');

}    