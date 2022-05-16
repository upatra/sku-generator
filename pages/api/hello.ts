// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default (async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json({ msg: 'ok' })
  } catch (error: unknown) {
    res.status(500).end('Internal error')
  }
})
