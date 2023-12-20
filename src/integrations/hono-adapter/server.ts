import type { SSRManifest } from 'astro'
import { App } from 'astro/app'
import path from 'node:path'

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest)

  const getAssetFuncs: Record<string, (() => Promise<Response>) | undefined> = {} // pathnameからファイルデータを出す関数たち

  for (const asset of manifest.assets) {
    const filePath = path.join(
      import.meta.dir,
      '../client',
      asset.replace(/^\//, '') // `/favicon.svg`を`favicon.svg`に
    ) // ファイルパスを求める

    getAssetFuncs[asset] = async () => {
      const file = Bun.file(filePath)

      return new Response(file, {
        headers: {
          "Content-Type": file.type // Mime Typeを指定
        }
      })
    }
  }
  const astroAppMiddleware = () => async (c, next) => {
    const pathname = c.req.path // pathnameを取得
    console.log(getAssetFuncs, pathname)
    const getAsset = getAssetFuncs[pathname]
    if (getAsset) {
      // ファイルがある
      return getAsset()
    }
    const res = await app.render(c.req)
    if (res.status === 404) {
      await next() // 404の場合middlewareをスキップ
    }
    return res
  }
  return { astroAppMiddleware }
}
