import { fileURLToPath } from 'node:url'
import { addImports, addPlugin, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import openapiTS, { astToString } from 'openapi-typescript'
import { name, version } from '../package.json'
import { logger } from './runtime/logging'

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: 'openapi',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    source: '',
    disable: false,
    input: '',
    singleHttpClient: true,
  },
  async setup(_options, nuxt) {
    // configure transpilation
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    // Transpile runtime
    nuxt.options.build.transpile.push(runtimeDir)

    // generate api types
    const ast = await openapiTS(new URL('https://petstore3.swagger.io/api/v3/openapi.json', import.meta.url))
    const contents = astToString(ast)

    logger.success('api types from https://petstore3.swagger.io has successfuly generated')

    addTypeTemplate({
      filename: 'types/openapi-typescript.d.ts',
      getContents: () => contents,
    })

    nuxt.hook('prepare:types', async ({ references }) => {
      references.push({ path: resolve(nuxt.options.buildDir, 'types/openapi-typescript.d.ts') })
    })

    addPlugin(resolve('./runtime/plugin'))

    // Add auto imports
    const composables = resolve('./runtime/composables')
    addImports([{ from: composables, name: 'useApiClient' }])
  },
})
