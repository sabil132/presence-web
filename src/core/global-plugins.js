import vueInit from '@/core/initiate.js'
import moment from "moment";

vueInit.config.globalProperties.$moment = moment;

import VeeValidate from "@/plugins/vee-validate.js";
vueInit.use(VeeValidate);

import VueSwal from "@/plugins/vue-swal2.js";
vueInit.use(VueSwal);