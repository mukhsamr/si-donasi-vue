<template>
    <v-bottom-navigation :elevation="24" grow color="orange-darken-4">
        <v-btn to="/infaq">
            <v-icon>mdi-cash-multiple</v-icon>
            Infaq
        </v-btn>

        <v-btn to="/berita">
            <v-icon>mdi-newspaper</v-icon>
            Kabar
        </v-btn>

        <v-btn to="/laporan">
            <v-icon>mdi-clipboard-text</v-icon>
            Laporan
        </v-btn>

        <v-btn to="/login">
            <v-icon>mdi-account</v-icon>
            Masuk
        </v-btn>
    </v-bottom-navigation>
</template>