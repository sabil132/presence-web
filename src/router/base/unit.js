import DefaultLayout from '@/layouts/default';

export default [
  {
    path: "/unit",
    name: "unit",
    component: () => import('@/views/unit/list/index.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Unit", active: true }
      ], 
    }
  },
  {
    path: "/unit/:id",
    name: "unit.detail",
    component: () => import('@/views/unit/detail/index.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Unit", url: '/unit' },
        { title: "Detail Unit", active: true}
      ], 
    }
  },
  {
    path: "/unit/create",
    name: "unit.create",
    component: () => import('@/views/unit/manage/create.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Unit", url: '/unit' },
        { title: "Create Unit", active: true}
      ], 
    }
  },
  {
    path: "/unit/edit/:id",
    name: "unit.edit",
    component: () => import('@/views/unit/manage/edit.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Unit", url: '/unit' },
        { title: "Edit Unit", active: true}
      ], 
    }
  },
];
