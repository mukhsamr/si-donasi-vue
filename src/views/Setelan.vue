<script setup>
import Auth from "@/api/Auth";
import { onBeforeMount, reactive, ref } from "vue";

const form = reactive({
    _method: 'patch',
    id: '',
    nama: '',
    password: ''
})
const message = ref()


async function update() {
    const res = await Auth.update(form)
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })

    message.value = res.message

    setTimeout(() => {
        message.value = null
    }, 3000);
}


onBeforeMount(async () => {
    const res = await Auth.find().catch(e => e)

    form.id = res.id
    form.nama = res.nama
})

</script>

<template>
    <h2>Setelan User</h2>

    <v-divider />

    <v-alert type="success" class="my-3" v-if="message">
        {{ message }}
    </v-alert>

    <v-form @submit.prevent="update" class="mt-8 border pa-4">
        <v-text-field v-model="form.nama" label="Username" prepend-icon="mdi-account"
            variant="underlined"></v-text-field>
        <v-text-field v-model="form.password" label="Password baru" prepend-icon="mdi-lock"
            variant="underlined"></v-text-field>
        <v-btn type="submit" color="primary">Simpan</v-btn>
    </v-form>
</template>