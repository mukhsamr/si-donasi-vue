<script setup>
import { onBeforeMount, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import Berita from "@/api/Berita";
import { useRouter } from "vue-router";

const router = useRouter()
const data = ref()
const message = ref()
const authStore = useAuthStore()

async function hapus(id) {
    if (confirm('Konfirmasi hapus kategori')) {
        const res = await Berita.destroy(id)
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


const isLoading = ref(true)

onBeforeMount(async () => {
    data.value = await Berita.all()
    isLoading.value = false
})

</script>

<template>
    <v-alert type="success" class="my-3" v-if="message">
        {{ message }}
    </v-alert>

    <v-btn color="indigo" class="my-2" prepend-icon="mdi-plus" to="/berita-add" v-if="authStore.isLogin">
        Tambah Berita
    </v-btn>

    <v-row v-if="isLoading">
        <v-col cols="12" md="6" v-for="i in 3">
            <v-skeleton-loader class=" border" type="card-avatar, actions"></v-skeleton-loader>
        </v-col>
    </v-row>

    <v-row v-else>
        <v-col v-for="item in data" :key="item.id" cols="12">
            <v-card class="mx-auto" max-width="400" :to="`/berita-find/${item.id}`">
                <v-img class="align-end text-white" height="150" :src="storage + '/images/' + item.gambar" cover>
                    <v-card-title>{{ item.judul }}</v-card-title>

                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular indeterminate color="grey-lighten-4"></v-progress-circular>
                        </div>
                    </template>
                </v-img>

                <v-card-subtitle class="pt-4">
                    {{ item.created }}
                </v-card-subtitle>

                <v-card-text>
                    <div>{{ item.deskripsi.substring(0, 60) + ' ...' }}</div>
                </v-card-text>

                <v-divider></v-divider>

                <template v-if="authStore.isLogin">
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn color="green" :to="`/berita-edit/${item.id}`">Edit</v-btn>
                        <v-btn color="red" @click="hapus(item.id)">Hapus</v-btn>
                    </v-card-actions>
                </template>
            </v-card>
        </v-col>
    </v-row>
</template>