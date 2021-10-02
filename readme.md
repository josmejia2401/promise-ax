# Promise Ax
Promise Ax (Promesa) es usado para computaciones asíncronas. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.

100% compatible con Promise por defecto del sistema.

_Siempre gratis, siempre libre_
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


## Funciones
- All
- allSettled
- race
- reject
- resolve

## Nuevas Características
- Se agrega la función createPromise, la permite crear una nueva promesa (Promise), y la cual define las funciones declaradas en la sección de funciones.
- Esta bibliotecta es totalmente compatible con Promise del sistema, funciones y peticiones asíncronas, entre otras.
- La función allSettled devuelve una promesa que se resuelve después de que todas las promesas dadas se hayan cumplido o rechazado, con una serie de objetos que describen el resultado de cada promesa.
- La actual versión (2.0.0) no es compatible con versiones anteriores.

## Instalación
Se requiere tener instalado [Node.js](https://nodejs.org/) v7+ para ejecutar.

```sh
npm install --save-dev promise-ax
```

## Ejemplo
```js
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
promiseAx.allSettled(promisesToMake).then((results) => results.forEach((result) => console.log(result)))
// Salida esperada:
// 4
// Error: error
// error
// 8
// errorAx
// 100
```
## Pruebas
Ejecutar npm test --maxWorkers=4

## License
MIT

## Otros
- Repositorio en Git: https://github.com/josmejia2401/promise-ax
- Repositorio en Npm: https://www.npmjs.com/package/promise-ax

**Siempre gratis, siempre libre**