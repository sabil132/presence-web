<template>
  <div>
    <input
      v-model="value"
      type="range"
      :min="minValueProp"
      :max="maxValueProp"
      step="1"
      class="appearance-none w-full my-4 rounded-xl bg-no-repeat"
      :style="{backgroundSize: backgroundSize}"
      @input="updateSlider"
    >
    <div class="flex justify-between px-1.5">
      <div
        v-for="item in maxValueProp"
        :key="item"
        class="flex flex-col justify-center items-center"
      >
        <!-- Line Icon -->
        <svg
          width="2"
          height="7"
          viewBox="0 0 2 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.70459"
            y="0.510742"
            width="0.59082"
            height="6"
            fill="#797F99"
          />
        </svg>
        
        <span class="text-[10px] text-spacecadet-60">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  props:{
    modelValue: {
      type: Number,
      default() {
        return 10;
      },
    },
    minValueProp:{
      type: Number,
      default() {
        return 1;
      },
    },
    maxValueProp:{
      type: Number,
      default() {
        return 10;
      },
    },
    primaryColorProp:{
      type: String,
      default() {
        return "#DA4A4A";
      },
    },
    secondaryColorProp:{
      type: String,
      default() {
        return "#FCEEEE";
      },
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      value: this.modelValue || 10,
      backgroundSize: '100% 100%'
    }
  },
  watch:{
    modelValue(val){
      if(val){
        this.value = val;
        this.backgroundSize = (this.value - this.minValueProp) * 100 / (this.maxValueProp - this.minValueProp) + '% 100%';
      }
    }
  },
  created(){
    // Set the background size of the slider
    this.backgroundSize = (this.value - this.minValueProp) * 100 / (this.maxValueProp - this.minValueProp) + '% 100%';
  },
  methods: {
    updateSlider(e) {
      let clickedElement = e.target,
        min = clickedElement.min,
        max = clickedElement.max,
        val = clickedElement.value;

      this.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

      this.$emit('update:modelValue', parseInt(this.value));
    }
  }
  }
</script>

<style lang="postcss" scoped>
input[type=range] {
  background: v-bind(secondaryColorProp);
  background-image: -webkit-gradient(linear, 20% 0%, 20% 100%, color-stop(0%, v-bind(primaryColorProp)), color-stop(100%, v-bind(primaryColorProp)));
  background-image: -webkit-linear-gradient(left, v-bind(primaryColorProp) 0%, v-bind(primaryColorProp) 100%);
  background-image: -moz-linear-gradient(left, v-bind(primaryColorProp) 0%, v-bind(primaryColorProp) 100%);
  background-image: linear-gradient(to right, v-bind(primaryColorProp) 0%, v-bind(primaryColorProp) 100%);
  @apply bg-no-repeat
}

input[type=range]::-webkit-slider-runnable-track {
  @apply w-full h-[4px] cursor-pointer bg-transparent rounded-xl border-none
}

input[type=range]::-webkit-slider-thumb {
  border: 4px solid v-bind(primaryColorProp);
  @apply h-4 w-4 bg-white cursor-pointer appearance-none mt-[-6px] rounded-full
}

input[type=range]:focus::-webkit-slider-runnable-track {
  @apply bg-transparent
}

input[type=range]::-moz-range-track {
  @apply w-full h-[4px] cursor-pointer bg-transparent rounded-xl border-none
}

input[type=range]::-moz-range-thumb {
  @apply h-4 w-4 bg-white cursor-pointer rounded-[2px];
  border: 4px solid #ADD8E6;
}

input[type=range]::-ms-track {
  @apply w-full h-[4px] cursor-pointer bg-transparent
}

input[type=range]::-ms-fill-lower {
  @apply bg-transparent border-0
}

input[type=range]::-ms-fill-upper {
  @apply bg-transparent border-0
}

input[type=range]::-ms-thumb {
  @apply bg-white cursor-pointer h-4 w-4 rounded-[2px];
  box-shadow: none;
  border: 4px solid #ADD8E6;
}

input[type=range]:focus::-ms-fill-lower {
  @apply bg-transparent
}

input[type=range]:focus::-ms-fill-upper {
  @apply bg-transparent
}
</style>