import express from 'express';
import { useRoutes } from './routers/Router';
import bodyParser from 'body-parser';
import { createDataBase, getTables } from '../database/connection/Connection';


const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
useRoutes(app);

createDataBase();

app.listen(PORT, () => console.log('Rodando em http://localhost:'+PORT+'/api/v1/users'));
