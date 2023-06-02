<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2 lg:gap-6">
      <h4 class="text-xl">
        {{ tableTitle }}
      </h4>
      <!-- Filter -->
      <!-- <div
        v-if="buttonShowFilter"
        class="flex items-center"
      >
        <transition name="bounce">
          <div v-if="showFilter">
            <TableFilter
              v-model="pagination"
              :custom-filter="customFilter"
              class="prevent-class transition duration-300"
            />
          </div>
        </transition>
      </div> -->
      <!-- Search -->
      <!-- <div
        v-if="buttonShowSearch"
        class="flex items-center gap-2 overflow-hidden"
      >
        <div>
          <TableSearch
            ref="search"
            v-model="searchInput"
            class="prevent-class transition duration-300"
            :class="{
              'slide-right': showSearch,
              'slide-left': !showSearch,
            }"
          />
        </div>
      </div> -->
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
// import IconDownload from '@/components/icons/IconDownload.vue';
export default {
  components: {
    TableSearch,
    TableFilter,
    // IconDownload
  },
  props: {
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
    value: {
      type: Object,
      required: true,
    },
    customFilter: {
      type: Array,
      default() {
        return [];
      },
    },
    buttonShowFilter: {
      type: Boolean,
      default() {
        return true;
      },
    },
    buttonShowSearch: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      pagination: {
        search: null,
        order_by: '',
      },
      searchInput: '',
      showSearch: false,
      showFilter: false,
    };
  },
  watch: {
    // value: {
    //   handler: function (newval) {
    //     this.pagination = { ...newval };
    //   },
    //   deep: true,
    // },
    // pagination: {
    //   handler(newval, oldval) {
    //     if (!isEqual(newval, oldval)) {
    //       this.$emit('input', newval);
    //     }
    //   },
    //   deep: true,
    // },
    // searchInput: debounce(function (newval) {
    //   this.$emit('input', {
    //     ...this.pagination,
    //     search: newval,
    //   });
    // }, 300),
    // showSearch: function (newval) {
    //   if (newval) {
    //     this.$refs.search.$refs.searchInput.focus()
    //   }
    // },
  },
  mounted() {
    // this.pagination = { ...this.pagination, ...this.value };
    // this.searchInput = this.value.search;
  },
  methods: {
    clickOutsideSearch() {
      this.showSearch = false;
    },
    clickOutsideFilter() {
      this.showFilter = false;
    },
  },
};
</script>
