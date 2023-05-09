<script setup>

const list = [
    {
        icon: 'mdi-map-marker-outline',
        link: 'https://goo.gl/maps/uDSKhRM67aZ4U787A',
        text: 'Lokasi',
        color: 'red-darken-2'
    },
    {
        icon: 'mdi-web',
        link: 'https://www.sekolahimpian.com',
        text: 'Website',
        color: 'blue-darken-2'
    },
    {
        icon: 'mdi-youtube',
        link: 'https://youtube.com/@SekolahImpianTV',
        text: 'SekolahImpianTV',
        color: 'red-darken-2'
    },
    {
        icon: 'mdi-youtube',
        link: 'https://youtube.com/@SekolahImpianku/videos',
        text: 'SekolahImpianku',
        color: 'red-darken-2'
    },
    {
        icon: 'mdi-instagram',
        link: 'https://instagram.com/quadrantboardingschool/',
        text: 'quadrantboardingschool',
        color: 'grey-darken-2'
    },
    {
        icon: 'mdi-instagram',
        link: 'https://instagram.com/fahimquranplus/',
        text: 'fahimquranplus',
        color: 'grey-darken-2'
    },
    {
        icon: 'mdi-whatsapp',
        link: 'https://wa.wizard.id/8f2412',
        text: 'Whatsapp',
        color: 'green-darken-2'
    },
]

</script>

<template>
    <div class="mt-8">
        <v-footer class="d-flex flex-column align-start pa-0" app absolute>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                style="position: relative; bottom: -10; z-index: -1;">
                <path fill="#FB8C00" fill-opacity="1"
                    d="M0,192L48,186.7C96,181,192,171,288,170.7C384,171,480,181,576,202.7C672,224,768,256,864,272C960,288,1056,288,1152,277.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
            </svg>

            <div class="pa-6 text-h6 bg-orange-darken-1 rounded-t-lg border-0">
                Yuk, lebih banyak mengenal sekolah impian
            </div>

            <v-row class="px-4 mb-8 w-100" no-gutters>
                <v-col class="mt-2" cols="12" v-for="item in list" :key="item.icon">
                    <v-icon size="small" :color="item.color">{{ item.icon }}</v-icon>
                    <a :href="item.link" class="ml-2 text-body-2 text-black text-decoration-none" target="_blank">
                        {{ item.text }}
                    </a>
                </v-col>
            </v-row>

            <!-- <div class="bg-grey-lighten-4 text-grey pa-1 w-100" app absolute>
                <small>© 2022 ALL RIGHTS RESERVED</small>
            </div> -->

        </v-footer>
    </div>
</template>