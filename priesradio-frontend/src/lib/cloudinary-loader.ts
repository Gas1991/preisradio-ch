// Loader Cloudinary pour Next.js Image
// Auto Upload Mapping par boutique + fallback fetch pour autres URLs

const CLOUD_NAME = 'dbayeaedd'

const STORE_PREFIXES: [string, string][] = [
  ['https://www.mytek.tn',           'mytek'],
  ['https://www.tunisianet.com.tn',  'tunisianet'],
  ['https://spacenet.tn',            'spacenet'],
]

function toCloudinaryPath(src: string): { mode: 'upload' | 'fetch'; path: string } {
  for (const [base, folder] of STORE_PREFIXES) {
    if (src.startsWith(base)) {
      const path = src
        .slice(base.length)
        .replace(/^\/+/, '')   // supprimer les / en tête
        .replace(/\/+/g, '/')  // normaliser les // doubles (Mytek)
      return { mode: 'upload', path: `${folder}/${path}` }
    }
  }
  return { mode: 'fetch', path: encodeURIComponent(src) }
}

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  const params = `w_${width},f_auto,q_${quality ?? 'auto'}`
  const { mode, path } = toCloudinaryPath(src)
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/${mode}/${params}/${path}`
}
