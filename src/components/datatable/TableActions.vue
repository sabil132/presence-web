<template>
  <div
    ref="parentDiv"
    class="bg-white absolute w-48 rounded-md shadow-lg z-50"
    :class="{
      parent: !willOverflow,
      'parent-reverse': willOverflow,
    }"
  >
    <div
      v-for="(value, index) in actionData"
      :key="index"
      class="actions text-title cursor-pointer gap-3 py-3 px-4 hover:text-white p-2"
      :class="{
        'rounded-t-md': index === 0,
        'rounded-b-md': actionData.length - 1 === index,
      }"
      @click="handlerAction(value)"
    >
      <span class="text-sm">{{ value[0].toUpperCase() + value.slice(1) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableActions',
  props: {
    data: {
      type: [Object, Array, String, Number],
      default() {
        return null;
      },
    },
    actionEdit: {
      type: Function,
      default: () => ({}),
    },
    actionDetail: {
      type: Function,
      default: () => ({}),
    },
    actionDelete: {
      type: Function,
      default: () => ({}),
    },
  },
  data() {
    return {
      willOverflow: false,
      actionData: [],
    };
  },
  mounted() {
    this.initActions();
    this.determineOverflow();
  },
  methods: {
    determineOverflow() {
      const element = this.$refs.parentDiv;
      const parentTable = element.closest('.table-body');

      this.willOverflow =
        parentTable.getBoundingClientRect().bottom - 110 <
        element.getBoundingClientRect().bottom;
    },
    initActions() {
      if (this.actionDetail.toString() !== '() => ({})') {
        this.actionData = [...this.actionData, 'details'];
      }

      if (this.actionEdit.toString() !== '() => ({})') {
        this.actionData = [...this.actionData, 'edit'];
      }

      if (this.actionDelete.toString() !== '() => ({})') {
        this.actionData = [...this.actionData, 'delete'];
      }
    },
    handlerAction(type) {
      switch (type) {
        case 'edit':
          this.actionEdit(this.data);
          break;

        case 'delete':
          this.actionDelete(this.data);
          break;

        case 'details':
        default:
          this.actionDetail(this.data);
          break;
      }
    },
  },
};
</script>

<style scoped>
.parent {
  transform: translateX(-120%);
}
.parent-reverse {
  transform: translate(-120%, -100%);
}
.actions:hover {
  background-color: rgba(31, 164, 70, 1) !important;
}
</style>
