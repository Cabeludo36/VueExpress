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
      this.state.socket = io('http://localhost:5000') as Socket
    },
    desconectaSocket() {
      this.state.socket.disconnect()
    }
  },
  modules: {
  }
})
