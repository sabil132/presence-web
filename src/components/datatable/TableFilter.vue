<template>
  <div
    class="bg-white flex flex-col z-40 justify-start absolute mt-6 w-48 rounded-md shadow-lg"
  >
    <div
      v-for="(parent, idx) in Object.keys(filterData)"
      :key="idx"
      class="mt-2"
    >
      <span class="ml-2 font-semibold">{{ formatParent(parent) }}</span>
      <div
        v-for="(data, index) in filterData[parent]"
        :key="index"
        class="gap-3 pl-5 py-3 pr-3 text-title cursor-pointer"
        :class="{
          // 'rounded-t-md': index == 0,
          'rounded-b-md':
            idx === Object.keys(filterData).length - 1 &&
            index == filterData[parent].length - 1,
          'filter-active': value[data.key] === data.value,
          'filter hover:text-white': value[data.key] !== data.value,
        }"
        @click="$event => filterInput($event, parent, index)"
      >
        <span class="text-sm">{{ data.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { groupBy, startCase } from 'lodash';

export default {
  name: 'TableFilter',
  props: {
    customFilter: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      selected: {},
      filterData: [
        {
          label: 'Asc',
          value: 'asc',
          key: 'order_by',
        },
        {
          label: 'Desc',
          value: 'desc',
          key: 'order_by',
        },
      ],
    };
  },
  mounted() {
    if (this.customFilter.length > 0) {
      this.filterData = groupBy(
        [...this.filterData, ...this.customFilter],
        item => item.key,
      );
    } else {
      this.filterData = groupBy([...this.filterData], item => item.key);
    }
  },
  methods: {
    formatParent(string) {
      return startCase(string);
    },
    filterInput(val, parent, index) {
      this.selected = this.filterData[parent][index];

      this.$emit('input', {
        ...this.value,
        [this.filterData[parent][index].key]:
          this.filterData[parent][index].value,
        });
    },
  },
};
</script>

<style scoped>
.filter-active {
  color: #fff !important;
  background-color: var(--color-primary) !important;
}
.filter:hover {
  background-color: var(--color-primary) !important;
}
</style>
