import createClient from 'openapi-fetch'
import { defineNuxtPlugin } from '#app'

// @ts-expect-error ...
import type { paths } from '#build/types/openapi-typescript'

export default defineNuxtPlugin(() => {
  const api = createClient<paths>({ baseUrl: 'https://petstore3.swagger.io/api/v3' })

  return {
    provide: {
      api,
    },
  }
})
