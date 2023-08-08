<template>
  <DatatableTableWrapper>
    <template #header>
      <DatatableTableHead v-model="pagination" class="px-4" table-title="Unit List" button-title="Create Unit" :button-link="btnCreate" :button-show-filter="false"
        button-show />
    </template>
    <DatatableTableBody class="my-4" :headers="tableHead" :data-list="data" :action-detail="btnDetail"
      :action-delete="btnDelete" :action-edit="btnEdit" with-actions>
      <template #cellAction(Head_Unit.Employee.name)="{ data }">
        <span v-if="!data.Head_Unit" class="flex items-center gap-x-2">
          <MiscBadge 
            v-if="showDropdown !== `cell${data.id}`"
            color="#EA9291" 
            roundedMd
          >
            <span class="text-white">Not Assign</span>
          </MiscBadge>
            <FormSelect 
              v-else
              v-model="employee" 
              :list="convertEmployee" 
              class="!w-[250px]" 
            />
          <div 
            class="flex items-center justify-center bg-powergreen-primary rounded-full h-7 w-7 cursor-pointer"
            @click="handleShowDropdown(data, 'create')"
          >
            <span class="relative top-[-1.5px] font-bold text-white">{{ showDropdown !== `cell${data.id}` ? '+' : '-' }}</span>
          </div>
        </span>
        <span v-else>
          <div class="flex gap-x-2">
            <span v-if="showDropdown !== `cell${data.id}`">
              {{ data.Head_Unit.Employee.name }}
            </span>
            <FormSelect 
              v-else
              v-model="employee" 
              :list="convertEmployee" 
              class="!w-[250px]" 
            />
            <div 
              class="flex items-center justify-center bg-powergreen-primary rounded-full h-7 w-7 cursor-pointer"
              @click="handleShowDropdown(data, 'update')"
            >
              <span class="relative top-[-1.5px] font-bold text-white">{{ showDropdown !== `cell${data.id}` ? 'U' : '-' }}</span>
            </div>
            <div 
              class="flex items-center justify-center bg-powergreen-primary rounded-full h-7 w-7 cursor-pointer"
              @click="handleShowDropdown(data, 'delete')"
            >
              <span class="relative top-[-1.5px] font-bold text-white">D</span>
            </div>
          </div>
        </span>
      </template>
    </DatatableTableBody>
  </DatatableTableWrapper>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      showDropdown: '',
      type: 'create',
      tableHead: [
        {
          column: 'name',
          displayName: 'Name',
        },
        {
          column: 'Head_Unit.Employee.name',
          displayName: 'Head Unit',
        }
      ],
      headUnitId: '',
      employee: '--select employee--',
      input: {
        unit_id: '',
        employee_id: ''
      },
      pagination: {
        search: '',
      },
      inputTemp: {},
      data: [],
      listEmployee: []
    }
  },
  computed: {
    convertEmployee() {
      return this.listEmployee.map(employee => employee.name)
    }
  },
  watch: {
    pagination: {
      handler() {
        this.fetchData()
      },
      deep: true,
    },
    'employee': function (newVal) {
      if(newVal !== '--select employee--'){
        const employee = this.listEmployee.find(employee => employee.name === newVal);
        this.input.employee_id = employee.id;
        if(JSON.stringify(this.input) !== JSON.stringify(this.inputTemp)){
          this.onChangeHeadUnit()
        }
      }
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleShowDropdown(data, type) {
      this.type = type
      this.headUnitId = data.Head_Unit ? data.Head_Unit.id : ''
      if(type !== 'delete'){
        if(this.showDropdown === `cell${data.id}`){
          this.showDropdown = ''
        }else{
          this.showDropdown = `cell${data.id}`
          this.input.unit_id = data.id
          this.employee === '--Select Employee--'
          if(type === 'update'){
            this.input.employee_id = data.Head_Unit.Employee.id 
            this.employee = data.Head_Unit.Employee.name
            if(this.input.employee_id !== '' && this.input.unit_id !== '')
            this.inputTemp = {...this.input}
          }
        }
      }else{
        this.onChangeHeadUnit()
      }
    },
    btnCreate() {
      this.$router.push('/unit/create')
    },
    btnEdit(params) {
      this.$router.push(`/unit/edit/${params.id}`)
    },
    btnDelete(params) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1fa446',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
        .then(({ isConfirmed }) => {
          if (isConfirmed) {
            axios.delete(`${import.meta.env.VITE_LIVE_URL}/api/unit/${params.id}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
              },
            })
              .then((res) => {
                const { meta } = res.data;

                if (meta.status === 'success') {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Unit deleted successfully",
                    timer: 1000,
                    showConfirmButton: false,
                  })
                    .then(() => {
                      this.fetchData()
                    })
                }
              })
              .catch((err) => {
                this.$swal({
                  toast: true,
                  position: "top-end",
                  icon: "error",
                  title: err.response.data.meta.message ? err.response.data.meta.message : "Failed to delete position",
                  timer: 1000,
                  showConfirmButton: false,
                })
              })
          }
        })
    },
    btnDetail(param) {
      this.$router.push(`/unit/${param.id}`)
    },
    fetchData() {
      this.$store.global.$patch({
        isLoading: true,
      })

      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/unit?name=${this.pagination.search}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
        .then(res => {

          const { meta, data } = res.data;

          if (meta.status === 'success') {
            this.data = data;
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
          this.fetchEmployee()
        })
    },
    fetchEmployee() {
      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/employee?name=`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
        .then(res => {

          const { meta, data } = res.data;

          if (meta.status === 'success') {
            this.listEmployee = data;
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
    createHeadUnit() {
      axios.post(`${import.meta.env.VITE_LIVE_URL}/api/head-unit`, {
        unit_id: this.input.unit_id,
        employee_id: this.input.employee_id,
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
            title: "Head unit has been added",
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            this.showDropdown = ''
            this.employee = '--select employee--'
            this.fetchData()
          });
        }
      })
      .catch((err) => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: err.response.data.meta.message || "Failed to add head unit",
          timer: 1000,
          showConfirmButton: false,
        })
      })
    },
    updateHeadUnit(id){
      axios.patch(`${import.meta.env.VITE_LIVE_URL}/api/head-unit/${id}`, {
        employee_id: this.input.employee_id
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
            title: "Head unit has been updated",
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            this.showDropdown = ''
            this.employee = '--select employee--'
            this.fetchData()
          });
        }
      })
      .catch((err) => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: err.response.data.meta.message || "Failed to update head unit",
          timer: 1000,
          showConfirmButton: false,
        })
      })
    },
    deleteHeadUnit(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1fa446',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then(({ isConfirmed }) => {
        if(isConfirmed) {
          axios.delete(`${import.meta.env.VITE_LIVE_URL}/api/head-unit/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
          })
          .then((res) => {
            const { meta } = res.data;

            if(meta.status === 'success'){
              this.$swal({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Head unit deleted successfully",
                timer: 1000,
                showConfirmButton: false,
              })
              .then(() => {
                this.fetchData()
              })
            }
          })
          .catch((err) => {
            this.$swal({
              toast: true,
              position: "top-end",
              icon: "error",
              title: "Failed to delete head unit",
              timer: 1000,
              showConfirmButton: false,
            })
          })
        }
      })
    },
    onChangeHeadUnit() {
      if(this.type === 'create'){
        this.createHeadUnit()
      }

      if(this.type === 'update'){
        this.updateHeadUnit(this.headUnitId)
      }

      if(this.type === 'delete'){
        this.deleteHeadUnit(this.headUnitId)
      }
    }
  },
}
</script>`