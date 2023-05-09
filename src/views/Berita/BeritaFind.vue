<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Berita from "@/api/Berita";

const route = useRoute()
const item = reactive({
    judul: '',
    deskripsi: '',
    gambar: '',
    created: '',
})


const isLoading = ref(true)

onBeforeMount(async () => {
    const res = await Berita.find(route.params.id).catch((err) => err)

    isLoading.value = false

    item.judul = res.judul
    item.deskripsi = res.deskripsi
    item.gambar = res.gambar
    item.created = res.created
})

</script>

<template>

    <v-skeleton-loader type="image, article" v-if="isLoading"></v-skeleton-loader>

    <v-card v-else>
        <v-img class="align-end text-white" height="200" :src="storage + '/images/' + item.gambar" cover>
            <v-card-title>{{ item.judul }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">
            {{ item.created }}
        </v-card-subtitle>

        <v-card-text>
            <div>{{ item.deskripsi }}</div>
        </v-card-text>

    </v-card>
</template>