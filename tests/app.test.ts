import { Server } from "../src/presentation/server-app";

describe('App', () => {
    
    test('should call Server.run with values', async () => {
        
        const serverRunMock = jest.fn();
        Server.run = serverRunMock;
        process.argv = [ 'node', 'app.ts', '-b', '4', '-l', '5', '-s', '-f', 'test-filename', '-d', 'test-destination' ];

        await import('../src/app');

        expect( serverRunMock ).toHaveBeenCalledWith({
            base: 4,
            limit: 5,
            showTable: true,
            fileName: 'test-filename',
            fileDestination: 'test-destination'
        });
    });
});