<template>
  <div class="flex flex-col px-5 py-5">
    <!-- header -->
    <div class="flex items-center space-x-3 px-3">
      <img 
        src="@/assets/img/logo/logo-green.png" 
        alt="logo-green"
        class="w-10"
      >
      <p class="text-xl text-powergreen-primary font-medium">Motiolabs</p>
    </div>
    <!--  -->
    <div 
      v-for="(item, index) in listMenu" 
      class="mt-7"
    >
      <div 
        v-for="section in listMenu[index]"
        class="text-md"
      >
        <div class="text-gray-500 px-3 mb-1">
          {{ section.name }}
        </div>
        <div 
          v-for="menu in section.menu">
          <div 
            class="py-2 px-3 text-black dinamyc-menu"
            :class="{
              'active': menu.url === `/${$route.path.split('/')[1]}`
            }"
            @click="$router.push(menu.url)"
          >
            {{ menu.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listMenu: [
        {
          section: {
            name: 'MENU',
            menu: [
            {
              name: 'Dashboard',
              url: '/dashboard',
            },
            {
              name: 'Position',
              url: '/position',
            },
            {
              name: 'Unit',
              url: '/unit',
            },
            {
              name: 'Employee',
              url: '/employee',
            },
            {
              name: 'Presence',
              url: '/presence',
            }
          ]
          },
        }
      ]
    }
  },
}
</script>
<style>
.dinamyc-menu:hover {
  background: linear-gradient(90deg, rgba(31,164,70) 41%, rgba(31,164,70,.2) 95%, rgba(31,164,70,.1) 100%);
  color: #FFFFFF !important;
  cursor: pointer;
  border-radius: 6px;
  margin-left: 5px;
  transition: margin-left 0.5s;
}
.active {
  background: linear-gradient(90deg, rgba(31,164,70) 41%, rgba(31,164,70,.2) 95%, rgba(31,164,70,.1) 100%);
  color: #FFFFFF !important;
  cursor: pointer;
  border-radius: 6px;
}
</style>