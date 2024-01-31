//1. Inicilização - Carrega arquivos locais e importa modulos
import sleep from 'k6';

//2. Configuração - Quantidade usuários virtuais e tempo de carga
export const options = {
    vus: 1,
    duration: '10s'
}

//3. Execução - Onde será executada execução do teste de fato

export default function(){
    console.log("Testando o k6");
    sleep(1);
}

//4. Desmontagem - Encerra o teste
export function teardown(data){
    console.log(data)
}