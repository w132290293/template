import './styles/index.css'
import App from './App.vue'
import router from './routerHook'
import 'virtual:svg-icons-register'
import piniaPersist from 'pinia-plugin-persist';


const app = createApp(App)

//
const pinia = createPinia();
pinia.use(piniaPersist)
app.use(pinia)

//
app.use(router)
app.mount('#app')



