<template>
  <div class="relative">
    <input
      ref="searchInput"
      v-model="month"
      type="month"
      class="rounded-full py-1 px-2 w-[150px] border-2 border-solid bg-grey-light opacity-50"
    >
  </div>
</template>

<script>
export default {
  name: 'TableFilter',
  data() {
    return {
      month: this.$moment().format('YYYY-MM'),
    };
  },
  watch: {
    month(val) {
      this.$emit('update:modelValue', val);
    }
  },
};
</script>
