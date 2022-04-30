import { createStore } from 'vuex'
import UserService from '@/services/UserService'
import { User } from '@/services/UserService';
import router from '@/router/router';


export const userStore = createStore({
  state: {
    user: {} as User,

    err: ''
  },
  getters: {
    isLoggedIn: state => {
      return state.user.name != null && state.user.email != null;
    }
  },
  mutations: {
  },
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getUser() {
      const user = {name: this.state.user.name, email: this.state.user.email, id: this.state.user.id};
      if(user.name == ''
        || user.name == null) return;
      
      this.state.user.name = user.name;
      this.state.user.email = user.email;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async login({ commit }, user: User) {

      try {
        const res = await UserService.login(user.email, user.password);
        console.log(res);
        
        if(res.id != null) {
          this.state.user = res;
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
      this.state.user.email = '';
      this.state.user.name = '';
      router.push('/');
    }
  },
  modules: {
  }
})