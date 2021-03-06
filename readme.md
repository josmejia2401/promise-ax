# Promise Ax o promise-ax
Promise Ax or promise-ax (Promesa) es usado para computaciones asíncronas. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.

100% compatible con [Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## Funciones
- _allSettledWithTimeOut_: A diferencia de _allSettled_, _allSettledWithTimeOut_ permite definir la promesa, tiempo de espera, y mensaje de error. Cada promesa o función asíncrona es ejecutada por separado y en paralelo con su tiempo de espera definido.

    ### Sintaxis
    > Promise.allSettledWithTimeOut(iterable, timeout, messageTimeOut);

    | Atributo | Tipo | Requerido  | Descripción |
    | ------ | ------ | ------ | ------ |
    | iterable | Array | SI | Un objeto iterable |
    | timeout | Number | SI | Tiempo de espera en milisegundos, por ejemplo 2000, que corresponde a 2 segundos |
    | messageTimeOut | String | NO | Mensaje de error en el caso que se vence el tiempo de espera. Mensaje por defecto: Timeout is not defined |

    ### Valor devuelto
    Un Promise que se cumplirá de forma asincrónica una vez que se hayan completado todas las promesas de la colección especificada de promesas, ya sea al cumplirse con éxito o al ser rechazadas.

- _allSettled_: Devuelve una promesa que se resuelve después de que todas las promesas dadas se hayan cumplido o rechazado, con una serie de objetos que describen el resultado de cada promesa.

    ### Sintaxis
    > Promise.allSettled(iterable);

    | Atributo | Tipo | Requerido  | Descripción |
    | ------ | ------ | ------ | ------ |
    | iterable | Array | SI | Un objeto iterable |

    ### Valor devuelto
    Un Promise que se cumplirá de forma asincrónica una vez que se hayan completado todas las promesas de la colección especificada de promesas, ya sea al cumplirse con éxito o al ser rechazadas.

- _all_: Devuelve una promesa que termina correctamente cuando todas las promesas en el argumento iterable han sido concluídas con éxito, o bien rechaza la petición con el motivo pasado por la primera promesa que es rechazada.

    ### Sintaxis
    > Promise.all(iterable);

    | Atributo | Tipo | Descripción |
    | ------ | ------ | ------ |
    | iterable | Array | Un objeto iterable |

    ### Valor devuelto
    Una Promise  que se cumplirá cuando todas las promesas del argumento iterable hayan sido cumplidas, o bien se rechazará cuando alguna de ellas se rechace.

- _race_: Retorna una promesa que se cumplirá o no tan pronto como una de las promesas del argumento iterable se cumpla o se rechace, con el valor o razón de rechazo de ésta.

    ### Sintaxis
    > Promise.race(iterable);

    | Atributo | Tipo | Descripción |
    | ------ | ------ | ------ |
    | iterable | Array | Un objeto iterable |

    ### Valor devuelto
    Una Promise que se cumple o se rechaza tan pronto como una de las promesas dadas en el argumento iterable se cumple o se rechaza.

- _reject_: Retorna un objeto Promise que es rechazado por la razón específicada.

    ### Sintaxis
    > Promise.reject(reason);

    | Atributo | Tipo | Descripción |
    | ------ | ------ | ------ |
    | reason | Object | Un objeto para rechazar |

    ### Valor devuelto
    Razón por la cual esta {jsxref("Promise")}} fue rechazada.

- _resolve_: Retorna un objeto Promise que es resuelto con el valor dado. Si el valor es una promise, esa promise es devuelta; si el valor es un thenable (si tiene un método "then"), el valor devuelto le seguirá a ese thenable, adoptando su estado; de otro modo la promise devuelta estará completada con el valor.

    ### Sintaxis
    > Promise.resolve(value);

    | Atributo | Tipo | Descripción |
    | ------ | ------ | ------ |
    | value | Object | Argumento por resolver por esta Promise. También puede ser una Promise o un thenable por resolver. |

    ### Valor devuelto
    Una Promise que es resuelta con el valor dado, o con la promise pasada como valor, si el valor era un objeto promise.

## Nuevas Características y/o cambios
- Se aumentan los casos de pruebas.
- Se agregan palabras claves para los filtros de búsquedas.
- Se eliminan dependencias innecesarias.
- Compatibilidad con EXPO para React.

## Instalación
Se requiere tener instalado [Node.js](https://nodejs.org/) v7+ para ejecutar.

```sh
npm install --save-dev promise-ax
```

## Ejemplos
```js
// Ejemplo #1: Uso de promesa del sistema en combinación con Promise-Ax
const { createPromise } = require('promise-ax');
const promiseAx = createPromise();
const promise1 = Promise.resolve(4);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, new Error("error")));
const promise3 = Promise.reject("error");
const promise4 = promiseAx.resolve(8);
const promise5 = promiseAx.reject("errorAx");
const asyncOperation = (time) => {
    return new Promise((resolve, reject) => {
        if (time < 0) {
            reject("reject");
        }
        setTimeout(() => {
            resolve(time);
        }, time);
    });
};
const promisesToMake = [promise1, promise2, promise3, promise4, promise5, asyncOperation(100)];
promiseAx.allSettled(promisesToMake).then((results) => results.forEach((result) => console.log(result)));
// Salida esperada:
// 4
// Error: error
// error
// 8
// errorAx
// 100
```

```js
// Ejemplo #2: Ejecutar promesas en paralelos con tiempo de espera con mensaje de error.
const { createPromise } = require('promise-ax');
const promiseAx = createPromise();
const asyncOperation = (time) => {
    return new Promise((resolve, reject) => {
        if (time < 0) {
            reject("reject");
        }
        setTimeout(() => {
            resolve(time);
        }, time);
    });
};
const promisesToMake = [asyncOperation(1000), asyncOperation(2000)];
promiseAx.allSettledWithTimeOut(promisesToMake, 1500, "Tiempo de espera vencido").then((results) => results.forEach((result) => console.log(result)));
// Salida esperada:
// 1000
// Error: Tiempo de espera vencido
```

```js
// Ejemplo #3: Ejecutar promesas en paralelos con tiempo de espera sin mensaje de error.
const { createPromise } = require('promise-ax');
const promiseAx = createPromise();
const asyncOperation = (time) => {
    return new Promise((resolve, reject) => {
        if (time < 0) {
            reject("reject");
        }
        setTimeout(() => {
            resolve(time);
        }, time);
    });
};
const promisesToMake = [asyncOperation(1000), asyncOperation(2000)];
promiseAx.allSettledWithTimeOut(promisesToMake, 1500).then((results) => results.forEach((result) => console.log(result)));
// Salida esperada:
// 1000
// Error: Timeout is not defined
```

## Pruebas
Ejecutar el comando:

```sh
npm test --maxWorkers=4
```

## License
MIT

## Otros
- Repositorio en Git: https://github.com/josmejia2401/promise-ax
- Repositorio en Npm: https://www.npmjs.com/~josmejia.2401

**_Siempre gratis, siempre libre_**
