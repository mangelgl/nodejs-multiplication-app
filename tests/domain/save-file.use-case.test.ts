import fs from 'fs';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';

describe('domain/save-file.use-case', () => {

    const customOptions = {
        fileContent:'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    }
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    afterEach(() => {

        const outputsFolderExists = fs.existsSync('outputs');
        if ( outputsFolderExists ) fs.rmSync('outputs', { recursive: true });

        const customOutputsFolderExists = fs.existsSync( customOptions.fileDestination );
        if ( customOutputsFolderExists ) fs.rmSync(customOptions.fileDestination, { recursive: true });
    });

    test('should save a file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'testCase'
        }

        const result = saveFile.execute(options);        
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );
    });

    test('should save a file with custom values', () => {
        
        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( customOptions.fileContent );

    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpyOn = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );
        const result = saveFile.execute({ fileContent: 'testCase' });

        expect( result ).toBeFalsy();

        mkdirSpyOn.mockRestore();
    });

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpyOn = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );
        const result = saveFile.execute({ fileContent: 'testCase' });

        expect( result ).toBeFalsy();

        writeFileSpyOn.mockRestore();
    });


});