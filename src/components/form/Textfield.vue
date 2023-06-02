<template>
  <div class="flex flex-col">
    <label
      class="flex text-gray-500 text-xs gap-1"
      :for="id"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >*</span>
    </label>
    <div
      class="flex w-full rounded-md bg-white mt-3"
      :class="{
        'border border-celadon-40 ': whiteBorder,
      }"
    >
      <input
        :id="id"
        v-model="inputVal"
        class="w-full text-sm text-black px-2 py-2 rounded-md appearance-none outline-none"
        :class="[
          inputClass,
          {
            'bg-gray-200 cursor-not-allowed': disabled,
            '!border-red-500': error
          }
        ]"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="filterInput"
        @keyup.enter="$emit('onEnter')"
      >
      <slot name="suffixPlaceholder" />
    </div>
    <small class="text-gray-400">{{ subtitle }}</small>
    <small
      v-if="error"
      class="text-red-500"
    >{{ error }}</small>
  </div>
</template>

<script>
import { random } from 'lodash';

export default {
	props: {
		id: {
      type: String,
      default () {
        return 'input-' + random(1, 100);
      }
    },
		label: {
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
    required: {
    	type: Boolean,
    	default () {
    		return false
    	}
    },
		modelValue: {
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
    error: {
      type: String,
      default () {
        return ''
      }
    },
    inputClass: {
    	type: String,
    	default () {
    		return ''
    	}
    },
    numberOnly: {
    	type: Boolean,
    	default () {
    		return false
    	}
    },
    whiteBorder: {
    	type: Boolean,
    	default () {
    		return true
    	}
    }
	},
	data () {
		return {
			inputVal: this.modelValue || null
		}
	},
	watch: {
		modelValue(newval) {
			this.inputVal = newval
		},
  	inputVal (val) {
  		this.$emit('update:modelValue', val);
  	}
  },
  methods: {   
    // This can also prevent copy + paste invalid character
    filterInput(e){
      e.target.value = this.numberOnly ? e.target.value.replace(/[^0-9]+/g, '') : e.target.value;
    }
  }
}
</script>
