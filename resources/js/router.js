import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import firstPage from './component/pages/myFirstVuePage.vue'
import newRoutePage from './component/pages/newRoutePage'
import hooks from './component/pages/basic/hooks'
import methods from './component/pages/basic/methods.vue'

//admin project pages
import home from './component/pages/home'
import tags from './admin/pages/tags'
import category from './admin/pages/category'

const routes = [
    {
        path: '/',
        component: home,
    },
    {
        path: '/tags',
        component: tags,
    },
    {
        path: '/category',
        component: category,
    },
    {
        path: '/my-new-route',
        component: firstPage
    },
    {
        path: '/new-route',
        component: newRoutePage
    },
    {
        path: '/hooks',
        component: hooks
    },
    {
        path: '/methods',
        component: methods
    }
]

export default new Router({
    mode: 'history',
    routes
})
