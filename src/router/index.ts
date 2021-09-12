import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';

const routes: Array < RouteRecordRaw > = [
    {
        path: '',
        redirect: "/login"
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/merchant/:id',
        name: 'Merchant',
        component: () => import('@/views/MerchantSingle.vue'),
    },
    {
        path: '/',
        component: Tabs,
        children: [
            {
                path: 'home',
                component: () => import('@/views/Home.vue')
            },
            {
                path: 'food',
                component: () => import('@/views/Food.vue')
            },
            {
                path: 'logistic',
                component: () => import('@/views/Logistic.vue')
            },
            {
                path: 'courier',
                component: () => import('@/views/Courier.vue')
            },
            {
                path: 'handyman',
                component: () => import('@/views/Handyman.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
