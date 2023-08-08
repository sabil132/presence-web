<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2 lg:gap-6">
      <h4 class="text-xl">
        {{ tableTitle }}
      </h4>
      <!-- Search -->
      <div
        class="flex items-center gap-2"
      >
        <TableSearch
          v-if="buttonShowSearch"
          ref="searchSection"
          v-model="searchInput"
          class="p-1"
        />
        <TableFilter
          v-if="buttonShowFilter"
          ref="filterSection"
          v-model="filterInput"
          class="p-1"
        />
      </div>
    </div>
    <div
      v-if="$slots.button"
      class="flex items-center justify-center"
    >
      <slot name="button" />
    </div>
    <div
      v-else
      class="flex items-center justify-center"
    >
      <button
        v-if="buttonShow"
        class="flex items-center border-none justify-center cursor-pointer rounded-md gap-x-3 px-5 py-3 bg-powergreen-primary border-2 hover:shadow-md transition duration-300"
        @click="buttonLink"
      >
        <span
          class="text-white capitalize font-semibold"
        >
          {{ buttonTitle }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { debounce, isEqual } from 'lodash';
import TableSearch from '@/components/datatable/TableSearch.vue';
import TableFilter from '@/components/datatable/TableFilter.vue';
export default {
  components: {
    TableSearch,
    TableFilter
  },
  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
      },
    },
    tableTitle: {
      type: String,
      default() {
        return '';
      },
    },
    buttonTitle: {
      type: String,
      default() {
        return '';
      },
    },
    buttonShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
    buttonLink: {
      type: Function,
      default() {
        return () => {};
      },
    },
    buttonShowSearch: {
      type: Boolean,
      default() {
        return true;
      },
    },
    buttonShowFilter: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      pagination: {},
      searchInput: '',
      filterInput: '',
    };
  },
  watch: {
    searchInput: debounce(function (newval) {
      this.$emit('update:modelValue', {
        ...this.pagination,
        search: newval,
      });
    }, 300),
    filterInput: debounce(function (newval) {
      this.$emit('update:modelValue', {
        ...this.pagination,
        filter: newval,
      });
    }, 300),
  },
};
</script>
