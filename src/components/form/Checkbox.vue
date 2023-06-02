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
        type="checkbox"
        :value="value"
        class="w-5 h-5 rounded-sm transition duration-200 cursor-pointer appearance-none checkbox"
        :class="{
          'active-checkbox': model.includes(value),
          'bg-spacecadet-20': !model.includes(value),
        }"
        @change="handler"
      >
    </div>
    <label
      v-if="!renderHtml"
      :for="id"
      class="text-xs text-spacecadet-80 cursor-pointer w-11/12"
    >
      {{ label }}
    </label>
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
      type: [String, Number],
      default() {
        return 'radio-' + Math.random().toString(36).slice(2, 7);
      },
    },
    value: {
      type: [String, Number, Boolean, Object],
      required: true,
    },
    modelValue: {
      type: [Array, Object],
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
  emits: ['update:modelValue'],
  computed: {
    model: {
      get: function () {
        return this.modelValue;
      },
      set: function (newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
    styling() {
      return this.$store.root.getPalletes
    },
  }
};
</script>

<style scoped>
.active-checkbox {
  background-color: var(--color-primary) !important;
}
.checkbox {
  display: grid;
  place-content: center;
}

.checkbox::before {
  content: "";
  width: 1em;
  height: 1em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em white;
  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.checkbox:checked::before {
  transform: scale(1);
}

</style>