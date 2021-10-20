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
    },
    {
        path: '/merchant/:id',
        name: 'Merchant',
        component: () => import('@/views/MerchantSingle.vue'),
    },
    {
        path: '/merchant/:id/menu',
        name: 'Menu',
        component: () => import('@/views/MenuSingle.vue'),
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('@/views/Checkout.vue'),
    },
    {
        path: '/order-details/:id',
        name: 'Order Details',
        component: () => import('@/views/OrderDetails.vue'),
    },
    {
        path: '/order-tracker/:id',
        name: 'Order Tracker',
        component: () => import('@/views/OrderTracker.vue'),
    },

    {
        path: '/rider-dashboard',
        name: 'Rider Dashboard',
        component: () => import('@/views/Rider/Dashboard.vue'),
    },
    {
        path: '/merchant-dashboard',
        name: 'Merchant Dashboard',
        component: () => import('@/views/Merchant/Dashboard.vue'),
    },
    {
        path: '/merchant-category/:id',
        name: 'Merchant Category',
        component: () => import('@/views/MerchantCategory.vue'),
    },

    {
        path: '/select-vehicle',
        name: 'Same Day Vehicle',
        component: () => import('@/views/SameDayVehicle.vue'),
    },

    {
        path: '/sameday-checkout',
        name: 'Same Day Checkout',
        component: () => import('@/views/SameDay/Checkout.vue'),
    },

    {
        path: '/sameday-order-details',
        name: 'Same Day Order Details',
        component: () => import('@/views/SameDay/OrderDetails.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
