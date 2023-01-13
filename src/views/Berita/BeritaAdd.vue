<script setup>
import Berita from "@/api/Berita";
import { reactive, ref } from "vue";

const form = reactive({
    judul: '',
    deskripsi: '',
    rekening: '',
    gambar: ''
})

const rules = [(value) => !!value || "Kolom harus diisi"]
const inputs = ref()
const loading = ref()
const preview = ref()
const alert = reactive({
    type: '',
    message: ''
})


function selectFile(upload) {
    const file = upload.target.files[0]

    form.gambar = file
    preview.value = URL.createObjectURL(file)
}

async function store() {

    const validate = await inputs.value.validate()

    if (validate.valid && preview.value) {
        loading.value = true

        const formData = new FormData()
        for (const item in form) {
            formData.append(item, form[item])
        }

        await Berita.store(formData)
            .then(res => {
                alert.type = 'success'
                alert.message = res.message
            })
            .catch(e => {
                alert.type = 'error'
                alert.message = e.response.data.error
            })
            .finally(() => {
                loading.value = false

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })

                setTimeout(() => {
                    alert.message = null
                }, 3000);
            })
    }
}
</script>

<template>
    <h2>Tambah Kategori Berita</h2>

    <v-divider class="mb-4 mt-2"></v-divider>

    <v-alert :type="alert.type" density="comfortable" class="my-3" v-if="alert.message">
        {{ alert.message }}
    </v-alert>

    <v-form ref="inputs" enctype="multipart/form-data" class="px-6 py-4 border" @submit.prevent="store">
        <v-text-field v-model="form.judul" :rules="rules" label="Judul" variant="underlined"
            prepend-icon="mdi-note"></v-text-field>
        <v-textarea v-model="form.deskripsi" :rules="rules" label="Deskripsi" variant="underlined"
            prepend-icon="mdi-filter-variant"></v-textarea>
        <v-file-input label="Gambar" :rules="rules" variant="underlined" show-size accept="image/*"
            @change="selectFile"></v-file-input>

        <v-img :src="preview" max-width="200" max-height="200" class="my-2"></v-img>
        <v-divider></v-divider>

        <v-btn type="submit" color="green" class="my-4" v-if="!loading">
            Simpan
        </v-btn>
        <v-btn color="green" class="my-4" disabled v-else>
            <v-progress-circular indeterminate />
        </v-btn>
    </v-form>

    <v-btn color="grey" class="mt-4" prepend-icon="mdi-arrow-left" to="/berita">Kembali</v-btn>
</template>