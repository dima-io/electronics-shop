import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from "@/pages/home-page";
import {createRouter, createWebHistory} from "vue-router";
import NotFoundPage from "@/pages/not-found-page";
import CategoryPage from "@/pages/category-page";
import axios from "axios";
import store from "@/store";
import OrderingPage from "@/pages/ordering-page";


const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/categories/:prm',
        component: CategoryPage,
        props: true,
        name: 'Electronic',
    },
    {
        path: '/ordering-page',
        component: OrderingPage,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: 'active'
})

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
