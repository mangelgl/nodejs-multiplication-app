import { yarg } from "./config/plugins/yargs.plugin";
import { Server } from "./presentation/server-app";

// Argument values
/* console.log(process.argv);

console.log(yarg);
console.log(yarg.b); */

/**
 * Funciones autoejecutables
 */
(async() => {
    await main();
})();

async function main() {
    const { b:base, l:limit, s:showTable, f:fileName, d:destination } = yarg;

    Server.run( { base, limit, showTable, fileName, fileDestination: destination } );
}