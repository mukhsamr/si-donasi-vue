<script setup>
import Auth from "@/api/Auth";
import { onBeforeMount, reactive, ref } from "vue";

const form = reactive({
    _method: 'patch',
    id: '',
    name: '',
    password: ''
})

const rules = [(value) => !!value || "Kolom harus diisi"]
const inputs = ref()
const loading = ref()
const alert = reactive({
    type: '',
    message: ''
})


async function update() {

    const validate = await inputs.value.validate()

    if (validate) {
        loading.value = true

        await Auth.update(form)
            .then(res => {
                alert.type = 'success'
                alert.message = res.message
            })
            .catch(e => {
                alert.type = 'error'
                alert.message = e.response.data.error
            })
            .finally(() => {
                loading.value = false

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })

                setTimeout(() => {
                    alert.message = null
                }, 3000);
            })
    }
}


onBeforeMount(async () => {
    const res = await Auth.find()

    form.id = res.id
    form.name = res.name
})

</script>

<template>
    <h2>Setelan User</h2>

    <v-divider />

    <v-alert :type="alert.type" density="comfortable" v-if="alert.message">
        {{ alert.message }}
    </v-alert>

    <v-form ref="inputs" @submit.prevent="update" class="mt-8 border pa-4">
        <v-text-field :rules="rules" v-model="form.name" label="Username" prepend-icon="mdi-account"
            variant="underlined"></v-text-field>
        <v-text-field v-model="form.password" label="Password baru" prepend-icon="mdi-lock"
            variant="underlined"></v-text-field>

        <v-btn type="submit" color="primary" v-if="!loading">
            Simpan
        </v-btn>
        <v-btn color="primary" disabled v-else>
            <v-progress-circular indeterminate />
        </v-btn>
    </v-form>
</template>