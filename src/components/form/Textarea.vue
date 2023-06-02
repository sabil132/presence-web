<template>
  <div class="input-group my-4">
    <label
      v-if="title"
      :for="id"
      class="block text-sm text-spacecadet-100"
    >
      {{ title }}
      <span
        v-if="required"
        class="text-red-500"
      >
        *
      </span>
    </label>
    <small
      v-if="subtitle"
      class="text-gray-500"
    >{{ subtitle }}</small>
    <textarea
      :id="id"
      v-model="inputVal"
      :name="id"
      :disabled="disabled"
      :placeholder="placeholder"
      :rows="rows"
      class="border rounded-lg block w-full p-2.5"
      :class="{
        'bg-white text-gray-700': !disabled,
        'bg-gray-200 text-gray-500': disabled,
        'border-gray-300': isEmpty(error),
        'border-red-500': !isEmpty(error)
      }"
    />
    <small
      v-if="!isEmpty(error)"
      class="text-red-500"
    >{{ error }}</small>
    <slot name="notice" />
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
		rows: {
			type: [String, Number],
			default () {
				return 2
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
    required: {
      type: Boolean,
      default () {
        return false
      }
    }
	},
	data () {
		return {
			inputVal: this.modelValue || null
		}
	},
	watch: {
		modelValue (newval) {
			this.inputVal = newval
		},
  	inputVal (val) {
  		this.$emit('update:modelValue', val);
  	}
  },
  mounted () {
  	this.inputVal = this.modelValue
  },
	methods: {
		isEmpty (val) {
      return (!val || val.length === 0)
    }
	}
}
</script>
