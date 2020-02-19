import Vue from 'vue';
import Vuex from 'vuex';
import User from './store_modules/user';
//import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
	//disabled createPersistedState for security reasons, just use it later....
	//plugins: [createPersistedState()],
	modules: {
		User
	}
})
