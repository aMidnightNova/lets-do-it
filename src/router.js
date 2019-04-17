import Vue from 'vue'
import Router from 'vue-router'
import Todo from './components/Todo.vue'
import Dashboard from './components/Dashboard.vue'
import Archived from './components/Archived.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'Dashboard' }
    },
    {
      path: '/:userName/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/:userName/todos/:todoList',
      name: 'Todo',
      component: Todo
    },
    {
      path: '/:userName/archived',
      name: 'Archived',
      component: Archived
    }
  ]
})
