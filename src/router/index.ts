import { createRouter,createWebHashHistory, RouteRecordRaw } from "vue-router"

const routerBase=ref("/survey")
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/survey/edit'
    },
    {
        path: '/survey/edit',
        component: () => import('@/views/edit/Edit.vue')
    },
    {
        path: '/survey/preview',
        component: () => import('@/views/previewElement/PreviewElement.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(routerBase.value),
    scrollBehavior: () => {
        history.pushState(null, null, document.URL)
    },
    routes: routes
})

export default router