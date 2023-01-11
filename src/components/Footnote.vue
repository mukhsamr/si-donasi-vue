<script setup>

const list = [
    {
        icon: 'mdi-map-marker-outline',
        link: 'https://goo.gl/maps/uDSKhRM67aZ4U787A',
        text: 'Lokasi',
    },
    {
        icon: 'mdi-web',
        link: 'https://www.sekolahimpian.com',
        text: 'Website',
    },
    {
        icon: 'mdi-youtube',
        link: 'https://youtube.com/@SekolahImpianTV',
        text: 'SekolahImpianTV',
    },
    {
        icon: 'mdi-youtube',
        link: 'https://youtube.com/@SekolahImpianku/videos',
        text: 'SekolahImpianku',
    },
    {
        icon: 'mdi-instagram',
        link: 'https://instagram.com/quadrantboardingschool/',
        text: 'quadrantboardingschool',
    },
    {
        icon: 'mdi-instagram',
        link: 'https://instagram.com/fahimquranplus/',
        text: 'fahimquranplus',
    },
    {
        icon: 'mdi-whatsapp',
        link: 'https://wa.wizard.id/8f2412',
        text: 'Whatsapp',
    },
]

</script>

<template>
    <div class="mt-16">
        <v-footer class="bg-indigo-lighten-3 d-flex flex-column align-start pa-0" app absolute>
            <div class="pa-4">
                Sekolah Impian
            </div>

            <v-spacer></v-spacer>

            <v-row class="pa-4 w-100 text-body-2" no-gutters>
                <v-col class="mt-2" cols="12" v-for="item in list" :key="item.icon">
                    <v-icon>{{ item.icon }}</v-icon>
                    <a :href="item.link" class="ml-2 text-white text-decoration-none" target="_blank">
                        {{ item.text }}
                    </a>
                </v-col>
            </v-row>

            <div class="bg-grey-lighten-4 text-grey pa-1 w-100" app absolute>
                <small>© 2022 ALL RIGHTS RESERVED</small>
            </div>

        </v-footer>
    </div>
</template>