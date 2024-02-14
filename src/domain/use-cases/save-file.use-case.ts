import fs from 'fs';
export interface SaveFileUseCase {
    execute: ( options: SaveFileOptions ) => boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {

    constructor() {
        /**
         * repository - StorageRepository
         * nos indica dónde se va a guardar el archivo
         */
    }

    execute ({
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table'
    }: SaveFileOptions): boolean {

        try {                   
            
            // Check if the output folder exists
            if (!fs.existsSync(fileDestination)) fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${fileDestination}/${ fileName }.txt`, fileContent);

            return true;

        } catch (error) {
            
            console.error(error);
            return false;
        }
        
    }
}