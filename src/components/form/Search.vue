<template>
  <div class="grid grid-cols-[auto,84px] bg-white-primary rounded">
    <div class="flex items-center">
      <slot />
    </div>
    <div class="relative min-h-[36px]">
      <div
        class="absolute top-0 bottom-0 right-0 flex items-center justify-center px-4 m-0"
      >
        <label
          class="relative m-0"
          :class="{
            'cursor-pointer': !disabled,
            'cursor-default opacity-50': disabled,
          }"
        >
          <input
            :value="filter.keyword"
            type="text"
            class="rounded-lg text-sm py-[10px] duration-200 max-h-[36px] min-w-[36px] text-spacecadet-100"
            :class="{
              'w-[200px] max-w-[unset] px-10 focus:outline-none border border-spacecadet-primary':
                isActive,
              'w-[36px] max-w-[36px] px-0 bg-transparent': !isActive,
            }"
            :readonly="disabled"
            @focus="handleFocusSearch"
            @input="handleInput"
          >
          <i
            class="absolute duration-200 text-soldier-500 top-1/2 transform -translate-y-1/2"
            :class="{ 'translate-x-2': !isActive }"
            :style="`left: ${leftPosition};`"
          >
            <SvgFinder :color="$store.root.getPalletes.primaryColor" />
          </i>
        </label>
        <i
          v-if="isActive"
          class="text-base-2 absolute top-1/2 transform -translate-y-1/2 right-5 p-2 cursor-pointer"
          @click="handleBlurSearch"
        ><span class="text-spacecadet-100">x</span></i>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      default() {
        return {
          filter: "",
        };
      },
    },
  },
  data() {
    return {
      isActive: false,
      filter: this.modelValue || {
        keyword: "",
      },
    };
  },
  computed: {
    leftPosition() {
      return this.isActive ? '10px' : '22%';
    },
  },
  watch: {
    filter: {
      handler: function (val) {
        this.$emit("update:modelValue", val.keyword);
      },
      deep: true,
    },
    modelValue : {
      handler: function (val) {
        this.filter.keyword = val;
      },
      deep: true,
    }
  },
  methods: {
    handleFocusSearch() {
      if (this.disabled) return;
      this.isActive = true;
    },
    handleBlurSearch() {
      if (this.filter.keyword) {
        this.filter.keyword = "";
      }
      this.isActive = false;
    },
    handleInput: debounce(function (event) {
      this.filter.keyword = event.target.value;
    }, 300),
  },
};
</script>
