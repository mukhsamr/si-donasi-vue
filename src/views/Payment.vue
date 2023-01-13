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

const form = reactive({
    kategori: null,
    nama: null,
    nominal: 100000
})

const loading = ref(null)

const store = reactive({
    infaq_id: '',
    status: '',
    order_id: '',
    status_code: '',
    transaction_id: '',
    gross_amount: 0,
})


function pilihNominal(value) {
    activeNominal.value = value
    form.nominal = value
}

async function pay() {

    const validate = await inputs.value.validate()

    if (validate.valid && form.nominal > 0) {

        loading.value = true

        let parameter = {
            "transaction_details": {
                "order_id": store.infaq_id + '-' + form.kategori + '-' + Math.floor(new Date().getTime() / 1000),
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

        // Simpan ke Database
        const save = async (res) => {
            store.order_id = res.order_id
            store.status_code = res.status_code
            store.transaction_id = res.transaction_id
            store.transaction_status = res.transaction_status
            store.gross_amount = form.nominal

            await Midtrans.store(store)
        }

        window.snap.pay(token, {
            onSuccess: function (res) {
                save(res)
                alert("Pembayaran Berhasil!")
            },
            onPending: function (res) {
                save(res)
                alert("Menunggu Pembayaran!")
            },
            onError: function (res) {
                save(res)
                alert("Pembayaran Gagal!")
            },
            onClose: function () {
                alert('Tutup halaman pembayaran?');
            }
        })

    }

}

onBeforeMount(async () => {

    // Set Script
    const snapLink = await Midtrans.snap()

    const snapScript = document.createElement('script')
    snapScript.setAttribute('src', snapLink.link)
    snapScript.setAttribute('data-client-key', snapLink.clientKey)
    document.head.appendChild(snapScript)


    const res = await Infaq.find(route.params.id)
        .catch(() => window.location.href = '/')

    store.infaq_id = res.id
    form.kategori = res.judul
})

</script>

<template>
    <h2>{{ form.kategori }}</h2>

    <v-divider class="my-2"></v-divider>

    <v-form ref="inputs" class="px-6 py-4 border" @submit.prevent="pay()">
        <v-text-field v-model="form.nama" :rules="[required]" label="Nama" variant="underlined"
            prepend-icon="mdi-account" autofocus></v-text-field>

        <div class="ma-4">
            <v-row no-gutters>
                <v-col cols="5" class="mb-2 mr-2" v-for="item in nominal" :key="item.value">
                    <v-btn color="blue" :variant="activeNominal == item.value ? 'flat' : 'outlined'"
                        :data-value="item.value" block @click="pilihNominal(item.value)" class="text-capitalize">
                        {{ item.text }}
                    </v-btn>
                </v-col>
            </v-row>
        </div>

        <v-text-field v-model="form.nominal" :rules="[required, minimal]" type="number" label="Nominal Infaq"
            variant="underlined" prepend-icon="mdi-cash-multiple"></v-text-field>

        <v-divider></v-divider>

        <v-btn type="submit" color="primary" class="mt-4" v-if="!loading">
            Bayar Sekarang
        </v-btn>
        <v-btn type="submit" color="primary" class="mt-4" v-else disabled>
            <v-progress-circular indeterminate />
        </v-btn>
    </v-form>
</template>