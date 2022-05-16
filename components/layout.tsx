import { ReactNode } from 'react'
import Navbar from './navbar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { PageData } from '@/types'

interface LayoutProps {
  page: string
}

export default function Layout({ children }: { children: ReactNode }) {
  const title = 'The SKU Generator'
  const description = 'Lorem dolor sit amet'
  const logo = '/favicon.ico'
  const router = useRouter()

  // const sitePage = router.pathname.startsWith('/app/site/[id]')
  // const postPage = router.pathname.startsWith('/app/post/[id]')
  // const rootPage = !sitePage && !postPage
  // const tab = rootPage
  //   ? router.asPath.split('/')[1]
  //   : router.asPath.split('/')[3]

  return (
    <>
      <div className="min-h-full">
        <Head>
          <title>{title}</title>
          <link rel="icon" href={logo} />
          <link rel="shortcut icon" type="image/x-icon" href={logo} />
          <link rel="apple-touch-icon" sizes="180x180" href={logo} />
          <meta name="theme-color" content="#7b46f6" />

          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta itemProp="name" content={title} />
          <meta itemProp="description" content={description} />
          <meta itemProp="image" content={logo} />
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={logo} />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@Vercel" />
          <meta name="twitter:creator" content="@StevenTey" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={logo} />
        </Head>

        <main>
          <Navbar></Navbar>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
