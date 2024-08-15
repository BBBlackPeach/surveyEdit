import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import * as ELIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

window.addEventListener('storage', (e: any) => {
    localStorage.setItem(e.key, e.oldValue)
})

window.addEventListener('storage', (e: any) => {
    sessionStorage.setItem(e.key, e.oldValue)
})

window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL)
})

const app = createApp(App)

//ELIcons作为全局变量使用
for (const name in ELIcons) {
    app.component(name, (ELIcons as any)[name])
}
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(createPinia().use(piniaPluginPersistedstate))

app.use(router).mount('#app')


// 禁止回退
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL)
})