<template>
    <h1>Documentos</h1>

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DocService, { Documento } from '@/services/DocService'
import { userStore } from '@/store/userStore'
import router from '@/router/router'

export default defineComponent({
    data() {
        return {
            documentos: [] as Documento[],
            error: ''
        }
    },
    async created() {
        try {
            this.documentos = await DocService.getDocs()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            this.error = err.messege
        }
    },
    beforeRouteEnter(to, from, next) {
        if (userStore.state.uname != '' && userStore.state.uname != null)
            router.replace('/doc');
        next();
    },
})
</script>
