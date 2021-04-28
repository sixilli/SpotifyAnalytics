import '../services/CompositionApi';
import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import routes from './routes';
import { hasToken } from '../store/UserStore';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

let router = null

export default route(function ({ Vue }) {
  Vue.use(VueRouter);

  router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  router.beforeEach((to, from, next) => {
    if (to.path !== '/' && !hasToken) next('/')
    else next()
  })

  return router;
})

export { router }