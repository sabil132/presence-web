import { createRouter, createWebHistory } from 'vue-router';
import pipeline from '@/middlewares/pipeline'
import rules from '@/middlewares/rules'

// autoload routes
const modules = import.meta.globEager('./**/*.js')

// setting router
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth'
    };
  },
  routes: Object.entries(modules)
    .map(([path, m]) => {
      return m.default
    })
    .flatMap(arr => arr)
});

// Apply midleware
router.beforeEach((to, from, next) => {
  // prepare variable
  const middleware = to.meta.middleware ? to.meta.middleware : [rules.authentication];
  const context = {
    to,
    from,
    next,
  }

  return middleware[0]({
    ...context,
    next:pipeline(context, middleware, 1)
  })
})

export default router;
