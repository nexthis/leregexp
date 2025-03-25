import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    tasks: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        difficulty: z.number(),
        solution: z.array(z.string()),
        data: z.union([z.string(), z.array(z.string())]) ,
      })
    })
  }
})
