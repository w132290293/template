import './styles/index.css';
import App from './App.vue';
import router from './routerHook';
import 'virtual:svg-icons-register'; //svg
import piniaPersist from 'pinia-plugin-persist'; //长效存储
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import 'element-plus/theme-chalk/dark/css-vars.css'; // 主题色
import * as ElementPlusIconsVue from '@element-plus/icons-vue';


const app = createApp(App);

//
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);

// 等待router挂载完毕
app.use(router);
router.isReady().then(() => app.mount('#app'));

// 注册icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component('icon-' + key, component);
}

dayjs.locale('zh-cn'); // 使用本地化语言