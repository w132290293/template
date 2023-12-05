import './styles/index.css';
import App from './App.vue';
import router from './routerHook';
import 'virtual:svg-icons-register'; //svg
import piniaPersist from 'pinia-plugin-persist'; //长效存储
import 'dayjs/locale/zh-cn' // 导入本地化语言

const app = createApp(App);

//
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);

//等待router挂载完毕
app.use(router);
router.isReady().then(() => app.mount('#app'));

dayjs.locale('zh-cn'); // 使用本地化语言





