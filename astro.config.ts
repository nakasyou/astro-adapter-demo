import { defineConfig, passthroughImageService } from 'astro/config';
import { bunAdapter } from './src/integrations/bun-adapter';
import { honoAdapter } from './src/integrations/hono-adapter';

// https://astro.build/config
export default defineConfig({
    adapter: honoAdapter(), // bunAdapter(),
    output: 'server',
    image: {
        service: passthroughImageService()
    }
});
