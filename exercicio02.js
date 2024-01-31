import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';
import { Gauge } from 'k6/metrics'
import { Rate } from 'k6/metrics'
import { Trend } from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter ('QuantidadeDeChamadas');
const myGauge = new Gauge('TempoBloqueado')
const myRate = new Rate('TaxaDeRequisicao200')
const myTrend = new Trend('TaxaDeEspera')

export default function(){
   const res =  http.get('http://test.k6.io');
   //contador
   chamadas.add(1)
   //medidor 
   myGauge.add(res.timings.blocked)
   //taxa  
   myRate.add(res.status === 200)
   //tendencia
   myTrend.add(res.timings.waiting)
}