import express from 'express';
import { useRoutes } from './routers/Router';
import bodyParser from 'body-parser';
import { Socket } from 'socket.io';
import { results } from '../util/util';
// import { createDataBase } from '../database/connection/Connection';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
useRoutes(app);


let server = app.listen(PORT, () => console.log('Rodando em: \nLocalhost: http://localhost:'+PORT+'/api/v1/users/getUsers\nNetwork: http://'+results['wlp0s20f3']+':'+PORT+'/api/v1/users/getUsers'));


// socket connections para realtime services em docs
const io:Socket = require('socket.io')(server, {
        cors: {
            origins: ['http://localhost:8080/', 'http://'+results['wlp0s20f3']+':8080/'],
            methods: ["GET", "POST"]
        }
});

io.on('connection', (socket:Socket) => {
    console.log(`Usuario ${socket.id} conectado`);


    socket.on('disconnect', () => {
        console.log(`Usuario ${socket.id} desconectado`);
        
    });

    socket.on('mandarTexto', (data:any) => {
        socket.broadcast.emit('mandarTextoServer', data);
    });
});