
const runCommand = async ( args: string[] ) => {

    process.argv = [ ...process.argv, ...args ];

    const { yarg } = await import('../../../src/config/plugins/yargs.plugin');
    return yarg;
}

describe('yargs.plugin', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        /**
         * Reseteamos los argumentos a su valor original, 
         * ya que cada test que hacemos añade argumentos al process.argv
         * Véase función runCommand()
         */
       process.argv = originalArgv;
       jest.resetModules(); 
    });

    test('should return default values', async () => {

        const argv = await runCommand(['-b','4']);

        expect( argv ).toEqual(expect.objectContaining(
            {
                b: 4,
                l: 10,
                s: false,
                f: 'table',
                d: './outputs',
            }
        ));
    });

    test('should return custom values', async () => {

        const argv = await runCommand(['-b','9','-l','20','-s','true','-f','custom','-d','custom-outputs']);

        expect( argv ).toEqual(expect.objectContaining(
            {
                b: 9,
                l: 20,
                s: true,
                f: 'custom',
                d: 'custom-outputs',
            }
        ));
    });
});