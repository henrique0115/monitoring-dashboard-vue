import {createApp, h} from "vue";
import {createRouter, createWebHistory} from 'vue-router'

import App from './App.vue'
import Layout from './layouts/Layout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'
import Settings from "./pages/Settings.vue";
import Dashboard from "./pages/Dashboard.vue";
import DashboardHome from "./pages/DashboardHome.vue";
import Details from "./pages/Details.vue";
import socket from "./mixins/socket"
import "./assets/app.scss"
import EditMonitor from "./pages/EditMonitor.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "bootstrap"

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                name: "root",
                path: '',
                component: Dashboard,
                children: [
                    {
                        name: "DashboardHome",
                        path: '/dashboard',
                        component: DashboardHome,
                        children: [
                            {
                                path: '/dashboard/:id',
                                component: EmptyLayout,
                                children: [
                                    {
                                        path: '',
                                        component: Details,
                                    },
                                    {
                                        path: '/edit/:id',
                                        component: EditMonitor,
                                    },
                                ]
                            },
                            {
                                path: '/add',
                                component: EditMonitor,
                            },
                        ]
                    },
                    {
                        path: '/settings',
                        component: Settings,
                    },
                ],
            },
        ],
    }
]

const router = createRouter({
    linkActiveClass: 'active',
    history: createWebHistory(),
    routes,
})

const app = createApp({
    mixins: [
        socket,
    ],
    render: ()=>h(App)
})

app.use(router)

const options = {
    position: "bottom-right"
};

app.use(Toast, options);

app.mount('#app')

