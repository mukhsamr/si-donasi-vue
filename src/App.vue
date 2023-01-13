<script setup>
import { ref, onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import Auth from "@/api/Auth";
import Sanctum from "@/api/Sanctum";
import Footnote from "@/components/Footnote.vue";
import Bottom from "@/components/Bottom.vue";

const username = ref()
const isMobile = document.body.clientWidth <= 425
const drawer = ref(!isMobile)


async function logout() {
  if (confirm('Keluar sesi ini?')) {

    // Remove cookie
    document.cookie = 'token=; Max-Age=0'
    localStorage.clear()

    // Reset AuthStore
    const authStore = useAuthStore()
    authStore.reset()

    await Auth.logout()

    location.reload()
  }
}

onBeforeMount(async () => {

  // Get Auth
  const authStore = useAuthStore()
  await authStore.getUser()

  // Sanctum Token
  await Sanctum.getToken()

  username.value = authStore.user
})

</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list v-if="username">
        <v-list-item prepend-avatar="/user.jpg" :title="username" subtitle="Yuk Infaq">
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item title="Yuk Infaq" subtitle="Investasi masa depan">
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact">

        <!-- Nav -->
        <v-list-item active-color="primary" to="/" v-if="username">
          <template v-slot:prepend>
            <v-icon icon="mdi-home"></v-icon>
          </template>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item active-color="primary" to="/infaq">
          <template v-slot:prepend>
            <v-icon icon="mdi-currency-usd"></v-icon>
          </template>

          <v-list-item-title>Infaq</v-list-item-title>
        </v-list-item>

        <v-list-item active-color="primary" to="/berita">
          <template v-slot:prepend>
            <v-icon icon="mdi-newspaper"></v-icon>
          </template>

          <v-list-item-title>Kabar Terkini</v-list-item-title>
        </v-list-item>

        <v-list-item active-color="primary" to="/laporan">
          <template v-slot:prepend>
            <v-icon icon="mdi-clipboard-text"></v-icon>
          </template>

          <v-list-item-title>Laporan Keuangan</v-list-item-title>
        </v-list-item>

        <v-list-item active-color="primary" to="/about">
          <template v-slot:prepend>
            <v-icon icon="mdi-information"></v-icon>
          </template>

          <v-list-item-title>Tentang Kami</v-list-item-title>
        </v-list-item>


        <v-divider></v-divider>

        <v-list-item v-if="username" @click="logout">
          <template v-slot:prepend>
            <v-icon icon="mdi-logout"></v-icon>
          </template>

          <v-list-item-title>Keluar</v-list-item-title>
        </v-list-item>

        <v-list-item v-else to="/login" active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-login"></v-icon>
          </template>

          <v-list-item-title>Masuk</v-list-item-title>
        </v-list-item>


      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <img src="/logo.png" alt="logo" height="65" class="ml-4">
      <v-toolbar-title>
        Yuk Infaq
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>

        <router-view></router-view>

        <Bottom v-if="isMobile" />
        <Footnote />
      </v-container>
    </v-main>
  </v-app>
</template>