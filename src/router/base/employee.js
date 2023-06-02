import DefaultLayout from '@/layouts/default';

export default [
  {
    path: "/employee",
    name: "employee",
    component: () => import('@/views/employee/list/index.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Employee", active: true }
      ], 
    }
  },
  {
    path: "/employee/:id",
    name: "employee.detail",
    component: () => import("@/views/employee/detail/index.vue"),
    meta: {
      layout: DefaultLayout,
      breadcrumb: [
        { title: "Home", url: "/home" },
        { title: "Employee", url: "/employee" },
        { title: "Detail Employee", active: true}
      ]
    }
  },
  {
    path: "/employee/create",
    name: "employee.create",
    component: () => import('@/views/employee/manage/create.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Employee", url: '/employee' },
        { title: "Create Employee", active: true}
      ], 
    }
  },
  {
    path: "/employee/edit/:id",
    name: "employee.edit",
    component: () => import('@/views/employee/manage/edit.vue'),
    meta: {
      layout: DefaultLayout,  
      breadcrumb: [
        { title: 'Home', url: '/dashboard' },
        { title: "Employee", url: '/employee' },
        { title: "Edit Employee", active: true}
      ], 
    }
  },
];
