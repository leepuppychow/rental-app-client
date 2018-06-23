import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
  ],
});
