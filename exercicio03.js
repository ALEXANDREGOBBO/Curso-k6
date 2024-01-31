import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.01'], //Definindo que a taxa de falha seja inferior a 1%
        http_req_duration: [{threshold: 'p(95) < 200', abortOnFail: true, delayAbortEval: '10s'}], //Passando um limite referente a duração da requisição (200ms) e esse limite deve ser inferior a 95%
        checks: ['rate > 0.9'] // O limite estabelece que a taxa de comunicação bem sucedida deve ser superior a 90%

    }
}


export default function(){
   const req =  http.get('http://test.k6.io')

   check(req, {
        'status code é 200:': (r) => r.status === 201
   });
   
}