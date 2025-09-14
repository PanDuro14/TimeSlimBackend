const dbRemote = require('./remote'); 
const dbLocal = require('./local'); 

const connection = (async (component) => {
    let pool;
    try {
        await dbRemote.connect(); 
        console.log(`Conexión con la db remota exitosa: ${component}`); 
        pool = dbRemote; 
    } catch (errRemote) {
        console.warn('Error con la db remota. Intentando conexión local...', errRemote ); 
        try {
            await dbLocal.connect(); 
            console.log(`Conexión con la db local exitosa: ${component}`); 
            pool = dbLocal; 
        } catch (errLocal){
            console.error('Error al conectar con la db local: ', errLocal.message); 
        }
    }
})(); 

module.exports = { connection }; 