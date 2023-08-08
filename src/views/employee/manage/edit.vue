<template>
  <div>
    <MiscCard
      title="Create Employee"
      :action="handleDiscard"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 space-x-10">
        <div class="flex flex-col">
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
          <div class="mt-4">
            <FormTextfield
              id="placeOfBirth"
              v-model="input.placeOfBirth"
              label="Place Of Birth"
              placeholder="Place Of Birth"
              class="w-full"
              required
            />
            <small
              v-show="errorMsg.placeOfBirth"
              class="text-red-500"
            >
              {{ errorMsg.placeOfBirth }}
            </small>
          </div>
          <div class="flex flex-col mt-4">
            <label 
              for="dateOfBirth"
              class="text-xs"
            >
              Date Of Birth <span class="text-red-500">*</span>
            </label>
            <div class="border rounded-md mt-3">
              <input 
                id="dateOfBirth"
                v-model="input.dateOfBirth"
                type="Date"
                class="py-1.5 px-3 w-full bg-transparent"
              >
            </div>
            <small
              v-show="errorMsg.dateOfBirth"
              class="text-red-500"
            >
              {{ errorMsg.dateOfBirth }}
            </small>
          </div>
          <div class="flex flex-col mt-4">
            <label 
              for="dateOfBirth"
              class="text-xs"
            >
              Marital Status<span class="text-red-500">*</span>
            </label>
            <FormSelect
              v-model="input.maritalStatus"
              :list="maritalSatusList"
              class="mt-3"
            />
            <small
              v-show="errorMsg.maritalStatus"
              class="text-red-500"
            >
              {{ errorMsg.maritalStatus }}
            </small>
          </div>
          <div class="flex flex-col mt-4">
            <label 
              for="dateOfBirth"
              class="text-xs"
            >
              Gender<span class="text-red-500">*</span>
            </label>
            <FormSelect
              v-model="input.gender"
              :list="genderList"
              class="mt-3"
            />
            <small
              v-show="errorMsg.gender"
              class="text-red-500"
            >
              {{ errorMsg.gender }}
            </small>
          </div>
          <div class="flex flex-col mt-4">
            <label 
              for="dateEntry"
              class="text-xs"
            >
              Date Entry <span class="text-red-500">*</span>
            </label>
            <div class="border rounded-md mt-3">
              <input 
                id="dateEntry"
                v-model="input.dateEntry"
                type="Date"
                class="py-1.5 px-3 w-full bg-transparent"
              >
            </div>
            <small
              v-show="errorMsg.dateEntry"
              class="text-red-500"
            >
              {{ errorMsg.dateEntry }}
            </small>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="mt-0">
            <FormTextfield
              id="phone"
              v-model="input.phone"
              label="Phone Number"
              placeholder="Phone Number"
              class="w-full"
              required
              numberOnly
            />
            <small
              v-show="errorMsg.phone"
              class="text-red-500"
            >
              {{ errorMsg.phone }}
            </small>
          </div>
          <div class="mt-4">
            <FormTextfield
              id="email"
              v-model="input.email"
              label="Email"
              placeholder="Email"
              class="w-full"
              required
            />
            <small
              v-show="errorMsg.email"
              class="text-red-500"
            >
              {{ errorMsg.email }}
            </small>
          </div>
          <div class="flex flex-col mt-4">
            <label 
              for="position"
              class="text-xs"
            >
              Position<span class="text-red-500">*</span>
            </label>
            <FormSelect
              v-model="position"
              :list="convertPositionList"
              class="mt-3"
            />
            <small
              v-show="errorMsg.position"
              class="text-red-500"
            >
              {{ errorMsg.position }}
            </small>
          </div>
          <div class="flex flex-col mt-4">
            <label 
              for="unit"
              class="text-xs"
            >
              Unit<span class="text-red-500">*</span>
            </label>
            <FormSelect
              v-model="unit"
              :list="convertUnitList"
              class="mt-3"
            />
            <small
              v-show="errorMsg.unit"
              class="text-red-500"
            >
              {{ errorMsg.unit }}
            </small>
          </div>
          <div class="flex flex-col mt-4">
            <label 
              for="role"
              class="text-xs"
            >
              Role<span class="text-red-500">*</span>
            </label>
            <FormSelect
              v-model="input.role"
              :list="roleList"
              class="mt-3"
            />
            <small
              v-show="errorMsg.role"
              class="text-red-500"
            >
              {{ errorMsg.role }}
            </small>
          </div>
          <div class="flex flex-col mt-4">
            <label 
              for="role"
              class="text-xs"
            >
              Status<span class="text-red-500">*</span>
            </label>
            <FormSelect
              v-model="input.status"
              :list="statusList"
              class="mt-3"
            />
            <small
              v-show="errorMsg.status"
              class="text-red-500"
            >
              {{ errorMsg.status }}
            </small>
          </div>
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
      position: '--Select--',
      unit: '--Select--',
      input: {
        name: '',
        placeOfBirth: '',
        dateOfBirth: '',
        maritalStatus: '--Select--',
        gender: '--Select--',
        dateEntry: '',
        phone: '',
        email: '',
        position_id: '',
        unit_id: '',
        role: '--Select--',
        status: '--Select--',
      },
      positionList: [],
      unitList: [],
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
        'Administrator',
        'Staff'
      ],
      statusList: [
        'Active',
        'Inactive'
      ],
    }
  },
  computed: {
    convertPositionList() {
      return this.positionList.map(position => position.name);
    },
    convertUnitList() {
      return this.unitList.map(unit => unit.name);
    },
  },
  watch: {
    'input.position_id': function(newVal) {
      this.positionList.map(position => {
        if (position.id === newVal || position.name === newVal) {
          this.position = position.name;
          this.input.position_id = position.id;
        }
      });
    },
    'input.unit_id': function(newVal) {
      this.unitList.map(unit => {
        if (unit.id === newVal || unit.name === newVal) {
          this.unit = unit.name;
          this.input.unit_id = unit.id;
        }
      });
    },
    'position': function(newVal) {
      this.positionList.map(position => {
        if (position.id === newVal || position.name === newVal) {
          this.position = position.name;
          this.input.position_id = position.id;
        }
      });
    },
    'unit': function(newVal) {
      this.unitList.map(unit => {
        if (unit.id === newVal || unit.name === newVal) {
          this.unit = unit.name;
          this.input.unit_id = unit.id;
        }
      });
    }
  },
  created() {
    this.fetchPosition();
    this.fetchUnit();
    this.initFetch();
  },
  methods: {
    initFetch() {
      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/employee/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
      .then(res => {
        const { meta, data } = res.data;
        
        if(meta.status === 'success') {
          this.input = {
            name: data?.name,
            placeOfBirth: data.place_of_birth,
            dateOfBirth: data.date_of_birth,
            maritalStatus: data.marital_status,
            gender: data.gender,
            dateEntry: data.date_entry,
            phone: data.phone,
            email: data.email,
            position_id: data.position_id,
            unit_id: data.unit_id,
            role: data.role,
            status: data.is_active ? 'Active' : 'Inactive',
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
    },
    fetchPosition() {
      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/position?name=`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        this.positionList = data;
      })
      .catch((err) => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed to fetch position",
          timer: 1000,
          showConfirmButton: false,
        })
      })
    },
    fetchUnit() {
      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/unit?name=`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        this.unitList = data;
      })
      .catch((err) => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed to fetch unit",
          timer: 1000,
          showConfirmButton: false,
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
        'name',
        'placeOfBirth',
        'dateOfBirth',
        'maritalStatus',
        'gender',
        'dateEntry',
        'phone',
        'email',
        'role',
      ];

      if(this.position === '--Select--') {
        errorCount++;
        this.errorMsg.position = 'Position is required';
      }

      if(this.unit === '--Select--') {
        errorCount++;
        this.errorMsg.unit = 'Unit is required';
      }

      if(this.input.status === '--Select--') {
        errorCount++;
        this.errorMsg.status = 'Status is required';
      }

      validateColumn.map(node => {
        if (!this.input[node] || this.input[node] === '--Select--') {
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
      axios.patch(`${import.meta.env.VITE_LIVE_URL}/api/employee/${this.$route.params.id}`, {
        name: this.input.name,
        placeOfBirth: this.input.placeOfBirth,
        dateOfBirth: this.input.dateOfBirth,
        gender: this.input.gender,
        status: this.input.maritalStatus,
        dateEntry: this.input.dateEntry,
        phone: this.input.phone,
        email: this.input.email,
        position_id: this.input.position_id,
        unit_id: this.input.unit_id,
        role: this.input.role,
        active: this.input.status === 'Active' ? true : false,
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
            title: "Employee has been updated",
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            this.$router.push('/employee');
          });
        }
      })
      .catch((err) => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: err.response.data.meta.message || 'Failed to update employee',
          timer: 1000,
          showConfirmButton: false,
        })
      })
    },
    handleDiscard() {
      this.$router.push('/employee');
    }
  },
}
</script>
<style>
  
</style>