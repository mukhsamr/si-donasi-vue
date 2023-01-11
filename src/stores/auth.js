import { defineStore } from "pinia";
import Auth from "@/api/Auth";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        token: false
    }),
    getters: {
        user: (state) => state.authUser,
        isLogin: (state) => state.token,
    },
    actions: {
        async getUser() {

            // Cek Token
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1]

            if (Boolean(token) === false) return null
            this.token = Boolean(token)


            // Cek LocalStorage
            const userStorage = localStorage.getItem('user')

            if (userStorage != true) {
                const res = await Auth.find().catch(err => err)
                if (res.nama) localStorage.setItem('user', res.nama)
            }

            this.authUser = localStorage.getItem('user')
        },
        async reset() {
            this.authUser = null
            this.isLogin = false
        }
    }
})