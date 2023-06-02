import DefaultLayout from '@/layouts/default';

export default [
  {
    path: "/position",
    name: "position",
    component: () => import('@/views/position/list/index.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Position", active: true }
      ], 
    }
  },
  {
    path: "/position/create",
    name: "position.create",
    component: () => import('@/views/position/manage/create.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Position", url: '/position' },
        { title: "Create Position", active: true}
      ], 
    }
  },
  {
    path: "/position/edit/:id",
    name: "position.edit",
    component: () => import('@/views/position/manage/edit.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Position", url: '/position' },
        { title: "Edit Position", active: true}
      ], 
    }
  },
];
