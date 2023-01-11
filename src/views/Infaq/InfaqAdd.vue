<script setup>
import Infaq from "@/api/Infaq";
import { reactive, ref } from "vue";


const form = reactive({
    judul: '',
    deskripsi: '',
    bank: '',
    rekening: '',
    target: '',
    gambar: ''
})

const rules = [(value) => !!value || "Kolom harus diisi"]
const inputs = ref()
const preview = ref()
const message = ref()


function selectFile(upload) {
    const file = upload.target.files[0]

    form.gambar = file
    preview.value = URL.createObjectURL(file)
}

async function store() {

    const validate = await inputs.value.validate()

    if (validate.valid && preview.value) {
        const formData = new FormData()

        for (const item in form) {
            formData.append(item, form[item])
        }

        const res = await Infaq.store(formData)
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
}
</script>

<template>
    <h2>Tambah Kategori Infaq</h2>

    <v-divider class="mb-4 mt-2"></v-divider>

    <v-alert type="success" density="comfortable" class="my-3" v-if="message">
        Berhasil tambah kategori
    </v-alert>

    <v-form ref="inputs" enctype="multipart/form-data" class="px-6 py-4 border" @submit.prevent="store">
        <v-text-field v-model="form.judul" :rules="rules" label="Judul" variant="underlined"
            prepend-icon="mdi-note"></v-text-field>
        <v-text-field v-model="form.bank" :rules="rules" label="Nama Bank" variant="underlined"
            prepend-icon="mdi-bank"></v-text-field>
        <v-text-field v-model="form.rekening" :rules="rules" label="No Rekening" type="number" variant="underlined"
            prepend-icon="mdi-currency-usd"></v-text-field>
        <v-text-field v-model="form.target" :rules="rules" label="Target" type="number" variant="underlined"
            prepend-icon="mdi-bullseye-arrow"></v-text-field>
        <v-textarea v-model="form.deskripsi" :rules="rules" label="Deskripsi" variant="underlined"
            prepend-icon="mdi-filter-variant"></v-textarea>
        <v-file-input label="Gambar" :rules="rules" variant="underlined" show-size accept="image/*"
            @change="selectFile"></v-file-input>

        <v-img :src="preview" max-width="200" max-height="200" class="my-2"></v-img>
        <v-divider></v-divider>

        <v-btn type="submit" color="green" class="my-4">Simpan</v-btn>
    </v-form>

    <v-btn color="grey" class="mt-4" prepend-icon="mdi-arrow-left" to="/infaq">Kembali</v-btn>
</template>