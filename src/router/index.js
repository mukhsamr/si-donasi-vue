import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth";

import Home from "../views/Home.vue";
import Infaq from "../views/Infaq/Infaq.vue";

const routes = [

    // Auth
    { path: '/login', name: 'login', meta: { auth: 'guard' }, component: () => import('../views/Login.vue') },

    // Home
    { path: '/', meta: { auth: true }, component: Home },

    // Setelan
    { path: '/setelan', meta: { auth: true }, component: () => import('../views/Setelan.vue') },

    // Infaq
    { path: '/infaq', name: 'infaq', meta: { auth: false }, component: Infaq },
    { path: '/infaq-find/:id', name: 'infaq-find', meta: { auth: false }, component: () => import('../views/Infaq/InfaqFind.vue') },
    { path: '/infaq-add', name: 'infaq-add', meta: { auth: true }, component: () => import('../views/Infaq/InfaqAdd.vue') },
    { path: '/infaq-edit/:id', name: 'infaq-edit', meta: { auth: true }, component: () => import('../views/Infaq/InfaqEdit.vue') },

    // Berita
    { path: '/berita', name: 'berita', meta: { auth: false }, component: () => import('../views/Berita/Berita.vue') },
    { path: '/berita-find/:id', name: 'berita-find', meta: { auth: false }, component: () => import('../views/Berita/BeritaFind.vue') },
    { path: '/berita-add', name: 'berita-add', meta: { auth: true }, component: () => import('../views/Berita/BeritaAdd.vue') },
    { path: '/berita-edit/:id', name: 'berita-edit', meta: { auth: true }, component: () => import('../views/Berita/BeritaEdit.vue') },

    // Laporan
    { path: '/laporan', name: 'laporan', meta: { auth: false }, component: () => import('../views/Laporan/Laporan.vue') },
    { path: '/laporan-find/:id', name: 'laporan-find', meta: { auth: false }, component: () => import('../views/Laporan/LaporanFind.vue') },
    { path: '/laporan-add', name: 'laporan-add', meta: { auth: true }, component: () => import('../views/Laporan/LaporanAdd.vue') },
    { path: '/laporan-edit/:id', name: 'laporan-edit', meta: { auth: true }, component: () => import('../views/Laporan/LaporanEdit.vue') },

    // About
    { path: '/about', name: 'about', meta: { auth: false }, component: () => import('../views/About.vue') },

    // Payment
    { path: '/payment/:id', name: 'payment', meta: { auth: false }, component: () => import('../views/Payment.vue') },
];



const router = createRouter({
    history: createWebHistory(),
    routes
})

// Middllware
router.beforeEach(async (to, from, next) => {

    const authStore = useAuthStore()
    await authStore.getUser()

    if (authStore.isLogin) {
        if (to.meta.auth === 'guard') {
            next(from)
        } else {
            next()
        }
    } else {
        if (to.meta.auth === true) {
            next('/infaq')
        } else {
            next()
        }
    }

})

export default router;