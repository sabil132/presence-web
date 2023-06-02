import DefaultLayout from '@/layouts/default';

export default [
  {
    path: "/presence",
    name: "presence",
    component: () => import('@/views/presence/list/index.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Presence", active: true }
      ], 
    }
  },
  {
    path: "/presence/:id/:month",
    name: "presence.detail",
    component: () => import('@/views/presence/detail/index.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Presence", url: '/presence' },
        { title: "Detail Presence", active: true}
      ], 
    }
  },
];
