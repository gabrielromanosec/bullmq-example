# bullmq-example

Para instalar dependências:
npm i

Para instalar redis:
https://redis.io/

Etapas:
1º Inicie o redis (Windows: redis cliente / Linux: redis-server)

2° Inicie o server.js (node server.js)

3° Inicie o worker.js (node worker.js)

4º Curl para criar uma tarefa: 
```
curl --location 'localhost:3000/consultaTeste' \
--header 'Content-Type: application/json' \
--data '{
    "cpf": "12345678911"
}'
```
5° Curl para verificar o status da tarefa:
```
curl --location --request GET 'localhost:3000/status/{{ID JOB}}' \
--header 'Content-Type: application/json' \'
```

--------------------------------------------------
DashBoard configurável:
http://localhost:3000/admin/queues/queue
