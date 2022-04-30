import express from 'express';
import { useRoutes } from './routers/Router';
import bodyParser from 'body-parser';
import { Socket } from 'socket.io';
import { results } from '../util/util';
import { createDataBase } from '../database/connection/Connection';


let defaultTeste = '/api/v1/docs/getDocs';
const PORT = process.env.PORT || 5000;

createDataBase();

const app = express();
app.use(bodyParser.json());
useRoutes(app);


let server = app.listen(PORT, () => console.log('Rodando em: \nLocalhost: http://localhost:'+PORT+defaultTeste+'\nNetwork: http://'+results['wlp0s20f3']+':'+PORT+defaultTeste));


// socket connections para realtime services em docs
const io:Socket = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:8080/', 'http://'+results['wlp0s20f3']+':8080/'],
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket:Socket) => {
    console.log(`Usuario ${socket.id} conectado`);
    let geralDocID: string;
    
    socket.on('entrarRoom', (docID:string) => {
        socket.join(docID);
        socket.broadcast.to(docID).emit('novoUserRoom');
        geralDocID = docID;
        io.in(geralDocID).allSockets().then((sockets) => {
            if (sockets.size - 1  === 0) {
                io.to(docID).emit('primeiraEntrada', true);
            }
            else {
                socket.to(docID).emit('primeiraEntrada', false);
            }
        });
    });

    socket.on('sairRoom', (docID:string) => {
        io.in(geralDocID).allSockets().then((sockets) => {
            if (sockets.size - 1 === 0) {
                io.to(geralDocID).emit('ultimaSaida', true);    
            }
            else
                io.to(geralDocID).emit('ultimaSaida', false);
            socket.leave(docID);    
        });
    });

    socket.on('disconnect', () => {
        console.log(`Usuario ${socket.id} desconectado`);
    });

    socket.on('mandarTexto', (texto:string) => {
        socket.broadcast.to(geralDocID).emit('mandarTextoServer', texto);
    });


});