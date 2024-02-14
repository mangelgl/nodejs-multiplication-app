import { CreateTable } from "../../src/domain/use-cases/create-table.use-case";

describe('domain/create-table.use-case', () => {

    test('should create a table with default values', () => {

        const createTable = new CreateTable();
        const table = createTable.execute({ base: 5 });
        const splitTable = table.split('\n').length;

        expect( createTable ).toBeInstanceOf( CreateTable );
        expect( table ).toMatch('5 x 4 = 20');
        expect( table ).toContain('5 x 5 = 25');
        expect( splitTable ).toBe(10);
    });

    test('should create a table with custom values', () => {

        const options = {
            base: 2,
            limit: 20
        }

        const table = new CreateTable().execute(options);
        const splitTable = table.split('\n').length;

        expect( table ).toContain('2 x 20 = 40');
        expect( splitTable ).toBe( options.limit );
    });
});