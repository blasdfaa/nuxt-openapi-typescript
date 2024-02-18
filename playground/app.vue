<template>
  <div>
    Nuxt module playground!
  </div>

  <button type="button">get pets</button>
</template>

<script lang="ts" setup>
const api = useApiClient()

 await api.GET('/pet/findByStatus', { params: {query: {status: 'available'}}})


</script>
