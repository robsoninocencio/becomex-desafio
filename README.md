# Para subir este backend siga as instruções abaixo:

## Tenha o docker instalado e o repositório clonado.

### Execute:
```
docker-compose up -d
```

### Se fizer alterações no código e quiser ver suas alterações funcionando execute:
```
docker-compose up -d --build
```

## Acessar no browser as rotas:

http://localhost:3334/all

http://localhost:3334/name/brasil


## Para baixar o servidor ao terminar os testes execute:
```
docker-compose down
```

## Descriçãod o projeto:

Este projeto é um backend que sobe duas máquinas, sendo uma o servidor Rest e outra máquina de cache com o Redis.
O servidor rest acessa a API deste endereço: https://restcountries.eu/rest/v2, como solicitado no desafio apenas uma vez para cada rota, depois os acessos são feitos apenas nos dados cacheado no Redis.
Eu deixei comentado no arquivo routes.js o comando ("// cache.expire(key, 10);") para se quiser estabelecer um tempo de expiração de cache.


