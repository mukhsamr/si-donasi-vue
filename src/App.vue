<script setup>
import { ref, onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import Auth from "@/api/Auth";
import Sanctum from "@/api/Sanctum";
import Footnote from "@/components/Footnote.vue";
import Bottom from "@/components/Bottom.vue";

const username = ref()
const isMobile = document.body.clientWidth <= 425


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

    <v-app-bar>
      <img src="/logo.png" alt="logo" height="50" class="ml-5">
      <v-toolbar-title>Yuk Infaq</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
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