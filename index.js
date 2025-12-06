require('dotenv').config(); 
const express = require('express'); 
const morgan = require('morgan'); 
const cors = require('cors'); 
const path = require('path'); 
const app = express(); 

// Definir los orígenes permitidos
const allowedOrigins = [
    /^https?:\/\/localhost(?::\d+)?$/,            
    /^https?:\/\/127\.0\.0\.1(?::\d+)?$/,         
    /^https?:\/\/.*\.web\.app$/, 
    /^capacitor:\/\/localhost$/,      
    /^ionic:\/\/localhost$/  
];

// Configuración de CORS
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Para peticiones sin origen (por ejemplo, Postman)
        const isAllowed = allowedOrigins.some(regex => regex.test(origin));
        return isAllowed ? callback(null, true) : callback(new Error(`CORS bloqueado: ${origin}`));
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware CORS
app.use(cors(corsOptions)); 

// Establecer encabezado "Vary" para manejar solicitudes con diferentes orígenes
app.use((req, res, next) => {
    res.setHeader('Vary', 'Origin');
    next();
});

// Configuración de Express para manejar JSON y URL encoded data
app.use(express.json({ limit: '1mb', type: ['application/json', 'text/plain']}));  
app.use(express.urlencoded({ extended: true })); 

// Usar Morgan para el registro de solicitudes HTTP
app.use(morgan('dev')); 

// Puerto del servidor
const PORT = process.env.PORT || 3000; 

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
}); 

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Servidor funcionando'); 
}); 

// Routing para API de usuarios (futuro)
const v1Users = require('./src/routes/users.router'); 
const v1Task = require('./src/routes/task.router'); 
app.use('/api/v1/users', v1Users); 
app.use('/api/v1/task', v1Task); 
