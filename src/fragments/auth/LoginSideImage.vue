<template>
  <div
    class="relative min-h-full hidden lg:flex lg:flex-col w-2/5 bg-powergreen-primary"
  >
    <div class="flex m-5 gap-x-2 items-center">
      <img 
        class="w-8" 
        src="@/assets/img/logo/logo-white.png"
        alt="logo-white"
      />
      <p class="text-sm text-white font-bold">PT Motiolabs Digital Indonesia</p>
    </div>
    <img 
      class="w-full transform -scale-x-100 absolute bottom-0 -left-20" 
      src="@/assets/img/banner.png"
      alt="logo-white"
    />
  </div>
</template>

<script>
export default {
  name: 'LoginSideImage',
}
</script>
