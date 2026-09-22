import type { VercelRequest, VercelResponse } from '@vercel/node'
import https from 'https'

const token = process.env.GITHUB_TOKEN

function githubGet(path: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path,
      headers: {
        'User-Agent': 'githubview-proxy',
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }

    https.get(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 400) {
          reject({ status: res.statusCode })
        } else {
          resolve(JSON.parse(data))
        }
      })
    }).on('error', reject)
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path, ...rest } = req.query as Record<string, string>

  if (!path) return res.status(400).json({ error: 'Missing path' })

  const params = new URLSearchParams(rest).toString()
  const fullPath = `/${path}${params ? `?${params}` : ''}`

  try {
    const data = await githubGet(fullPath)
    res.setHeader('Cache-Control', 's-maxage=300')
    return res.json(data)
  } catch (err: unknown) {
    const status = (err as { status?: number }).status ?? 500
    return res.status(status).json({ error: 'GitHub API error', status })
  }
}
