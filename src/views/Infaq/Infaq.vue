<script setup>
import { useAuthStore } from "@/stores/auth";
import Infaq from "@/api/Infaq";
import { onBeforeMount, ref } from "vue";

const data = ref()
const message = ref()
const authStore = useAuthStore()


function salin(text) {
    navigator.clipboard.writeText(text)
    alert('Alhamdulillah. No Rek sudah tersalin, silahkan di Paste ke aplikasi perbankan anda.')
}

async function hapus(id) {
    if (confirm('Konfirmasi hapus kategori')) {
        const res = await Infaq.destroy(id)

        message.value = res.message
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        setTimeout(() => {
            location.reload()
        }, 3000);
    }
}


onBeforeMount(async () => data.value = await Infaq.all())

</script>

<template>
    <h2>Infaq</h2>

    <v-divider class="mb-4" />

    <v-alert type="success" class="my-3" v-if="message">
        {{ message }}
    </v-alert>

    <v-btn color="indigo" class="my-2" prepend-icon="mdi-plus" to="/infaq-add" v-if="authStore.isLogin">
        Tambah Kategori
    </v-btn>

    <v-row>
        <v-col v-for="item in data" :key="item.id" cols="12" sm="4">
            <v-card class="mx-auto" max-width="400">
                <v-img class="align-end text-white" height="200" :src="storage + '/images/' + item.gambar" cover>
                    <v-card-title>{{ item.judul }}</v-card-title>

                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular indeterminate color="grey-lighten-4"></v-progress-circular>
                        </div>
                    </template>
                </v-img>

                <v-card-text>
                    <div>{{ item.deskripsi }}</div>
                    <v-btn size="x-small" color="warning" class="mt-2" :to="'/infaq-find/' + item.id">
                        More info...
                    </v-btn>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text>
                    <div>Bank: <strong>{{ item.bank }}</strong></div>
                    <div>No Rekening: <strong>{{ item.rekening }}</strong></div>
                    <div class="d-flex justify-space-between">
                        <v-btn variant="outlined" color="blue mt-3" prepend-icon="mdi-content-copy"
                            @click="salin(item.rekening)">
                            Salin
                        </v-btn>
                        <v-btn color="green mt-3" :to="'/payment/' + item.id">
                            Infaq Sekarang
                        </v-btn>
                    </div>
                </v-card-text>

                <v-divider></v-divider>

                <div class="ma-4">
                    <v-progress-linear :model-value="item.persentase" bg-color="yellow-darken-3" color="yellow-darken-3"
                        height="10" rounded>
                    </v-progress-linear>
                    <div class="d-flex justify-space-between text-body-2 mt-2">
                        <div>
                            <div class="font-weight-bold text-disabled">Terkumpul</div>
                            <div class="font-weight-bold">Rp. {{ item.terkumpul }}</div>
                        </div>
                        <div>
                            <div class="font-weight-bold text-disabled">Dibutuhkan</div>
                            <div class="font-weight-bold">Rp. {{ item.target.toLocaleString('id') }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="authStore.isLogin">
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn color="green" :to="`/infaq-edit/${item.id}`">Edit</v-btn>
                        <v-btn color="red" @click="hapus(item.id)">Hapus</v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>