<script setup>
import Infaq from "@/api/Infaq";
import Midtrans from "@/api/Midtrans";
import { ref, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()

const required = (value) => !!value || "Kolom harus diisi"
const minimal = (value) => value >= 100000 || "Minimum infaq 100.000"

const inputs = ref()

const nominal = [
    {
        text: 'Rp. 100.000',
        value: 100000
    },
    {
        text: 'Rp. 250.000',
        value: 250000
    },
    {
        text: 'Rp. 500.000',
        value: 500000
    },
    {
        text: 'Rp. 1.000.000',
        value: 1000000
    },
    {
        text: 'Rp. 1.500.000',
        value: 1500000
    },
    {
        text: 'Rp. 2.000.000',
        value: 2000000
    }
]

const activeNominal = ref(100000)

function pilihNominal(value) {
    activeNominal.value = value
    form.nominal = value
}

const form = reactive({
    id: route.params.id,
    judul: null,
    deskripsi: null,
    gambar: null,
    created: null,

    nama: null,
    nominal: 100000
})

const loading = ref(null)

const store = reactive({
    infaq_id: null,
    status: null,
    order_id: null,
    status_code: null,
    transaction_id: null,
    gross_amount: 0,
})

async function pay() {

    const validate = await inputs.value.validate()

    if (validate.valid && form.nominal > 0) {

        loading.value = true

        let parameter = {
            "transaction_details": {
                "order_id": store.infaq_id + '-' + form.judul + '-' + Math.floor(new Date().getTime() / 1000),
                "gross_amount": form.nominal
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": form.nama,
            },
            "callbacks": {
                "finish": import.meta.env.VITE_BASE_URL
            }
        };

        const token = await Midtrans.token(parameter)

        if (token) {
            loading.value = false
        }

        window.snap.pay(token, {
            onSuccess: () => alert("Pembayaran Berhasil!"),
            onPending: () => alert("Menunggu Pembayaran!"),
            onError: () => alert("Pembayaran Gagal!"),
            onClose: () => alert('Tutup halaman pembayaran?')
        })

    }

}


const imageLoaded = ref(false)

onBeforeMount(async () => {

    // Set Script
    const snapLink = await Midtrans.snap()

    const snapScript = document.createElement('script')
    snapScript.setAttribute('src', snapLink.link)
    snapScript.setAttribute('data-client-key', snapLink.clientKey)
    document.head.appendChild(snapScript)


    const res = await Infaq.find(route.params.id)
        .catch(() => window.location.href = '/')

    imageLoaded.value = true

    store.infaq_id = res.id
    form.judul = res.judul
    form.deskripsi = res.deskripsi
    form.gambar = res.gambar ?? 'default.jpg'
    form.created = res.created
})

</script>

<template>
    <v-card>
        <v-skeleton-loader type="image" :loading="!imageLoaded">
            <v-img class="align-end text-white" height="200" :src="storage + '/images/' + form.gambar" cover>
                <v-card-title>{{ form.judul }}</v-card-title>
            </v-img>
        </v-skeleton-loader>

        <v-form ref="inputs" class="px-4 mt-10" @submit.prevent="pay()">
            <v-text-field v-model="form.nominal" :rules="[required, minimal]" type="number" label="Nominal Infaq"
                variant="underlined" prepend-icon="mdi-cash-multiple"></v-text-field>

            <v-row no-gutters>
                <v-col cols="6" class="px-2 py-1" v-for="item in nominal" :key="item.value">
                    <v-btn color="green-darken-1" :variant="activeNominal == item.value ? 'flat' : 'outlined'"
                        :data-value="item.value" block @click="pilihNominal(item.value)" class="text-capitalize">
                        {{ item.text }}
                    </v-btn>
                </v-col>
            </v-row>

            <v-text-field class="mt-8" v-model="form.nama" :rules="[required]" label="Nama" variant="underlined"
                prepend-icon="mdi-account" autofocus></v-text-field>


            <div class="mt-8">
                <v-btn type="submit" color="indigo-darken-3" v-if="!loading" block>
                    Infaq Sekarang
                </v-btn>
                <v-btn type="button" color="indigo-darken-3" v-else disabled block>
                    <v-progress-circular indeterminate class="p-1" />
                </v-btn>
            </div>
        </v-form>

        <v-divider class="border-opacity-50 my-8"></v-divider>

        <h3 class="pl-4">{{ form.judul }}</h3>
        <v-card-text>
            <div>{{ form.deskripsi }}</div>
        </v-card-text>
    </v-card>

</template>