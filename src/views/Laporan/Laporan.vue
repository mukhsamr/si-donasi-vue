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


const isLoading = ref(true)

onBeforeMount(async () => {
    laporan.value = await Laporan.all()
    isLoading.value = false
})

</script>

<template>
    <v-alert type="success" class="my-3" v-if="message">
        {{ message }}
    </v-alert>

    <v-btn color="indigo" class="my-2" prepend-icon="mdi-plus" to="/laporan-add" v-if="authStore.isLogin">
        Tambah Laporan
    </v-btn>

    <v-row v-if="isLoading">
        <v-col v-for="i in 5" cols="12">
            <v-skeleton-loader type="list-item-avatar-two-line"></v-skeleton-loader>
        </v-col>
    </v-row>

    <template v-else>
        <div v-for="(item, i) in laporan" :key="i">
            <v-list-item :title="item.bulan" :subtitle="item.created" class="py-5" :to="'/laporan-find/' + item.id">
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

            <v-divider></v-divider>
        </div>

    </template>
</template>