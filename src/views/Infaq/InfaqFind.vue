<script setup>
import Infaq from '@/api/Infaq';
import { reactive, onBeforeMount } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute()
const item = reactive({
    id: route.params.id,
    judul: '',
    deskripsi: '',
    gambar: '',
    created: '',
})

onBeforeMount(async () => {
    const res = await Infaq.find(route.params.id).catch((err) => err)

    item.judul = res.judul
    item.deskripsi = res.deskripsi
    item.gambar = res.gambar ?? 'default.jpg'
    item.created = res.created
})

</script>

<template>
    <v-card v-if="item">
        <v-img class="align-end text-white" height="200" :src="storage + '/images/' + item.gambar" cover>
            <v-card-title>{{ item.judul }}</v-card-title>
        </v-img>


        <v-card-text>
            <div>{{ item.deskripsi }}</div>
        </v-card-text>
    </v-card>

    <v-btn color="green mt-3" :to="'/payment/' + item.id" block>
        Infaq Sekarang
    </v-btn>
</template>