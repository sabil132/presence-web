<template>
  <div class="table-body w-full h-[400px] overflow-auto">
    <table class="w-full">
      <thead class="bg-[#dae5eb]">
        <tr>
          <th class="w-4 text-base text-black font-medium px-3 py-2">
            #
          </th>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="text-base text-left text-black font-medium px-2 py-2"
          >
            {{ header.displayName }}
          </th>
          <th
            v-if="withActions"
            class="text-base text-black font-medium px-4 py-1 text-center"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(data, index) in dataList" 
          :key="index"
          class="border-b border-solid transition duration-200 dinamyc-row"
        >
          <td class="w-4 text-base text-black font-light p-2 cursor-default">
            <slot
                v-if="$slots[`index(${index})`]"
              :name="`index(${index})`"
              :data="data"
            />
            <span v-else>
              {{ index + 1 }} 
            </span>
          </td>
          <td  
            v-for="(header, idy) in headers"
            class="text-base text-black font-light p-2 cursor-default "
          >
            <slot
              v-if="$slots[`cell(${header.column})`]"
              :name="`cell(${header.column})`"
              :data="isObject(header.column) ? data[header.column.split('.')[0]][header.column.split('.')[1]] : data[header.column]"
            />
            <span v-else>
              <span v-if="isObject(header.column)">
                <span v-if="data[header.column.split('.')[0]]">
                  {{  
                      data[header.column.split('.')[0]] ?
                        header.column.split('.').length === 2 ?
                          data[header.column.split('.')[0]][header.column.split('.')[1]] || '-' :
                            header.column.split('.').length === 3 ? 
                              data[header.column.split('.')[0]][header.column.split('.')[1]][header.column.split('.')[2]] || '-'
                              : data[header.column.split('.')[0]][header.column.split('.')[1]][header.column.split('.')[2]][header.column.split('.')[3]] || '-'
                        : '-'
                  }}
                </span>
                <MiscBadge
                  v-if="!data[header.column.split('.')[0]]"
                  color="#EA9291"
                  roundedMd
                >
                  <span class="text-white">
                    Not Yet Assigned
                  </span>
                </MiscBadge>
              </span>
              <span v-else>
                {{ data[header.column] || '-' }}
              </span>
            </span>
          </td>
          <td
            v-if="withActions"
            class="text-center transition duration-200 p-2"
          >
            <slot
              v-if="$slots[`actions`]"
              name="actions"
              :data="data"
            />
            <div
              v-else
              class="flex justify-center items-center cursor-pointer"
              @click="actionToggle(index)"
            >
              <span class="flex justify-center items-center bg-[#dae5eb] w-8 h-8 rounded-full">
                :
              </span>
              <transition name="bounce">
                <div
                  v-if="openedAction === index"
                  class="text-left"
                >
                  <TableActions
                    :data="data"
                    :action-detail="actionDetail"
                    :action-delete="actionDelete"
                    :action-edit="actionEdit"
                  />
                </div>
              </transition>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    dataList: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    withActions: {
      type: Boolean,
      default() {
        return true;
      },
    },
    actionDetail: {
      type: Function,
      default: () => ({}),
    },
    actionDelete: {
      type: Function,
      default: () => ({}),
    },
    actionEdit: {
      type: Function,
      default: () => ({}),
    },
  },
  data() {
    return {
      openedAction: null,
    }
  },
  methods: {
    isObject(val){
      return /[.]/.test(val)
    },
    actionToggle(rowNode) {
      this.openedAction = this.openedAction === rowNode ? null : rowNode;
    },
  }
}
</script>
<style lang="postcss">
  .dinamyc-row:hover {
    @apply bg-slate-100
  }
</style>