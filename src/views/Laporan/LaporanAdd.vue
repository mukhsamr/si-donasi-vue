<script setup>
import Laporan from "@/api/Laporan";
import { reactive, ref } from "vue";

const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const form = reactive({
    bulan: '',
    pdf: ''
})

const rules = [(value) => !!value || "Kolom harus diisi"]
const inputs = ref()
const message = ref()


function selectFile(upload) {
    const file = upload.target.files[0]
    form.pdf = file
}

async function store() {

    const validate = await inputs.value.validate()

    if (validate.valid && form.pdf) {
        const formData = new FormData()

        for (const item in form) {
            formData.append(item, form[item])
        }

        const res = await Laporan.store(formData)
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
    <h2>Tambah Laporan</h2>

    <v-divider class="mb-4 mt-2"></v-divider>

    <v-alert type="success" class="my-3" v-if="message">
        {{ message }}
    </v-alert>

    <v-form ref="inputs" enctype="multipart/form-data" class="px-6 py-4 border" @submit.prevent="store">
        <v-select v-model="form.bulan" :rules="rules" label="Bulan" :items="bulan" variant="underlined"
            prepend-icon="mdi-note"></v-select>
        <v-file-input label="PDF" :rules="rules" variant="underlined" show-size accept="application/pdf"
            @change="selectFile"></v-file-input>

        <v-btn type="submit" color="green" class="my-4">Simpan</v-btn>
    </v-form>

    <v-btn color="grey" class="mt-4" prepend-icon="mdi-arrow-left" to="/laporan">Kembali</v-btn>
</template>