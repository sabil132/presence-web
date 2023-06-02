<template>
  <div>
    <MiscCard
      title="Edit Position"
      :action="handleDiscard"
      :actionSave="validateForm"
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
          <span class="text-base">Update</span>
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
        placeOfBirth: '',
        dateOfBirth: '',
        maritalStatus: '--Select--',
        gender: '--Select--',
        position: '',
        dateEntry: '',
        phone: '',
        email: '',
        role: '--Select--',
      },
      scheme: {
        name: 'required',
        placeOfBirth: 'required',
        dateOfBirth: 'required',
        maritalStatus: 'required',
        gender: 'required',
        position: 'required',
        dateEntry: 'required',
        phone: 'required',
        email: 'required',
        role: 'required',
        role_id: '',
      },
      maritalSatusList: [
        'Single', 
        'Married', 
        'Widow', 
        'Widower'
      ],
      genderList: [
        'Male',
        'Female'
      ],
      roleList: [
        {
          id: 1,
          name: 'Admin'
        },
        {
          id: 2,
          name: 'Employee'
        }
      ]
    }
  },
  computed: {
    convertRoleList() {
      return this.roleList.map(role => role.name);
    }
  },
  watch: {
    'input.role': function(val) {
      this.roleList.map(role => {
        if (role.id === val || role.name === val) {
          this.input.role = role.name;
          this.input.role_id = role.id;
        }
      });
    }
  },
  created() {
    this.initFetch();
  },
  methods: {
    initFetch() {
      this.$store.global.$patch({
        isLoading: true,
      })

      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/position/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
      .then(res => {
        const { meta, data } = res.data;
        
        if(meta.status === 'success') {
          this.input = {
            name: data?.name
          }
        }
      })
      .catch(err => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed to fetch data, please try again later",
          timer: 1000,
          showConfirmButton: false,
        })
      })
      .finally(() => {
        this.$store.global.$patch({
          isLoading: false,
        })
      })
    },
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
        this.update();
        return;
      }
    },
    update(){
      axios.patch(`${import.meta.env.VITE_LIVE_URL}/api/position/${this.$route.params.id}`, {
        name: this.input.name
      }, {
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
            title: "Position has been updated",
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
          title: err.response.data.meta.message || 'Failed to update position',
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