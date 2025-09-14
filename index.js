require('dotenv').config(); 
const express = require('express'); 
const morgan = require('morgan'); 
const cors = require('cors'); 
const path = require('path'); 
const app = express(); 

const allowed = [
    /^https?:\/\/localhost(?::\d+)?$/,            
    /^https?:\/\/127\.0\.0\.1(?::\d+)?$/,         
    /^https?:\/\/.*\.web\.app$/, 
    /^capacitor:\/\/localhost$/,      
    /^ionic:\/\/localhost$/  
]; 

const corsOptions = {
    origin(origin, cb){
        if(!origin) return cb(null, true); 
        const ok = allowed.some(rx => rx.test(origin)); 
        return ok ? cb(null, true) : cb(new Error('CORS bloqueado: ' + origin)); 
    }, 
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, 
    optionsSuccessStatus: 200
}; 

app.use((res, next) => {
    res.setHeader('Vary', 'Origin'); 
    next(); 
}); 

app.set('trust proxy', 1); 
app.use(cors(corsOptions)); 
app.use(cors({
    origin: (origin, cb) => cb(null, !origin || [
        'http://localhost:8100',    
        // ... [Demas origines futuros]
    ].includes(origin)), 
    credentials: true
})); 
app.use(express.json({ limit: '1mb', type: ['application/json', 'text/plain']}));  
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev')); 

const PORT = process.env.PORT || 3000; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchado en ${PORT} :D`); 
}); 

// Rutas personalizadas 
app.get('/', (req, res) => {
    res.send(`Servidor funcionando`); 
}); 


// Routing para apis (futuro)