<template>
  <div class="flex items-center space-x-3">
    <div class="flex items-center space-x-3">
      <p class="text-3xl font-medium">{{ this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1].title }}</p>
      <span>|</span>
    </div>
    <div v-for="menu in $route.meta.breadcrumb">
      <router-link 
        v-if="menu.url" 
        :to="menu.url"
        class="text-powergreen-primary"
      >
        {{ menu.title }} 
      </router-link>
      <span 
        v-else
        class="text-black"
      >
        {{ menu.title }}
      </span>
      <span 
        v-if="this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1].title !== menu.title"
        class="ml-1"
      >
        >
      </span>
    </div>
  </div>
</template>