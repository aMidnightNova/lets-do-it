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
      username: 'MidnightRift',
      email: 'amvmoody@gmail.com'
    },
    isAuthorized: true,
    todoLists: [
      {
        title: 'Food',
        archived: false,

        tasks: [
          {name: 'grape', completed: true},
          {name: 'banana', completed: false},
          {name: 'tea', completed: false},
          {name: 'Meat', completed: true},
          {name: 'More Meat', completed: false},
          {name: 'Cheese', completed: false}
        ]
      },
      {
        title: 'Camping',
        archived: false,

        tasks: [
          {name: 'Tent', completed: false},
          {name: 'Sleeping Bag', completed: false},
          {name: 'Camp Chair', completed: false}]
      },
      {
        title: 'Chores',
        archived: false,

        tasks: [
          {name: 'Rake Yard', completed: false},
          {name: 'Vacuum Floor', completed: false},
          {name: 'Go Shopping', completed: false}]
      },
      {
        title: 'Party',
        archived: true,

        tasks: [
          {name: 'Cake', completed: false},
          {name: 'Ice Cream', completed: false},
          {name: 'Presents', completed: false}]
      }
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
      return state.todoLists.filter(item => !item.archived);
    },
    getArchivedTodoLists(state) {
      return state.todoLists.filter(item => item.archived);
    },
    getTodoListsCount(state) {
      return state.todoLists.filter(item => !item.archived).length;
    },
    getTodoList: (state) => (title) => {  // the backend will stop duplicate titles.
      return state.todoLists.filter(item => item.title === title)[0];
    },
    getTodoListItemsCount: (state) => (title) => { // the backend will stop duplicate titles.
      return state.todoLists.filter(item => item.title === title)[0].tasks.length;
    }
  },
  mutations: {
    addTodoList: function (state, payload) {
      let {todoLists} = state;
      todoLists.push({
        title: payload,
        archived: false,
        tasks: []
      });
      Vue.set(state, 'todoLists', todoLists);
    },
    addItem2TodoList: function (state, payload) { //papyload = {listTitle,name}
      let {todoLists} = state;
      let index = todoLists.findIndex(item => item.title === payload.listTitle);
      todoLists[index].tasks.push(
          {name: payload.name, completed: false}
      );

      Vue.set(state, 'todoLists', todoLists);

    },
    toggleTaskItem: function (state, payload) { //papyload = {listTitle,name}
      let {todoLists} = state;
      let todoIndex = todoLists.findIndex(item => item.title === payload.listTitle);

      let taskIndex = todoLists[todoIndex].tasks.findIndex(item => item.name === payload.name);
      todoLists[todoIndex].tasks[taskIndex].completed = !todoLists[todoIndex].tasks[taskIndex].completed;

      Vue.set(state, 'todoLists', todoLists);

    },
    toggleAllTaskItems: function (state, payload) { //papyload = {listTitle,bool}
      let {todoLists} = state;
      let todoIndex = todoLists.findIndex(item => item.title === payload.listTitle);

      todoLists[todoIndex].tasks.forEach(function (item, arr, index) {
        item.completed = payload.bool;
      });


      Vue.set(state, 'todoLists', todoLists);

    },
    archiveTodoList: function (state, payload) {
      let {todoLists} = state;
      let index = todoLists.findIndex(item => item.title === payload);
      todoLists[index].archived = true;

      Vue.set(state, 'todoLists', todoLists);

    },
    unarchiveTodoList: function (state, payload) {
      let {todoLists} = state;
      let index = todoLists.findIndex(item => item.title === payload);
      todoLists[index].archived = false;

      Vue.set(state, 'todoLists', todoLists);

    }
  },
  actions: {
    addTodoList: function (context, payload) {
      context.commit('addTodoList', payload);
    },
    addItem2TodoList: function (context, payload) { // papyload = {listTitle,name}
      context.commit('addItem2TodoList', payload);

    },
    toggleTaskItem: function (context, payload) { // papyload = {listTitle,name}
      context.commit('toggleTaskItem', payload);
    },
    toggleAllTaskItems: function (context, payload) { // papyload = {listTitle,name}
      context.commit('toggleAllTaskItems', payload);
    },
    archiveTodoList: function (context, payload) { // papyload = {listTitle,name}
      context.commit('archiveTodoList', payload);
    },
    unarchiveTodoList: function (context, payload) { // papyload = {listTitle,name}
      context.commit('unarchiveTodoList', payload);
    }
  }
});
