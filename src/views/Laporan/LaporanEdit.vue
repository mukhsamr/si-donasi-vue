<script setup>
import Laporan from "@/api/Laporan";
import { reactive, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const form = reactive({
    _method: 'patch',
    id: '',
    bulan: '',
    pdf: ''
})

const route = useRoute()
const rules = [(value) => !!value || "Kolom harus diisi"]
const inputs = ref()
const message = ref()


function selectFile(upload) {
    const file = upload.target.files[0]
    form.pdf = file
}

async function update() {

    const validate = await inputs.value.validate()

    if (validate.valid) {
        const formData = new FormData()

        for (const item in form) {
            formData.append(item, form[item])
        }

        const res = await Laporan.update(formData)
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

onBeforeMount(async () => {
    const res = await Laporan.find(route.params.id)

    form.id = route.params.id
    form.bulan = res.bulan
    form.pdf = res.pdf
})
</script>

<template>
    <h2>Edit Laporan</h2>

    <v-divider class="mb-4 mt-2"></v-divider>

    <v-alert type="success" class="my-3" closable close-label="Close Alert" v-if="message">
        {{ message }}
    </v-alert>

    <v-form ref="inputs" enctype="multipart/form-data" class="px-6 py-4 border" @submit.prevent="update">
        <v-select v-model="form.bulan" :rules="rules" label="Bulan" :items="bulan" variant="underlined"
            prepend-icon="mdi-note"></v-select>
        <v-file-input label="PDF" :rules="rules" variant="underlined" show-size accept="application/pdf"
            @change="selectFile"></v-file-input>

        <v-btn type="submit" color="green" class="my-4">Edit</v-btn>
    </v-form>

    <v-btn color="grey" class="mt-4" prepend-icon="mdi-arrow-left" to="/laporan">Kembali</v-btn>
</template>