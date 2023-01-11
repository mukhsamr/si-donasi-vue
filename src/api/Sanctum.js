import axios from "axios";

export default class Sanctum {

    // Get Token
    static async getToken() {
        await axios.get('/sanctum/csrf-cookie')
    }
}