import axios from "axios";

const url = '/api/'

const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

const config = {
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    }
}

export default class Auth {

    // Login
    static async auth(form) {
        const res = await axios.post(url + 'auth', form)
        return res.data
    }

    // Find
    static async find() {
        const res = await axios.get(url + 'user', config)
        return res.data
    }

    // Logout
    static async logout() {
        const res = await axios.get(url + 'auth/logout', config)
        return res.data
    }

    // Update
    static async update(form) {
        const res = await axios.post(url + 'user', form, config)
        return res.data
    }

}