import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import Toast, { PluginOptions, POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"

const app = createApp(App);

const options: PluginOptions = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 2,
    newestOnTop: true,
    position: POSITION.BOTTOM_RIGHT,
    timeout: 6000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.3,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    filterBeforeCreate: (toast, toasts) => {
        if (toasts.filter(
            t => t.type === toast.type
        ).length !== 0) {
            return false;
        }
        return toast;
    }
}

app.use(Toast, options);

app.mount('#app');
