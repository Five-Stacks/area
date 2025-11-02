/* Import modules */
import cors from 'cors';

/* CORS middleware */
const corsSetup = cors({
    origin: [
        'http://localhost:8081',
        'http://localhost:8082',
        'https://area.pintardware.dev'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
});

/* Export CORS middleware */
export default corsSetup;
