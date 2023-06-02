<template>
  <div class="flex flex-col">
    <label
      for="fileInput"
      class="text-spacecadet-100 text-sm"
    >
      {{ title }}
      <span
        v-if="required"
        class="text-red-500"
      >*</span>
    </label>
    <input
      ref="file"
      class="hidden"
      type="file"
      name="fileInput"
      :accept="accepted"
      @change="selectFile"
    >
    <span class="flex cursor-pointer">
      <input
        id="fileInput"
        v-model="filename"
        class="cursor-pointer rounded-l-lg px-6 py-2 border-t border-b border-l text-gray-800 border-gray-200 bg-white w-full disabled:bg-[#e5e7eb] disabled:border-2 disabled:border-[#d1dce4] disabled:cursor-not-allowed"
        :placeholder="placeholder"
        readonly
        :disabled="inputDisabled"
        @click="$refs.file.click()" 
      >
      <button
        v-if="!hideButtonUpload"
        :class="[
          buttonClass,
          { '!bg-gray-300 cursor-default': disabled }
        ]"
        type="button"
        :disabled="disabled"
        :style="{ 'background-color': $store.root.getPalletes.primaryColor }"
        class="px-4 py-2 rounded-r-lg text-white font-bold disabled:cursor-not-allowed"
        @click="handler(selected)"
      >{{ uploadText }}</button>

      <div
        v-else
        class="px-4 py-2 rounded-r-lg text-white font-bold min-w-fit"
        :style="{ 'background-color': $store.root.getPalletes.primaryColor }"
        @click="$refs.file.click()" 
      >{{ uploadText }}</div>
    </span>
    <small
      v-if="subtitle"
      class="text-gray-400 mt-1"
    >{{ subtitle }}</small>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    },
    subtitle: {
      type: String,
      default () {
        return ''
      }
    },
    placeholder: {
      type: String,
      default () {
        return ''
      }
    },
    accepted: {
      type: String,
      default () {
        return '*'
      }
    },
    uploadText: {
      type: String,
      default () {
        return 'Upload'
      }
    },
    modelValue: {
      type: [File, String],
      default () {
        return ''
      }
    },
    handler: {
      type: Function,
      default () {
        return () => {}
      }
    },
    buttonClass: {
      type: String,
      default () {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    },
    inputDisabled: {
      type: Boolean,
      default () {
        return false
      }
    },
    required: {
      type: Boolean,
      default() {
        return false
      }
    },
    hideButtonUpload: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data () {
    return {
      filename: '',
      selected: {}
    }
  },
  watch: {
    modelValue: function(newval) {
      this.filename =  newval === null || typeof newval === 'string' ? newval : newval.name
    }
  },
  methods: {
    selectFile (event) {
      const mimeTypes = this.accepted.replace(/;/, '').split(',')
      const filesTemp = [...event.target.files].filter(item => mimeTypes.some((mime) => item.type.match(mime)))

      if (filesTemp.length > 0) {
        this.selected = event.target.files[0]
        this.filename = this.selected && this.selected.name ? this.selected.name : ''
        this.$emit('update:modelValue', this.selected)
      }
      else{
        this.$swal('Failed', 'Mime types not accepted', 'warning')
      }
    }
  }
}
</script>
