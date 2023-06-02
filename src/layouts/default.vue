<template >
  <div class="flex min-h-screen bg-['#f8f8f8']">
    <sidebar />
    <div class="w-full flex flex-col p-5 ml-[17%]">
      <navHeader/>
      <div class="py-5">
        <breadcrumb v-if="$route.meta.breadcrumb[0].title !== 'Dashboard'" />
        <div class="py-5">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navHeader from '@/components/main/navHeader.vue';
import sidebar from '@/components/main/sidebar.vue';
import breadcrumb from '../components/misc/breadcrumb.vue';

export default {
  components: {
    sidebar,
    navHeader,
    breadcrumb
  }
}
</script>
<style>
    
</style>