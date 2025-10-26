import express from 'express';
import { SerialPort } from 'serialport';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import appRouter from './backend/routes/router.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// setup
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/', appRouter);

const swaggerDocs = YAML.load('./swagger.yaml');

swaggerDocs.servers = [
    {
        url: `http://localhost:${port}`,
    },
];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});