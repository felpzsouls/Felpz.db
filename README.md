# Felpz.db
Uma simples database, agil e facil de usar não tem erro.

## Uso basico.
  ```js
  const db = require('felpz.db')(
  "local", // Exemplo: db ou dbs/db.
  { replacer: null, space: 2, path: "optional", split: "/" }) // Para JSON.stringify. (Opcional)
  
  db.get('felpzsouls/money') //pegar valor.
 
  db.set('felpzsouls/money', 300) //setar valor.
  
  db.add('felpzsouls/money', 200) //aumentar o valor salvo.
  
  db.subtract('felpzsouls/money', 100) //diminuir o valor salvo.
  ```
# 
## Todas as funções.
```js
db.set(ref, value) //Define um valor em uma determinada referência.
db.get(ref) //Obtém um valor de uma determinada referência.
db.delete(ref) //Exclui um valor de uma determinada referência.
db.clear() //Limpa todo o banco de dados.
db.add(ref, value) //Adiciona um valor a uma referência numérica.
db.subtract(ref, value) //Subtrai um valor de uma referência numérica.
db.push(ref, ...values) //Adiciona um ou mais valores a uma referência de array.
db.shift(ref) //Remove o primeiro elemento de uma referência de array.
db.pop(ref) //Remove o último elemento de uma referência de array.
db.splice(ref, ...args) //Remove ou adiciona elementos em uma referência de array.
db.type(ref) //Retorna o tipo de dados armazenados em uma referência.
db.entries(ref) //Retorna uma matriz de pares chave-valor para uma referência ou para todo o banco de dados.
db.keys(ref) //Retorna as chaves de uma referência ou de todo o banco de dados.
db.values(ref) //Retorna os valores de uma referência ou de todo o banco de dados.
```
