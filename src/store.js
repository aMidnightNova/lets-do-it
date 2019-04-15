import Vuex from "vuex";
import Vue from 'vue'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: {
        first: 'Midnight',
        last: 'Rift'
      },
      username:'MidnightRift',
      email:'amvmoody@gmail.com'
    },
    isAuthorized: true,
    todoLists: [
      {name:'Food', items:['grape','banana','tea']},
      {name:'Epoch', items:['grape','banana','tea']},
      {name:'Raziel', items:['grape','banana','tea']}

    ]

  },
  getters: {
    getUserName(state) {
      return state.user.username;
    },
    getName(state) {
      return state.user.name;
    },
    getTodoLists(state) {
      return state.todoLists;
    }
  },
  mutations: {
    addTodoList: function (state, payload) {
      let {todoLists} = state;
      todoLists.push({
        name:payload, items:[]
      });
      Vue.set(state, 'todoLists', todoLists);
    }
  },
  actions: {
    addTodoList: function (context, payload) {
      context.commit('addTodoList', payload);
    }
  }
});
