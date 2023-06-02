import DefaultLayout from '@/layouts/default';

export default [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      layout: DefaultLayout, 
      breadcrumb: [
        { title: 'Dashboard', active: true },
      ], 
    }
  },
];
