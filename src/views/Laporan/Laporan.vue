<script setup>
import { useAuthStore } from "@/stores/auth";
import Laporan from "@/api/Laporan";
import { onBeforeMount, ref } from "vue";

const laporan = ref()
const message = ref()
const authStore = useAuthStore()

async function hapus(id) {
    if (confirm('Konfirmasi hapus laporan')) {
        const res = await Laporan.destroy(id)
        message.value = res.message
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        setTimeout(() => {
            location.reload()
        }, 2000);
    }
}

onBeforeMount(async () => laporan.value = await Laporan.all())

</script>

<template>
    <h2>Laporan Keuangan</h2>

    <v-divider class="my-3"></v-divider>

    <v-alert type="success" class="my-3" v-if="message">
        {{ message }}
    </v-alert>

    <v-btn color="indigo" class="my-2" prepend-icon="mdi-plus" to="/laporan-add" v-if="authStore.isLogin">
        Tambah Laporan
    </v-btn>

    <template v-for="(item, i) in laporan" :key="i">
        <div>
            <v-list-item :title="item.bulan" :subtitle="(new Date(item.created)).toLocaleDateString()" class="py-3"
                :to="'/laporan-find/' + item.id">
                <template v-slot:prepend>
                    <v-avatar color="blue">
                        <v-icon color="white">mdi-clipboard-text</v-icon>
                    </v-avatar>
                </template>
            </v-list-item>

            <div class="border-b" v-if="authStore.isLogin">
                <v-btn color="green" variant="text" :to="'/laporan-edit/' + item.id">Edit</v-btn>
                <v-btn color="red" variant="text" @click="hapus(item.id)">Hapus</v-btn>
            </div>
        </div>

    </template>
</template>