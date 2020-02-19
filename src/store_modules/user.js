
import axios from 'axios';

//axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.baseURL = "http://52.221.235.144/api";
//axios.defaults.baseURL = "http://localhost:8008/api";
//axios.defaults.baseURL = process.env.API_URL;


const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    //userInfo : {},
    //userInfoLoaded: false,
};
const mutations = {
  auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    set_userInfo(state, userinfo){
      state.user = userinfo;
    },
    userInfo_status(state, stat)
    {
      state.userInfo_status = stat;
    }
};
const actions = {
    login({commit}, user){
      return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: '/apilogin', data: user, method: 'POST' })
          .then(resp => {
              //console.log(resp.data.user[0]);
              localStorage.removeItem('token');
              const token = resp.data.token;
              const user = resp.data.user;
              localStorage.setItem('token', token);
              //localStorage.setItem('x', user[0]);
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = token;
              commit('auth_success', token, user);              
              // commit('set_userInfo', user_info);              
              resolve(resp);
              //context.dispatch('getUserInfo');
              
          })
          .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              localStorage.removeItem('x')
              reject(err)
          })
      })
    },
    getUserInfo({commit}){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: '/profile', method: 'GET' })
          .then(resp => {
              //commit('set_userInfo', resp.data.userdetails);
              //commit('userInfo_status', true);
              //console.log('Loaded User Details');
          })
          .catch(err => {
              commit('auth_error');
              commit('userInfo_status', false);                   
              console.log('Error loading User Details');
          })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: '/register', data: user, method: 'POST' })
          .then(resp => {
              const token = resp.data.token;
              const user = resp.data.user;
              localStorage.setItem('token', token);
              //localStorage.setItem('x', user);
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token, user)
              resolve(resp)
          })
          .catch(err => {
              commit('auth_error', err)
              localStorage.removeItem('token')
              //localStorage.removeItem('x')
              reject(err)
          })
    })
  },
    logout({commit}){
      return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
      })
    }
};
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  get_token: state => state.token,
  //get_user: state => state.user,
  //user_information: state => state.userInfo,
  //user_information_status: state => state.userInfoLoaded,
};

export default {
    state,
    mutations,
    actions,
    getters
}