<template>
  <div class="flex flex-col lg:flex-row items-center gap-4 justify-between my-8">
    <div class="flex gap-1 items-center text-[#457B9D]">
      <p class="text-base text-spacecadet-40">
        Showing 1 to {{ pagination.perPage }} from
        {{ pagination.totalData }} entries
      </p>
    </div>
    <div class="flex gap-1">
      <button
        type="button"
        class="rounded-full border-0 bg-white"
        :class="{
          'disabled': pagination.currentPage === 1,
          'active-rounded': pagination.currentPage !== 1,
        }"
        @click="prevPage"
      >
        <SvgPagination
          :color="getPalletes.primaryColor"
          :left="true"
        />
      </button>
      <div
        id="rangenumber"
        class="flex items-center justify-center lg:w-full rounded-full h-9 gap-5 px-4 text-sm lg:text-base"
        :style="{
          'color': getPalletes.primaryColor,
          'background-color': getPalletes.primaryColor + '30'
        }"
      >
        <ul
          v-for="(number, index) in pagination.rangenumber"
          :key="index"
          class="cursor-pointer"
          @click="changePage(number)"
        >
          <li
            v-if="typeof number === 'number'"
            class="flex items-center justify-center"
            :class="{
              'active': number == pagination.currentPage || number === 1 && !pagination.currentPage,
            }"
          >
            {{ number }}
          </li>
          <li
            v-else
            class="flex items-center justify-center"
          >
            ...
          </li>
        </ul>
      </div>
      <button
        type="button"
        class="rounded-full border-0 bg-white"
        :class="{
          'disabled': pagination.currentPage < pagination.totalPage,
          'active-rounded': pagination.currentPage !== pagination.totalPage,
        }"
        @click="nextPage"
      >
        <!-- <SvgPagination
          :color="getPalletes.primaryColor"
          :right="true"
        /> -->
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 10,
        totalPage: 1,
        totalData: 1,
        rangenumber: [],
      },
    };
  },
  watch: {
    value: {
      handler(newval) {
        this.pagination = {
          ...newval,
        };
        this.generateRange();
      },
      deep: true,
    },
  },
  mounted() {
    this.pagination = {
      ...this.value,
    };
    this.generateRange();
  },
  methods: {
    prevPage() {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage -= 1;
        this.generateRange();
        this.$emit('input', this.pagination);
      }
    },
    nextPage() {
      if (this.pagination.currentPage < this.pagination.totalPage) {
        this.pagination.currentPage += 1;
        this.generateRange();
        this.$emit('input', this.pagination);
      }
    },
    generateRange() {
      let range = [];
      let currentPage = this.pagination.currentPage;
      let totalPages = this.pagination.totalPage;
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
          range.push(i);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
          range.push("...");
        }
      }
      this.pagination.rangenumber = range;
    },
    changePage(number) {
      if (number !== '...') {
        this.pagination.currentPage = number;
        this.generateRange();
        this.$emit('input', this.pagination);
      }
    },
  },
};
</script>

<style scoped>
.active {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color:  var(--color-primary);
  color: white;
}
.active-rounded:hover{
  background-color: var(--color-primary);
}
</style>