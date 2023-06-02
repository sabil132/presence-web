<template>
  <VeeForm
    ref="form"
    v-slot="{ meta }"
    :validation-schema="schema"
  >

    <!-- password Field -->
    <VeeField
      v-slot="{ field }"
      v-model="input.password"
      name="password"
      cc
    >
      <FormPasswordfield
        v-bind="field"
        id="password"
        v-model="input.password"
        label="Password"
        placeholder=""
        class="w-full"
      />
      <ErrorMessage
        class="text-xs text-red-600"
        name="password"
      />
    </VeeField>

    <!-- password Field -->
    <VeeField
      v-slot="{ field }"
      v-model="input.confirmPassword"
      name="confirmPassword"
    >
      <FormPasswordfield
        v-bind="field"
        id="confirmPassword"
        v-model="input.confirmPassword"
        label="Confirm Password"
        placeholder=""
        class="w-full mt-3"
      />
      <ErrorMessage
        class="text-xs text-red-600"
        name="confirmPassword"
      />
    </VeeField>
    
    <!-- Login Button -->
    <div class="w-full flex mt-5">
      <button
        type="submit"
        class="w-full md:ml-0 font-bold py-2.5 px-14 rounded-md flex items-center justify-center text-white"
        :class="{
          '!bg-gray-400 cursor-not-allowed': !meta.valid,
          'bg-powergreen-primary': meta.valid,
        }"
        :disabled="!meta.valid"
        @click="this.$emit('submit', input.password)"
      >
        <span class="text-base">Activate Account</span>
      </button>
    </div>
  </VeeForm>
</template>
<script>
export default {
  data() {
    return {
      input: {
        password: "",
        confirmPassword: ""
      },
      schema: {
        password: 'required',
        confirmPassword: 'required|match:@password'
      }
    }
  },
}
</script>