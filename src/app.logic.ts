import fs from "fs";
import { yarg } from "./config/plugins/yargs.plugin";

/* const base = 5;
const currentPath = process.env.PWD;
let outputMessage = `
==========================
    Tabla del ${base}
==========================
`;

for (let index = 1; index < 11; index++) {
    outputMessage += `${base} x ${index} = ${base * index}\n`;
}

// Check if the output folder exists
if (!fs.existsSync(`${currentPath}/outputs`)) { 
    
    // Create a output folder
    fs.mkdirSync(`${currentPath}/outputs` , { recursive: true });    
}

fs.writeFileSync(`${currentPath}/outputs/output.txt`, outputMessage);
console.log(outputMessage); */

/**
 * ! Tarea
 * Implementar en el ejercicio anterior los argumentos recibidos por consola
 */

const { b: base , l: limit, s: showTable } = yarg

const currentPath = process.env.PWD;
let outputMessage = `
===========================
        Tabla del ${base}
===========================
`;

if(showTable) console.log(outputMessage);