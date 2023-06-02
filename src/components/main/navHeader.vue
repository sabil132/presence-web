<template>
  <div>
    <div class="min-w-full text-black shadow-lg bg-white p-3 rounded-lg">
      <div class="flex justify-end items-center gap-x-3">
        <div class="flex flex-col text-right">
          <p class="text-black">{{ user.name }}</p>
          <p class="text-gray-500 text-xs">{{ user.position }}</p>
        </div>
        <div class="bg-gray-400 w-[50px] h-[50px] rounded-full overflow-hidden object-scale-down object-center cursor-pointer"
          @click="expanded = !expanded">
          <img :src="user.photo" alt="user-profile" class="h-full w-full object-cover object-[0px_-10px] ">
        </div>
        <!-- Expanded -->
        <transition name="bounce">
          <ul 
            v-if="expanded"
            class="absolute top-[100px] bg-white shadow-global rounded-md"
          >
            <li 
              class="py-2 px-10 dinamyc-hover cursor-pointer"
              @click="logout"
            >
              Logout
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
}
</script>
<style scoped>
.dinamyc-hover:hover {
  background: rgba(31, 164, 70);
  color: #FFFFFF !important;
  cursor: pointer;
  border-radius: 6px;
  margin-left: 5px;
  transition: margin-left 0.5s;
}
</style>