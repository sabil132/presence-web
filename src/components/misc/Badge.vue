<template>
  <div
    class="flex items-center font-bold w-fit px-3 py-2 text-xs"
    :class="{
      'rounded-md': roundedMd == true,
      'rounded-full': roundedFull == true,
    }"
    :style="{ background: `${color}` }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "#F5F5F5",
    },
    roundedFull: {
      type: Boolean,
      default: true,
    },
    roundedMd: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
