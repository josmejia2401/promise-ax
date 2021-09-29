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

## Características

- La función allSettled devuelve una promesa que se resuelve después de que todas las promesas dadas se hayan cumplido o rechazado, con una serie de objetos que describen el resultado de cada promesa.
- Se siguen rehusando las funciones de Promise.

## Installation
Se requiere tener instalado [Node.js](https://nodejs.org/) v7+ para ejecutar.

```sh
npm install --save-dev promise-ax
```

## Example
```js
const promise1 = PromiseAx.resolve(4);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, new Error("error")));
const promises = [promise1, promise2];

PromiseAx.allSettled(promises).then((results) => results.forEach((result) => console.log(result.status)));

// expected output:
// "fulfilled"
// "rejected"
```
## Pruebas

Ejecutar npm test --maxWorkers=4

## License
MIT

**Siempre gratis, siempre libre**

Construido en https://dillinger.io/