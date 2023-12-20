import type { AstroIntegration } from 'astro'

export const bunAdapter = (): AstroIntegration => {
    return {
        name: 'bun-adapter',
        hooks: {
            'astro:config:done': ({ setAdapter }) => {
                setAdapter({
                    name: 'bun-adapter',
                    serverEntrypoint: './src/integrations/bun-adapter/server.ts',
                    supportedAstroFeatures: {
                        staticOutput: 'stable'
                    }
                })
            }
        }
    }
}
