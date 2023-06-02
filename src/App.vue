<template>
  <div class="">
    <component :is="layout">
      <router-view :key="$route.fullPath" />
    </component>
    <UtilsLoading v-if="isLoading" />
  </div>
</template>
<script>

export default {
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.layout
    },
    isLoading() {
      return this.$store.global.isLoading
    },
  },
};
</script>
