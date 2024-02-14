# Multiplication App - Trabajo con argumentos

1. Generar el package.json
```
npm init -y
```

2. [Configurar proyecto de Node + TypeScript](https://gist.github.com/Klerith/47af527da090043f604b972b22dd4c01)

3. [Configurar Jest con TypeScript en Node](https://gist.github.com/Klerith/98d7b1bc0f1525e892f260813cad1007)

## Paquetes
- [yargs](https://www.npmjs.com/package/yargs)


## Mock Functions / Funciones simuladas
Las funciones simuladas permiten probar los enlaces entre el código borrando la implementación real de una función, capturando llamadas a la función (y los parámetros pasados en esas llamadas), capturando instancias de funciones tipo constructor cuando se instancian con la palabra clave ```new```, y permitiendo la configuración en el momento de la prueba de valores de retorno.

Hay dos formas de simular funciones: Creando una función simulada para usar en el código de pruebas o escribiendo una simulación manualmente para anular la dependencia de un módulo.

Vamos a imaginar que estamos probando la implementación de una función ```forEach```, la cual invoca un callback para cada elemento en un array proporcionado.
```
export function forEach(items, callback) {
  for (const item of items) {
    callback(item);
  }
}
```

Para probar esta función, podemos usar una función simulada e inspeccionar el estado de la simulación para asegurarnos de que el callback se ha invocado como se esperaba.

```
const forEach = require('./forEach');

const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```

## The ```mock``` property / La propiedad ```mock```
Todas las funciones simuladas tienen una propiedad especial ```.mock``` que almacena la información sobre como la función ha sido llamada y qué devuelve la función. La propiedad mock también lleva un seguimiento del valor de ```this``` para cada llamada.