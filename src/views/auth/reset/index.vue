<template>
    <LoginSideImage />
    <div class="flex flex-col min-h-full grow w-full lg:w-3/5 bg-white  ">
      <div class="flex justify-center items-start h-full md:items-center">
        <div class="flex flex-col w-1/2">
          <div class="flex flex-col mb-10 space-y-1">
            <h1 class="text-4xl font-bold text-powergreen-primary">Reset Password</h1>
            <p class="text-lg text-powergreen-primary">Create your strong password</p>
          </div>
  
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
              >
                <span class="text-base">Reset Password</span>
              </button>
            </div>
          </VeeForm>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoginSideImage from "@/fragments/auth/LoginSideImage.vue";
  
  export default {
    components: {
      LoginSideImage,
    },
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
  };
  </script>
  