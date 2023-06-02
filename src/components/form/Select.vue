<template>
  <div
    v-click-outside="(event) => onClickOutside(event)"
    class="relative w-full prevent-select-element"
  >
    <div
      class="flex cursor-pointer w-full items-center justify-between rounded bg-white p-2 text-spacecadet-100 gap-2"
      :class="[
        customClass,
        {
          'ring-1 ring-slate-200': withBorder,
          '!ring-slate-200': withBorder && expanded
        }
      ]"
      @click="expanded = !expanded"
    >
      <slot name="icon" />
      <span :class="{'ml-7': slotIconExist}">{{ (label && selected[label]) ? selected[label] : selected }}</span>
      <span class="text-2xl w-5 h-5 grid place-content-center">
        <span
          :class="{
            'rotate-full-right': expanded
          }"
          class="transition duration-300 ease-in-out flex items-center justify-center rotate-[-90deg]"
        >
          <img src="@/assets/img/icons/chevron-down.svg">
        </span>
      </span>
    </div>
    <ul
      :class="{
        'opacity-100 max-h-52': expanded,
        'opacity-0 h-0': !expanded
      }"
      class="transition duration-300 ease-in-out overflow-y-scroll absolute min-h-fit w-full z-50 mt-4  rounded-lg shadow-lg bg-white"
    >
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="{
          'hidden': !expanded,
          'block': expanded,
          'hover:rounded-t-lg': index === 0,
          'hover:rounded-b-lg': index === (list.length-1),
        }"
        class="cursor-pointer select-none p-2 hover:bg-[#1fa446] hover:text-white text-spacecadet-100"
        @click="clickSelect(item)"
      >
        {{ label ? item[label] : item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			required: true,
			default () {
				return []
			}
		},
		label: {
			type: String,
			default () {
				return ''
			}
		},
		modelValue: {
			type: [String, Number, Array, Object],
			default () {
				return ''
			}
		},
		withBorder: {
			type: Boolean,
			default () {
				return true
			}
		},
    customClass: {
      type: String,
      default () {
        return ''
      }
    }
	},
	data () {
    return {
      expanded: false,
			selected: this.modelValue || this.list[0]
		}
	},
  computed: {
    slotIconExist () {
      return this.$slots.icon
    }
  },
	watch: {
		modelValue: function(val) {
			this.selected = val
		}
	},
	methods: {
		onClickOutside(event) {
			this.expanded = false
		},
		clickSelect (selected) {
			this.selected = selected
			this.expanded = false
			this.$emit('update:modelValue', this.selected)
		}
	}
}
</script>

<style scoped>
.rotate-full-right {
  transform: rotate(0deg);
}
</style>
