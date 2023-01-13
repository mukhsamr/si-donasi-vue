<script setup>
import Laporan from "@/api/Laporan";
import { reactive, ref, onBeforeMount } from "vue";

const bulan = ref()
const form = reactive({
    bulan: '',
    pdf: ''
})

const rules = [(value) => !!value || "Kolom harus diisi"]
const inputs = ref()
const loading = ref()
const alert = reactive({
    type: '',
    message: ''
})


function selectFile(upload) {
    const file = upload.target.files[0]
    form.pdf = file
}

async function store() {

    const validate = await inputs.value.validate()

    if (validate.valid && form.pdf) {
        loading.value = true

        const formData = new FormData()
        for (const item in form) {
            formData.append(item, form[item])
        }

        await Laporan.store(formData)
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

onBeforeMount(async () => {
    const resBulan = await Laporan.bulan()
    bulan.value = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        .filter(v => (!resBulan.includes(v)))
})

</script>

<template>
    <h2>Tambah Laporan</h2>

    <v-divider class="mb-4 mt-2"></v-divider>

    <v-alert :type="alert.type" class="my-3" v-if="alert.message">
        {{ alert.message }}
    </v-alert>

    <v-form ref="inputs" enctype="multipart/form-data" class="px-6 py-4 border" @submit.prevent="store">
        <v-select v-model="form.bulan" :rules="rules" label="Bulan" :items="bulan" variant="underlined"
            prepend-icon="mdi-note"></v-select>
        <v-file-input label="PDF" :rules="rules" variant="underlined" show-size accept="application/pdf"
            @change="selectFile"></v-file-input>

        <v-btn type="submit" color="green" class="my-4" v-if="!loading">
            Simpan
        </v-btn>
        <v-btn color="green" class="my-4" disabled v-else>
            <v-progress-circular indeterminate />
        </v-btn>
    </v-form>

    <v-btn color="grey" class="mt-4" prepend-icon="mdi-arrow-left" to="/laporan">Kembali</v-btn>
</template>