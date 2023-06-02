<template>
  <div class="bg-white shadow-global w-full">
    <!-- Header Card -->
    <div 
      v-if="withHeader" 
      class="text-lg font-medium p-4"
    >
      {{ title }}
    </div>
    <hr class="border "/>
    <!-- Body Card -->
    <div class="p-4">
      <slot />
    </div>
    <!-- Footer Card -->
    <hr class="border "/>
    <div 
      v-if="withFooter"
      class="flex justify-end"
    > 
      <slot name="footer" />
      <div 
        v-if="!$slots.footer"
        class="flex space-x-2 p-4"
      >
        <button
          type="submit"
          class="md:ml-0 font-bold py-2 px-10 rounded-md flex items-center justify-center text-powergreen-primary border border-powergreen-primary"
          @click="action"
        >
          <span class="text-base">{{ titleAction }}</span>
        </button>

        <slot name="action" />

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Card Title'
    },
    withHeader: {
      type: Boolean,
      default: true
    },
    withFooter: {
      type: Boolean,
      default: true
    },
    titleAction: {
      type: String,
      default: 'Discard'
    },
    action: {
      type: Function,
      default: () => {}
    },
  }
}
</script> 
<style>
  
</style>