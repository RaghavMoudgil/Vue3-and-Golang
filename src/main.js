import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
// import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
// import Toast from 'primevue/toast';
// import ToastService from 'primevue/toastservice';
import InputText from "primevue/inputtext";
import Checkbox from 'primevue/checkbox';


import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons

// createApp(App).mount('#app')
const app = createApp(App); 

app.use(PrimeVue);
// app.component('Dialog', Dialog);
app.component('btnButton', Button);
app.component('InputText', InputText);
app.component('chCheckbox', Checkbox);
app.mount('#app')
