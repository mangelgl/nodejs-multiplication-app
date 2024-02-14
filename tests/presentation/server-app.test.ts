import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { Server } from '../../src/presentation/server-app';

describe('server-app', () => {

    const options = {
        base: 4,
        limit: 10,
        showTable: false,
        fileName: 'test-filename',
        fileDestination: 'test-destination'
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create ServerApp instance', () => {

        const serverApp = new Server();
        expect( serverApp ).toBeInstanceOf( Server );
        expect( typeof Server.run ).toBe('function');
    });

    test('should run Server with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute' );
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );        

        Server.run(options);

        expect( logSpy ).toHaveBeenCalledTimes(2);
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenLastCalledWith('File created!');

        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });

        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        })
    });

    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue('4 x 5 = 20');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        Server.run(options);

        expect( logMock ).toHaveBeenCalledWith('Server running...');
        expect( createTableMock ).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect( saveFileMock ).toHaveBeenCalledWith({
            fileContent: '4 x 5 = 20',
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
        expect( logErrorMock ).not.toHaveBeenCalled();

    })
});