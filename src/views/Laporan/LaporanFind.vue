<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Laporan from "@/api/Laporan";
import VuePdfEmbed from 'vue-pdf-embed'

const route = useRoute()
const item = reactive({
    bulan: null,
    created: null,
    pdf: null,
})


const isLoading = ref(true)

onBeforeMount(async () => {
    const res = await Laporan.find(route.params.id).catch(err => err)

    isLoading.value = false

    item.bulan = res.bulan
    item.created = res.created
    item.pdf = res.pdf
})

</script>

<template>
    <h2>Bulan {{ item.bulan }}</h2>

    <v-divider class="my-4"></v-divider>

    <v-btn prepend-icon="mdi-download" color="green" class="mt-2" download
        :href="'data:application/pdf;base64,' + item.pdf">Download</v-btn>


    <div class="mt-4">
        <v-skeleton-loader class="mx-auto border" type="image, article" :loading="isLoading">
            <v-card>
                <vue-pdf-embed :source="'data:application/pdf;base64,' + item.pdf"></vue-pdf-embed>
            </v-card>
        </v-skeleton-loader>

    </div>
</template>
