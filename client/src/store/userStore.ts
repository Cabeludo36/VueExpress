import { createStore } from 'vuex'
import UserService from '@/services/UserService'
import { UserAuth } from '@/services/UserService';
import router from '@/router/router';


export const userStore = createStore({
  state: {
      uname: '',
      uemail: '',

      err: ''
  },
  getters: {
    isLoggedIn: state => {
      return state.uname !== '' && state.uemail !== '';
    }
  },
  mutations: {
  },
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getUser() {
      const user = {name: this.state.uname, email: this.state.uemail};
      if(user.name == ''
        || user.name == null) return;
      
      this.state.uname = user.name;
      this.state.uemail = user.email;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async login({ commit }, user: UserAuth) {

      try {
        const res = await UserService.login(user.email, user.password);
        if(res.id != null) {
          this.state.uname = res.name;
          this.state.uemail = res.email;
          router.push('/');
        }
        else
          this.state.err = 'Usuário ou senha incorretos';
      } catch (err) {
        this.state.err = 'Erro ao tentar logar';
      }
      this.dispatch('getUser');
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async logout() {
      this.state.uname = '';
      this.state.uemail = '';
      router.push('/');
    }
  },
  modules: {
  }
})