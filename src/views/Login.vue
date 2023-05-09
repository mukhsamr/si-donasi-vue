<script setup>
import Auth from "@/api/Auth";
import { ref, reactive } from "vue";

const rules = (value) => !!value || 'Kolom harus diisi.'
const show = ref(null)
const message = ref()
const loading = ref()

const form = reactive({
    name: '',
    password: ''
})


async function login() {
    if (form.name && form.password) {
        loading.value = true

        await Auth.auth(form)
            .then(async (res) => {

                // Set Token Cookie
                let date = new Date();
                date.setTime(date.getTime() + 86400000)
                let expires = "expires=" + date.toUTCString();
                document.cookie = 'token=' + res.token + ';' + expires

                location.reload()
            })
            .catch((err) => {
                message.value = err.response.data.message
            })
            .finally(() => loading.value = false)
    }
}

</script>

<template>
    <h2 class="mt-2">Login</h2>

    <v-divider class="my-4" />

    <v-form ref="inputs" @submit.prevent="login" class="px-6 py-4 border">
        <v-text-field v-model="form.name" class="mt-2" label="Username" prepend-icon="mdi-account" :rules="[rules]"
            variant="underlined"></v-text-field>
        <v-text-field v-model="form.password" variant="underlined" prepend-icon="mdi-lock" :rules="[rules]"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" label="Password"
            class="input-group--focused mt-2" @click:append="show = !show"></v-text-field>

        <v-btn type="submit" color="green" class="mt-4" v-if="!loading">
            Masuk
        </v-btn>
        <v-btn color="green" class="mt-4" disabled v-else>
            <v-progress-circular indeterminate />
        </v-btn>

        <div class="mt-4">
            <strong class="text-red">{{ message }}</strong>
        </div>
    </v-form>
</template>