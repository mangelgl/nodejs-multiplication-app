import yargs, { options } from 'yargs';
/**
 * hideBin() oculta los binarios del comando 
 * para que sólo se muestren los argumentos 
 * y el archivo ejecutado
 */
import { hideBin } from 'yargs/helpers';

/**
 * !Tarea 
 * Añadir argumentos de fileName y fileDestination
 */

export const yarg = yargs( hideBin(process.argv) )
    /**
     * Configurando parámetros obligatorios y opcionales
     * y
     * validaciones adicionales
     */
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true, // es un argumento obligatorio
        describe: 'Es la base de la tabla de multiplicar'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        demandOption: false, // es un argumento opcional
        describe: 'El límite de la tabla de multiplicar'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        demandOption: false,
        describe: 'Muestra la tabla de multiplicar en consola'
    })
    .option('f', {
        alias: 'fileName',
        type: 'string',
        default : 'table',
        describe: 'Nombre del archivo'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: './outputs',
        describe: 'Ubicación del archivo'
    })
    .check( (argv, options) => {
        
        if ( argv.b < 1) throw 'Error: base must be greater than 0';        
        if ( argv.l < 1) throw 'Error: limit must be greater than 0';        
        
        return true;
    })
    .parseSync();