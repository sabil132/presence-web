<template>
  <div
    class="flex items-center"
    :class="[containerClass]"
  >
    <div
      class="flex items-center"
      :class="[contentClass]"
    >
      <input
        :id="id"
        v-model="model"
        type="radio"
        :value="value"
        class="appearance-none w-5 h-5 rounded-full transition duration-200 cursor-pointer"
        :class="{
          'active-radio': model === value,
          'bg-spacecadet-20': model !== value,
        }"
        @change="handler"
      >
    </div>
    <label
      v-if="!renderHtml"
      :for="id"
      class="text-xs text-spacecadet-80 cursor-pointer w-11/12"
      v-html="label"
    />
    <label
      v-else
      :for="id"
      class="text-xs text-spacecadet-80 cursor-pointer w-11/12"
      v-html="label"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default() {
        return 'radio-' + Math.random().toString(36).slice(2, 7);
      },
    },
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    modelValue: {
      required: true,
    },
    label: {
      type: String,
      default() {
        return '';
      },
    },
    handler: {
      type: Function,
      default: () => {}
    },
    contentClass:{
      type: String,
      required: false,
      default() {
        return 'w-1/12';
      },
    },
    containerClass:{
      type: String,
      required: false,
      default() {
        return '';
      },
    },
    renderHtml: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    model: {
      get: function () {
        return this.modelValue;
      },
      set: function (newValue) {
        this.$emit('update:modelValue', newValue);
      }
    }
  }
};
</script>

<style scoped>
.active-radio {
  background-color: var(--color-primary) !important;
}
</style>
