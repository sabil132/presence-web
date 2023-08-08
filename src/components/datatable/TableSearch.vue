<template>
  <div class="relative">
    <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 place-content-center text-gray-500">
      <img
        class="w-6"
        src="@/assets/img/icons/search.svg"
        alt=""
      >
    </span>
    <input
      ref="searchInput"
      v-model="keyword"
      type="text"
      class="rounded-full py-1 pl-12 w-64 border-2 border-solid bg-grey-light opacity-50"
      placeholder="Search..."
    >
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'TableSearch',
  data() {
    return {
      keyword: '',
    };
  },
  watch: {
    keyword(val) {
      this.searchInput(val);
    }
  },
  methods: {
    searchInput: debounce(function (val) {
      this.$emit('update:modelValue', val);
    }, 300)
  },
};
</script>
