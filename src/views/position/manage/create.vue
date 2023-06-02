<template>
  <div>
    <MiscCard
      title="Create Position"
      :action="handleDiscard"
    >
        <div class="grid grid-cols-1 space-x-10">
          <div class="mt-0">
            <FormTextfield
              id="name"
              v-model="input.name"
              label="Name"
              placeholder="Name"
              class="w-full"
              required
            />
            <small
              v-show="errorMsg.name"
              class="text-red-500"
            >
              {{ errorMsg.name }}
            </small>
          </div>
        </div>
        <template #action>
          <button
            type="submit"
            class="md:ml-0 font-bold py-2 px-10 rounded-md flex items-center justify-center text-white bg-powergreen-primary"
            @click="validateForm"
          >
            <span class="text-base">Create</span>
          </button>
        </template>
    </MiscCard>
  </div>
</template>
<script>
import { startCase } from 'lodash';
import axios from 'axios';

export default {
  data() {
    return {
      errorMsg: {},
      input: {
        name: '',
      },
      scheme: {
        name: 'required',
      },
    }
  },
  methods: {
    validateForm() {
      // clear error data
      let errorCount = 0;
      Object.keys(this.errorMsg).map(
        errorNode => (this.errorMsg[errorNode] = ''),
      );

      const validateColumn = [
        'name'
      ];

      validateColumn.map(node => {
        if (!this.input[node]) {
          errorCount++;
          this.errorMsg[node] = `${startCase(node)} is required`;
        }
      });

      if (errorCount === 0) {
        this.save();
        return;
      }
    },
    save(){
      axios.post(`${import.meta.env.VITE_LIVE_URL}/api/position`, {
        name: this.input.name,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
      .then((res) => {
        const { meta } = res.data;

        if(meta.status === 'success') {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Position has been added",
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            this.$router.push('/position');
          });
        }
      })
      .catch((err) => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: err.response.data.meta.message || "Failed to add position",
          timer: 1000,
          showConfirmButton: false,
        })
      })
    },
    handleDiscard() {
      this.$router.push('/position');
    }
  },
}
</script>
<style>
  
</style>