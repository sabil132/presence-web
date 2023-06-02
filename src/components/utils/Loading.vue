<template>
  <div class="fixed top-0 bg-black opacity-50 flex items-center justify-center space-x-2 w-full h-full z-50" />
  <div class="absolute flex space-x-2 justify-center items-center w-full h-full z-50 top-0">
    <div class="w-5 h-5 bg-powergreen-primary rounded-full circle-1"></div>
    <div class="w-5 h-5 bg-powergreen-primary rounded-full circle-2"></div>
    <div class="w-5 h-5 bg-powergreen-primary rounded-full circle-3"></div>
  </div>
</template>
<style scoped>
.circle-1 {
  animation: bounce 1.5s infinite ease-in-out;
}
.circle-2 {
  animation: bounce 1.5s infinite ease-in-out;
  animation-delay: .3s;
}
.circle-3 {
  animation: bounce 1.5s infinite ease-in-out;
  animation-delay: .5s;
}
@keyframes bounce {
  0%   { transform: scale(1,1)      translateY(0); }
  10%  { transform: scale(1.1,.9)   translateY(0); }
  30%  { transform: scale(.9,1.1)   translateY(-25px); }
  50%  { transform: scale(1.05,.95) translateY(0); }
  57%  { transform: scale(1,1)      translateY(-7px); }
  64%  { transform: scale(1,1)      translateY(0); }
  100% { transform: scale(1,1)      translateY(0); }
}
</style>