import type { SSRManifest } from 'astro';
import { App } from 'astro/app';
import path from 'node:path'

export function start(manifest: SSRManifest) {
  const app = new App(manifest)

  const getAssetFuncs: Record<string, (() => Promise<Response>) | undefined> = {}

  for (const asset of manifest.assets) {
    const filePath = path.join(
      import.meta.dir,
      '../client',
      asset.replace(/^\//, '') // `/favicon.svg`を`favicon.svg`に
    )
    getAssetFuncs[asset] = async () => {
      const file = Bun.file(filePath)

      return new Response(file, {
        headers: {
          "Content-Type": file.type // Mime Typeを指定
        }
      })
    }
  }
  Bun.serve({
    fetch: async req => {
      const pathname = new URL(req.url).pathname
      const getAsset = getAssetFuncs[pathname]
      if (getAsset) {
        // ファイルがある
        return getAsset()
      }
      return await app.render(req)
    },
    port: 3001
  })
}