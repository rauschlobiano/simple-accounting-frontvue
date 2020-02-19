import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './components/Login.vue';
import Secure from './components/Secure.vue';
import Register from './components/Register.vue';
import Dashboard from './views/user/Dashboard.vue';
import UserInfo from './views/user/UserInfo.vue';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/secure', name: 'secure', component: Secure,
      meta: { 
        requiresAuth: true
      }
    },
    { path: '/dashboard', name: 'dashboard', component: Dashboard,
      meta: { 
        requiresAuth: true
      },
      children: [
        { path: '/userinfo', name: 'userinfo', component: UserInfo,
        meta: { 
          requiresAuth: true
        }
      },
      
      ]
    },
    
    { path: '/about', name: 'about', component: About }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router