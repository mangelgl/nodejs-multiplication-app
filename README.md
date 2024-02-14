# Multiplication App - Trabajo con argumentos

Instalamos las dependencias necesarias
```
npm i
```
## Enlaces de interés
- [Configurar proyecto de Node + TypeScript](https://gist.github.com/Klerith/47af527da090043f604b972b22dd4c01)
- [Configurar Jest con TypeScript en Node](https://gist.github.com/Klerith/98d7b1bc0f1525e892f260813cad1007)

## Paquetes
- [yargs](https://www.npmjs.com/package/yargs)

## Understanding Jest Mocks / Entendiendo las simulaciones de Jest
Mocking es una técnica para aislar sujetos de prueba reemplazando las dependencias con objetos que se pueden controlar e inspeccionar. Una dependencia puede ser cualquier cosa de la que el sujeto dependa, pero normalmente es un módulo que el sujeto importa. Cuando hablamos sobre mocking en Jest, normalmente hablamos sobre reemplazar dependencias con la función Mock.

## Mock Functions / Funciones simuladas
El objetivo del mocking (simulación) es reemplazar algo que no controlamos con algo que sí controlamos, así que es importante que lo que reemplazamos tenga todas las características que necesitemos.

La función Mock aporta funcionalidades para:
- Capturar llamadas / Capture calls
- Establecer valores de retorno / Set return values
- Cambiar la implementación de una función / Change the implementation

La manera más simple de crear una instancia de una función Mock es con ```jest.fn()```.

Con esto y el método de Jest Expect ```expect(this).toBe(that)``` es fácil probar las llamadas capturadas:
```
test('returns undefined by default', () => {
  const mock = jest.fn();

  let result = mock('foo');

  expect( result ).toBeUndefined();
  expect( mock ).toHaveBeenCalled();
  expect( mock ).toHaveBeenCalledTimes(1);
  expect( mock ).toHaveBeenCalledWith('foo');
});
```

y podemos cambiar el valor de return, la implementación (contenido de la función/método) o la resolución de una promesa:
```
test('mock implementation', () => {
  const mock = jest.fn(() => 'bar');

  expect( mock('foo') ).toBe( 'bar' );
  expect( mock ).toHaveBeenCalledWith( 'foo' );
});

test('also mock implementation', () => {
  const mock = jest.fn().mockImplementation(() => 'bar');

  expect( mock('foo') ).toBe( 'bar' );
  expect( mock ).toHaveBeenCalledWith( 'foo' );
});

test('mock implementation one time', () => {
  const mock = jest.fn().mockImplementationOnce(() => 'bar');

  expect( mock('foo') ).toBe( 'bar' );
  expect( mock ).toHaveBeenCalledWith( 'foo' );

  expect( mock('baz') ).toBe( undefined );
  expect( mock ).toHaveBeenCalledWith( 'baz' );
});

test('mock return value', () => {
  const mock = jest.fn();
  mock.mockReturnValue('bar');

  expect( mock('foo') ).toBe( 'bar' );
  expect( mock ).toHaveBeenCalledWith( 'foo' );
});

test('mock promise resolution', () => {
  const mock = jest.fn();
  mock.mockResolvedValue('bar');

  expect( mock('foo') ).resolves.toBe( 'bar' );
  expect( mock ).toHaveBeenCalledWith( 'foo' );
});
```

## Mocking Modules and Functions / Módulos y funciones del Mocking
- jest.fn: Simula una función
- jest.mock: Simula un módulo
- jest.spyOn: Espía o simula una función
