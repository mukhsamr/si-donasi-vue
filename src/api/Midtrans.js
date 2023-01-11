import axios from "axios";

const url = '/api/pay/'

export default class Midtrans {

    // Get Token
    static async getToken() {
        await axios.get('/sanctum/csrf-cookie')
    }

    // Get snap link
    static async snap() {
        const res = await axios.get(url + 'snap')
        return res.data
    }

    // Get token
    static async token(parameter) {
        const res = await axios.post(url + 'token', parameter)
        return res.data
    }

    // Store
    static async store(form) {
        const res = await axios.post(url + 'store', form)
        return res.data
    }

}