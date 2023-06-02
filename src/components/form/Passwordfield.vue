<template>
  <div class="flex flex-col">
    <label
      class="flex text-gray-500 text-sm gap-1"
      :for="id"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >*</span>
    </label>
    <div class="flex relative">
      <input
        :id="id"
        v-model="inputVal"
        class="w-full text-sm text-black border border-celadon-40 rounded-md px-2 py-2 pr-11"
        :class="[
          inputClass,
          {
            'bg-gray-200 cursor-not-allowed': disabled,
            '!border-red-500': error,
          },
        ]"
        :type="!isVisible ? 'password' : 'text'"
        :placeholder="placeholder"
        :disabled="disabled"
        @keyup="passwordChecker"
        @focus="$emit('active')"
        @blur="$emit('inactive')"
      >
      <div
        class="flex justify-center items-center absolute right-1 top-0 p-3 rounded cursor-pointer"
        @click="isVisible = !isVisible"
      >
        <img
          v-if="!isVisible"
          class="w-[15px]"
          src="@/assets/img/icons/eye.svg"
          alt="icons-eye"
        >
        <img
          v-if="isVisible"
          class="w-[15px]"
          src="@/assets/img/icons/eye-off.svg"
          alt="icons-eye"
        >
      </div>
    </div>
    <div
      v-if="passwordBar"
      class="flex items-center justify-between gap-x-2"
    >
      <div class="h-2 w-full bg-slate-100 rounded-full mt-2">
        <span 
          class="block h-2 rounded-full"
          :style="{
            'background': Strengthbar.color,
            width: `${Strengthbar.score}%`,
            transition: '.5s width ease-in-out',
          }"
        />
      </div>
      <p class="text-sm text-spacecadet-100">
        {{ Strengthbar.desc }}
      </p>
    </div>
    <small class="text-gray-400">{{ subtitle }}</small>
    <small
      v-if="error"
      class="text-red-500"
    >{{ error }}</small>
  </div>
</template>

<script>
import { random } from "lodash";
import {
  validatorPasswordLowercase,
  validatorPasswordCapitalLetter,
  validatorPasswordNumber,
  validatorSpecialChar
} from '@/helpers/validateHelpers'

export default {
  props: {
    id: {
      type: String,
      default() {
        return "input-" + random(1, 100);
      },
    },
    label: {
      type: String,
      default() {
        return "";
      },
    },
    subtitle: {
      type: String,
      default() {
        return "";
      },
    },
    placeholder: {
      type: String,
      default() {
        return "";
      },
    },
    required: {
      type: Boolean,
      default() {
        return false;
      },
    },
    modelValue: {
      type: String,
      default() {
        return "";
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    error: {
      type: String,
      default() {
        return "";
      },
    },
    inputClass: {
      type: String,
      default() {
        return "";
      },
    },
    passwordBar:{
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      inputVal: this.modelValue || null,
      isVisible: false,
      Strengthbar: {
        color: 'grey',
        score: 0,
        desc: ''
      },
    };
  },
  watch: {
    modelValue(newval) {
      this.inputVal = newval;
    },
    inputVal(val) {
      this.$emit("update:modelValue", val);
      if(val.length < 1) {
        this.Strengthbar = {
          ...this.Strengthbar,
          score: 0,
          desc: ''
        }
      }
    },
  },
  methods: {
    passwordChecker(event){
      let score = 0
      let value = event.target.value
      const flags =[
        validatorPasswordLowercase(value),
        validatorPasswordCapitalLetter(value),
        validatorPasswordNumber(value),
        validatorSpecialChar(value)
      ]

      let passedMatches = 0;
      for (const flag of flags) {
        passedMatches += flag === true ? 1 : 0
      }

      score += 2 * value.length + (value.length <= 8 ? 1 : 0);
      score += passedMatches * 10

      if(value.length >= 8) {
        score = passedMatches === 1 ? 35 : score
        score = passedMatches === 2 ? 50 : score
        score = passedMatches === 3 ? 70 : score
        score = passedMatches === 4 ? 100 : score
      }else{
        score = value.length < 1 ? 0 : score
      }

      this.getIndicatorBackgroundColor(score)
    },
    getIndicatorBackgroundColor(score) {
      if(score > 0 && score <= 35) {
        this.Strengthbar = {
          color: '#DA4A4A',
          score,
          desc: 'Weak'
        }
      }else if(score > 35 && score <= 70){
        this.Strengthbar = {
          color: '#FD7E14',
          score,
          desc: 'Medium'
        }
      }else if(score > 70 && score <= 100){
        this.Strengthbar = {
          color: '#32A9BD',
          score,
          desc: 'Strong'
        }
      }else {
        this.Strengthbar = {
          color: '#DA4A4A',
          score,
          desc: ''
        }
      }
    },
  }
};
</script>
