"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = require("./routers/Router");
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("../util/util");
/* import { createDataBase } from '../database/connection/Connection';
import DocDA from '../database/DocDA';
import DocModel from '../models/DocModel';
import DocBL from '../logic/DocBL'; */
let defaultTeste = '/api/v1/docs/getDocs';
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
(0, Router_1.useRoutes)(app);
let server = app.listen(PORT, () => console.log('Rodando em: \nLocalhost: http://localhost:' + PORT + defaultTeste + '\nNetwork: http://' + util_1.results['wlp0s20f3'] + ':' + PORT + defaultTeste));
// socket connections para realtime services em docs
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:8080/', 'http://' + util_1.results['wlp0s20f3'] + ':8080/'],
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    console.log(`Usuario ${socket.id} conectado`);
    let geralDocID;
    socket.on('entrarRoom', (docID) => {
        socket.join(docID);
        socket.broadcast.to(docID).emit('novoUserRoom');
        geralDocID = docID;
        io.in(geralDocID).allSockets().then((sockets) => {
            if (sockets.size - 1 === 0) {
                console.log('primeiro usuario');
                io.to(docID).emit('primeiraEntrada', true);
            }
            else {
                socket.to(docID).emit('primeiraEntrada', false);
            }
        });
    });
    socket.on('disconnect', () => {
        console.log(`Usuario ${socket.id} desconectado`);
        io.in(geralDocID).allSockets().then((sockets) => {
            if (sockets.size === 0) {
                console.log('Não há usuarios na sala');
            }
        });
    });
    socket.on('mandarTexto', (texto) => {
        socket.broadcast.to(geralDocID).emit('mandarTextoServer', texto);
    });
});
