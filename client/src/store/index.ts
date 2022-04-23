import { createStore } from 'vuex'
import io, { Socket } from 'socket.io-client'

export default createStore({
  state: {
    socket: {} as Socket
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    criaSocket() {
        // colocar o endereço do servidor
        // Network ou link do servidor
        if(window.location.hostname != 'localhost'){
          this.state.socket = io('http://'+ window.location.hostname +':5000') as Socket
        } else {
          this.state.socket = io('http://localhost:5000') as Socket
        }
    },
    desconectaSocket() {
      this.state.socket.disconnect()
    }
  },
  modules: {
  }
})
