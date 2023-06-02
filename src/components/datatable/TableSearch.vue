<template>
  <div class="relative">
    <span
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 place-content-center text-gray-500"
    >
      <!-- <img
        src="/public/img/icons/search.svg"
        alt=""
      > -->
    </span>
    <input
      ref="searchInput"
      :value="value"
      type="text"
      class="rounded-full py-2.5 pl-8 w-96 border-none bg-grey-light opacity-50"
      placeholder="Search by title"
      @input="$event => searchInput($event)"
    >
  </div>
</template>
<script>
import { debounce } from 'lodash';
export default {
  name: 'TableSearch',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    searchInput: debounce(function (val) {
      this.$emit('input', val.target.value);
    }, 300),
  },
};
</script>
