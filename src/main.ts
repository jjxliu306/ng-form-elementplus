import { createApp } from 'vue'
import App from './App.vue'

// 导入element-ui    
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' 

 // 导入组件库
import  {setupFormDesign} from '../packages/index'
import '../packages/form/src/form-design.css';
// 注册组件库
//Vue.use(FormDesign)



//Vue.use(ElementUI);
const app = createApp(App)


app.use(ElementPlus) 

setupFormDesign(app)
//app.use(FormDesign)

app.mount('#app')

