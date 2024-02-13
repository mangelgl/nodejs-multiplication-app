import fs from 'fs';
export interface SaveFileUseCase {
    execute: ( options: SaveFileOptions ) => boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    destination?: string;
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
        destination = 'outputs',
        fileName = 'table'
    }: SaveFileOptions): boolean {

        try {
            
            // Check if the output folder exists
            if (!fs.existsSync(destination)) fs.mkdirSync(destination);    
            fs.writeFileSync(`${destination}/${ fileName }.txt`, fileContent);

            return true;

        } catch (error) {
            
            console.error(error);
            return false;
        }
        
    }
}