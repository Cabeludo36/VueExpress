"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = require("./routers/Router");
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("../util/util");
const Connection_1 = require("../database/connection/Connection");
const MsgBL_1 = require("../logic/MsgBL");
let defaultTeste = '/api/v1/docs/getDocs';
const PORT = process.env.PORT || 5000;
(0, Connection_1.createDataBase)();
(0, Connection_1.getTables)().then((rows) => {
    console.log(rows);
});
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
                io.to(docID).emit('primeiraEntrada', true);
            }
            else {
                socket.to(docID).emit('primeiraEntrada', false);
            }
        });
    });
    socket.on('sairRoom', (docID) => {
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
    socket.on('mandarTexto', (texto) => {
        socket.broadcast.to(geralDocID).emit('mandarTextoServer', texto);
    });
    // chat
    socket.on('sendMsg', (msg) => {
        MsgBL_1.MsgBL.saveMsg(msg);
        io.to(geralDocID).emit('receveMsg', msg);
    });
});
