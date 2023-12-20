import type { AstroIntegration } from 'astro'

export const honoAdapter = (): AstroIntegration => {
    return {
        name: 'hono-adapter',
        hooks: {
            'astro:config:done': ({ setAdapter }) => {
                setAdapter({
                    name: 'hono-adapter',
                    serverEntrypoint: './src/integrations/hono-adapter/server.ts',
                    supportedAstroFeatures: {
                        staticOutput: 'stable'
                    },
                    exports: ['astroAppMiddleware']
                })
            }
        }
    }
}
