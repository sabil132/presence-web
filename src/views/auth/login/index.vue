<template>
  <LoginSideImage />
  <div class="flex flex-col min-h-full grow w-full lg:w-3/5 bg-white  ">
    <div class="flex justify-center items-start h-full md:items-center">
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col mb-10 space-y-1">
          <h1 class="text-4xl font-bold text-powergreen-primary">Welcome back</h1>
          <p class="text-lg text-powergreen-primary">Sign in to continue</p>
        </div>

        <VeeForm ref="form" v-slot="{ meta }" :validation-schema="schema" @submit="login">
          <!-- Email Field -->
          <VeeField v-slot="{ field }" v-model="input.email" class="flex flex-col" name="email">
            <FormTextfield v-bind="field" id="email" v-model="input.email" label="Email" placeholder="Email"
              class="w-full" />
            <ErrorMessage class="text-xs text-red-600" name="email" />
          </VeeField>

          <!-- password Field -->
          <VeeField v-slot="{ field }" v-model="input.password" name="password">
            <FormPasswordfield v-bind="field" id="password" v-model="input.password" label="Password"
              placeholder="Password" class="w-full mt-3" />
            <ErrorMessage class="text-xs text-red-600" name="password" />
          </VeeField>

          <!-- Login Button -->
          <div class="w-full flex mt-5">
            <button type="submit"
              class="w-full md:ml-0 font-bold py-2.5 px-14 rounded-md flex items-center justify-center text-white" :class="{
                '!bg-gray-400 cursor-not-allowed': !meta.valid,
                'bg-powergreen-primary': meta.valid,
              }" :disabled="!meta.valid">
              <span class="text-base">Sign In</span>
            </button>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoginSideImage from "@/fragments/auth/LoginSideImage.vue";

export default {
  components: {
    LoginSideImage,
  },
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      schema: {
        email: 'required|email',
        password: 'required'
      }
    }
  },
  methods: {
    login() {
      this.$store.global.$patch({
        isLoading: true,
      })

      axios.post(`${import.meta.env.VITE_LIVE_URL}/api/auth/login`, {
        email: this.input.email,
        password: this.input.password
      })
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.data.token));
          localStorage.setItem("user", JSON.stringify(res.data.data.user));

          this.$router.push('/dashboard')
        })
        .catch((err) => {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "error",
            title: err.response.data.meta.message,
            timer: 3000,
            showConfirmButton: false,
          })
        }).finally(() => {
          this.$store.global.$patch({
            isLoading: false,
          })
        })
    }
  }
};
</script>
