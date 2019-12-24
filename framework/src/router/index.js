import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
export { navRoutes } from './routes'

Vue.use(VueRouter)

const createRouter = () => new VueRouter({
  mode: 'history',
  routes: routes,
  scrollBehavior: () => ({ y: 0 })
})

const router = createRouter()

// router.beforeEach(async (to, from, next) => {
//   //
// })

// router.afterEach(() => {
//   // finish progress bar
// })

export default router
