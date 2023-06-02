import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export default {
  install(app) {
    app.use(VueSweetalert2)
  }
}
