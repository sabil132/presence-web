import AuthLayout from '@/layouts/auth';

export default [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/auth/login/index.vue'),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/auth/reset/index.vue'),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: '/activation',
    name: 'activation',
    component: () => import('@/views/auth/activate/index.vue'),
    meta: {
      layout: AuthLayout
    }
  },
]