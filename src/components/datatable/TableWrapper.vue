<template>
  <div class="flex flex-col py-4 rounded-lg bg-white shadow-global relative">
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </div>
</template>

<script>
export default {
};
</script>
