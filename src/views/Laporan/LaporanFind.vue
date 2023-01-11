<script setup>
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Laporan from "@/api/Laporan";
import VuePdfEmbed from 'vue-pdf-embed'

const route = useRoute()
const item = reactive({
    bulan: '',
    created: '',
    pdf: '',
})

onBeforeMount(async () => {
    const res = await Laporan.find(route.params.id).catch(err => err)

    item.bulan = res.bulan
    item.created = res.created
    item.pdf = res.pdf
})

</script>

<template>
    <h2>Bulan {{ item.bulan }}</h2>

    <v-divider class="my-4"></v-divider>

    <v-card class="border">
        <vue-pdf-embed :source="'data:application/pdf;base64,' + item.pdf"></vue-pdf-embed>
    </v-card>
</template>
