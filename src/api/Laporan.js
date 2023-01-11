import axios from "axios";

const url = '/api/laporan'

export default class Laporan {

    // Get all
    static async all() {
        const res = await axios.get(url)
        return res.data
    }

    // Find
    static async find(id) {
        const res = await axios.get(url + '/' + id)
        return res.data
    }

    // Store
    static async store(form) {
        const res = await axios.post(url, form)
        return res.data
    }

    // Update
    static async update(form) {
        const res = await axios.post(url, form)
        return res.data
    }

    // Destroy
    static async destroy(id) {
        const res = await axios.delete(url + '/' + id)
        return res.data
    }
}