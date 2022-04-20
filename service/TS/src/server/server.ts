import express from 'express';
import { useRoutes } from './routers/Router';
import bodyParser from 'body-parser';
import { Socket } from 'socket.io';
// import { createDataBase } from '../database/connection/Connection';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
useRoutes(app);

let server = app.listen(PORT, () => console.log('Rodando em http://localhost:'+PORT+'/api/v1/users/getUsers'));

const io:Socket = require('socket.io')(server, {
        cors: {
            origins: ['http://localhost:8080/'],
            methods: ["GET", "POST"]
        }
});

io.on('connection', (socket:Socket) => {
    console.log(`Usuario ${socket.id} conectado`);
    socket.on('disconnect', () => {
        console.log(`Usuario ${socket.id} desconectado`);
    });

    socket.on('mandarTexto', (data:any) => {
        console.log(data);
        socket.broadcast.emit('mandarTextoServer', data);
    });

    socket.on('ping', (n:number) => {
        console.log(`Usuario ${socket.id} pingou ${n}`);
    });
});